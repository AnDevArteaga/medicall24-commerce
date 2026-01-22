import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "../services/supabase/client/create-client";
import { GestionUsuarioCreditoResponse } from "../services/supabase/manage-user-credit";
import { getGestionUsuarioCredito } from "../services/supabase/manage-user-credit";

interface UseRealtimeCreditNotificationsProps {
    onNewNotification?: (newRecord: GestionUsuarioCreditoResponse) => void;
    onUpdate?: (updatedRecord: GestionUsuarioCreditoResponse) => void;
    initialCount?: number;
}

export const useRealtimeCreditNotifications = ({
    onNewNotification,
    onUpdate,
    initialCount = 0,
}: UseRealtimeCreditNotificationsProps = {}) => {
    const [newRecordsCount, setNewRecordsCount] = useState<number>(initialCount);
    const [lastCheckedTime, setLastCheckedTime] = useState<Date>(new Date());
    const channelRef = useRef<any>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const lastRecordIdRef = useRef<number | null>(null);
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const isRealtimeConnectedRef = useRef<boolean>(false);

    // Crear elemento de audio para el sonido
    useEffect(() => {
        // Crear un audio element con data URI para el sonido
        audioRef.current = new Audio();
        
        // Generar un sonido de notificación usando Web Audio API como fallback
        const generateNotificationSound = () => {
            try {
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                
                // Crear un sonido más audible y agradable
                const playBeep = (frequency: number, duration: number, delay: number = 0) => {
                    setTimeout(() => {
                        const oscillator = audioContext.createOscillator();
                        const gainNode = audioContext.createGain();

                        oscillator.connect(gainNode);
                        gainNode.connect(audioContext.destination);

                        oscillator.frequency.value = frequency;
                        oscillator.type = "sine";

                        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

                        oscillator.start(audioContext.currentTime);
                        oscillator.stop(audioContext.currentTime + duration);
                    }, delay);
                };

                // Reproducir dos beeps
                playBeep(800, 0.2, 0);
                playBeep(1000, 0.2, 250);
            } catch (error) {
                console.error("Error generando sonido:", error);
            }
        };

        // Guardar la función para usarla después
        (audioRef.current as any).playSound = generateNotificationSound;
    }, []);

    // Función para reproducir sonido de notificación
    const playNotificationSound = useCallback(() => {
        try {
            if (audioRef.current && (audioRef.current as any).playSound) {
                (audioRef.current as any).playSound();
            } else {
                // Fallback: usar Web Audio API directamente
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                
                if (audioContext.state === "suspended") {
                    audioContext.resume();
                }

                const playBeep = (frequency: number, duration: number, delay: number = 0) => {
                    setTimeout(() => {
                        const oscillator = audioContext.createOscillator();
                        const gainNode = audioContext.createGain();

                        oscillator.connect(gainNode);
                        gainNode.connect(audioContext.destination);

                        oscillator.frequency.value = frequency;
                        oscillator.type = "sine";

                        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

                        oscillator.start(audioContext.currentTime);
                        oscillator.stop(audioContext.currentTime + duration);
                    }, delay);
                };

                playBeep(800, 0.2, 0);
                playBeep(1000, 0.2, 250);
            }
        } catch (error) {
            console.error("Error reproduciendo sonido:", error);
        }
    }, []);

    // Función de polling como fallback
    const checkForNewRecords = useCallback(async () => {
        try {
            const response = await getGestionUsuarioCredito();
            const users = response?.data || [];
            
            // Filtrar solo los no gestionados
            const nonGestionados = users.filter((user) => !user.gestionado);
            
            // Encontrar el ID más reciente
            const latestId = nonGestionados.length > 0 
                ? Math.max(...nonGestionados.map(u => u.id || 0))
                : null;

            // Si hay un nuevo registro
            if (latestId && latestId !== lastRecordIdRef.current && lastRecordIdRef.current !== null) {
                const newRecord = nonGestionados.find(u => u.id === latestId);
                if (newRecord) {
                    console.log("Nuevo registro detectado por polling:", newRecord);
                    setNewRecordsCount((prev) => prev + 1);
                    playNotificationSound();
                    
                    if (onNewNotification) {
                        onNewNotification(newRecord);
                    }
                }
            }
            
            // Actualizar el último ID conocido
            if (latestId) {
                lastRecordIdRef.current = latestId;
            }
            
            // Actualizar el contador basado en los registros no gestionados
            setNewRecordsCount(nonGestionados.length);
        } catch (error) {
            console.error("Error en polling:", error);
        }
    }, [onNewNotification, playNotificationSound]);

    // Actualizar el contador base cuando cambie initialCount
    useEffect(() => {
        setNewRecordsCount(initialCount);
    }, [initialCount]);

    // Configurar Realtime y Polling
    useEffect(() => {
        console.log("Iniciando suscripción a notificaciones en tiempo real...");

        // Intentar conectar a Realtime
        const channel = supabase
            .channel("gestion_usuario_credito_changes", {
                config: {
                    broadcast: { self: true },
                },
            })
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "gestion_usuario_credito",
                },
                (payload) => {
                    console.log("✅ Nuevo registro recibido por Realtime:", payload);
                    isRealtimeConnectedRef.current = true;
                    const newRecord = payload.new as GestionUsuarioCreditoResponse;
                    
                    // Solo contar si no está gestionado
                    if (!newRecord.gestionado) {
                        setNewRecordsCount((prev) => prev + 1);
                        playNotificationSound();
                        
                        if (onNewNotification) {
                            onNewNotification(newRecord);
                        }
                    }
                }
            )
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "gestion_usuario_credito",
                },
                (payload) => {
                    console.log("✅ Registro actualizado por Realtime:", payload);
                    isRealtimeConnectedRef.current = true;
                    const updatedRecord = payload.new as GestionUsuarioCreditoResponse;
                    
                    // Si se marca como gestionado, reducir el contador
                    if (updatedRecord.gestionado) {
                        setNewRecordsCount((prev) => Math.max(0, prev - 1));
                    }
                    
                    if (onUpdate) {
                        onUpdate(updatedRecord);
                    }
                }
            )
            .subscribe((status) => {
                console.log("Estado de suscripción Realtime:", status);
                if (status === "SUBSCRIBED") {
                    isRealtimeConnectedRef.current = true;
                    console.log("✅ Conectado a Realtime exitosamente");
                } else if (status === "CHANNEL_ERROR") {
                    console.warn("⚠️ Error en canal Realtime, usando polling como fallback");
                    isRealtimeConnectedRef.current = false;
                }
            });

        channelRef.current = channel;

        // Configurar polling como fallback (cada 3 segundos)
        pollingIntervalRef.current = setInterval(() => {
            if (!isRealtimeConnectedRef.current) {
                console.log("🔄 Usando polling para verificar nuevos registros...");
                checkForNewRecords();
            }
        }, 3000);

        // Verificación inicial
        checkForNewRecords();

        return () => {
            console.log("Limpiando suscripciones...");
            if (channelRef.current) {
                supabase.removeChannel(channelRef.current);
            }
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }
        };
    }, [onNewNotification, onUpdate, checkForNewRecords, playNotificationSound]);

    // Función para resetear el contador cuando se revisan los registros
    const resetNotificationCount = useCallback(() => {
        setNewRecordsCount(0);
        setLastCheckedTime(new Date());
        // Actualizar el último ID conocido para evitar notificaciones duplicadas
        checkForNewRecords();
    }, [checkForNewRecords]);

    return {
        newRecordsCount,
        lastCheckedTime,
        resetNotificationCount,
        isRealtimeConnected: isRealtimeConnectedRef.current,
    };
};
