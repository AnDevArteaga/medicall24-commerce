import { useState, useEffect } from 'react';

const BYPASS_BEFORE_UNLOAD_KEY = 'bypass_beforeunload_once';

export const useBeforeUnload = () => {
  const [isDirty, setIsDirty] = useState(false);

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    // Permite una salida intencional (ej. botón Cancelar de la pasarela)
    const bypass = window.sessionStorage.getItem(BYPASS_BEFORE_UNLOAD_KEY);
    if (bypass === '1') {
      window.sessionStorage.removeItem(BYPASS_BEFORE_UNLOAD_KEY);
      return;
    }

    if (isDirty) {
      e.preventDefault();
      
    }
  };

  useEffect(() => {
    // Registrar el listener para el evento beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]); // Solo se activa cuando isDirty cambia

  return  setIsDirty;
};

