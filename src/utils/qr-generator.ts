// Utilidad para generar código QR y plasmarlo en diseños
import QRCodeStyling from 'qr-code-styling';

export interface QRCodeOptions {
    colorDark?: string; // Color de los puntos
    colorLight?: string; // Color de fondo
    dotsType?: 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded'; // Tipo de puntos
    cornersSquareType?: 'dot' | 'square' | 'extra-rounded'; // Tipo de esquinas cuadradas
    cornersDotType?: 'dot' | 'square'; // Tipo de punto en las esquinas
    imagePath?: string; // Ruta de la imagen PNG para el centro del QR (ej: '/logo.png')
    imageSize?: number; // Tamaño de la imagen en píxeles (por defecto: 200px o 20% del QR)
    margin?: number; // Margen/padding alrededor del QR en módulos (por defecto: 6)
}

/**
 * Genera un código QR a partir de una URL (retorna data URL)
 * Permite personalizar colores, tipo de esquinas y estilo de puntos
 */
export const generateQRCode = async (
    url: string,
    options: QRCodeOptions = {}
): Promise<string> => {
    try {
        // Configuración por defecto
        const qrConfig = {
            width: 1000,
            height: 1000,
            data: url,
            margin: options.margin ?? 10, // Margen/padding más grande por defecto (6 módulos en lugar de 4)
            dotsOptions: {
                color: options.colorDark || '#000000',
                type: options.dotsType || 'rounded', // rounded, dots, classy, classy-rounded, square, extra-rounded
            },
            backgroundOptions: {
                color: options.colorLight || '#FFFFFF',
            },
            cornersSquareOptions: {
                color: options.colorDark || '#000000',
                type: options.cornersSquareType || 'extra-rounded', // dot, square, extra-rounded
            },
            cornersDotOptions: {
                color: options.colorDark || '#000000',
                type: options.cornersDotType || 'dot', // dot, square
            },
            ...(options.imagePath && {
                image: options.imagePath,
                imageOptions: {
                    crossOrigin: 'anonymous',
                    margin: 8,
                    imageSize: options.imageSize ? options.imageSize / 1000 : 0.2, // Porcentaje del tamaño del QR (0.2 = 20%)
                },
            }),
        };

        const qrCode = new QRCodeStyling(qrConfig);

        // Generar el QR y obtener como Blob o Buffer
        const rawData = await qrCode.getRawData('png')
        if (!rawData) {
            throw new Error('No se pudo generar el QR')
        }

        // Si es un Blob, usarlo directamente. Si es un Buffer, convertirlo a Blob
        let blob: Blob
        if (rawData instanceof Blob) {
            blob = rawData
        } else {
            // Es un Buffer (Node.js), convertir a ArrayBuffer y luego a Blob
            const sourceBuffer = rawData.buffer
            let arrayBuffer: ArrayBuffer
            if (sourceBuffer instanceof SharedArrayBuffer) {
                // Convertir SharedArrayBuffer a ArrayBuffer creando una copia
                arrayBuffer = new ArrayBuffer(rawData.byteLength)
                const view = new Uint8Array(arrayBuffer)
                view.set(new Uint8Array(sourceBuffer, rawData.byteOffset, rawData.byteLength))
            } else {
                // Ya es un ArrayBuffer, usar slice para crear una vista
                arrayBuffer = sourceBuffer.slice(
                    rawData.byteOffset,
                    rawData.byteOffset + rawData.byteLength
                )
            }
            blob = new Blob([arrayBuffer], { type: 'image/png' })
        }

        // Convertir Blob a data URL usando FileReader
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result)
                } else {
                    reject(new Error('Error al convertir Blob a data URL'))
                }
            }
            reader.onerror = () => {
                reject(new Error('Error leyendo el Blob'))
            }
            reader.readAsDataURL(blob)
        })
    } catch (error) {
        console.error("Error generando QR:", error);
        throw error;
    }
};

/**
 * Obtiene la imagen del diseño base según el porcentaje de descuento
 * Ajusta estas rutas según donde tengas tus imágenes de diseño
 */
export const getDesignImagePath = (porcentajeDescuento: number): string => {
    // Mapear porcentaje a diseño
    // Nota: Ajusta estas rutas según la ubicación real de tus imágenes
    // Las imágenes deben estar en la carpeta public o assets
    
    if (porcentajeDescuento === 0 || porcentajeDescuento === 0.0) {
        return '/diseno-0.png'; // Sin descuento - ubicar en public/
    } else if (porcentajeDescuento === 5 || porcentajeDescuento === 5.0) {
        return '/diseno-5.png'; // 5% descuento
    } else if (porcentajeDescuento === 10 || porcentajeDescuento === 10.0) {
        return '/diseno-10.png'; // 10% descuento
    } else if (porcentajeDescuento === 15 || porcentajeDescuento === 15.0) {
        return '/diseno-15.png'; // 15% descuento
    } else if (porcentajeDescuento === 20 || porcentajeDescuento === 20.0) {
        return '/diseno-20.png'; // 20% descuento
    }
    // Por defecto, usar el de sin descuento
    return '/diseno-0.png';
};

/**
 * Plasmado del QR en el diseño usando Canvas
 */
export const generateDesignWithQR = async (
    qrUrl: string,
    designImagePath: string,
    codPromo: string,
    qrPosition?: { x: number; y: number }
): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
                reject(new Error('No se pudo obtener el contexto del canvas'));
                return;
            }

            // Cargar imagen del diseño base
            const designImg = new Image();

            designImg.onload = () => {
                // Configurar canvas con el tamaño del diseño
                canvas.width = designImg.width;
                canvas.height = designImg.height;

                // Dibujar el diseño base
                ctx.drawImage(designImg, 0, 0);

                // El QR ya es un data URL, dibujarlo directamente
                const qrImg = new Image();
                qrImg.onload = () => {
                    // Tamaño del QR más grande (aproximadamente 450px según el diseño)
                    const qrSize = 450;
                    
                    // Calcular posición: centrado horizontalmente y más abajo
                    // Si no se especifica posición, calcular automáticamente
                    const qrX = qrPosition?.x ?? (canvas.width - qrSize) / 2; // Centrado horizontal
                    const qrY = qrPosition?.y ?? canvas.height * 0.45; // Aproximadamente 45% desde arriba (más abajo)
                    
                    // Dibujar el QR
                    ctx.drawImage(
                        qrImg,
                        qrX,
                        qrY,
                        qrSize,
                        qrSize
                    );

                    // Agregar el código promocional debajo del QR
                    const codigoY = qrY + qrSize + 20; // 20px debajo del QR
                    const codigoX = qrX + qrSize / 2; // Centrado debajo del QR
                    
                    // Configurar estilo del texto
                    ctx.font = 'bold 72px Arial, sans-serif'; // Tamaño grande y bold
                    ctx.fillStyle = '#c2185d'; // Color magenta/magenta
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    
                    // Dibujar el código promocional
                    ctx.fillText(codPromo, codigoX, codigoY);

                    // Convertir canvas a base64
                    const dataUrl = canvas.toDataURL('image/png');
                    resolve(dataUrl);
                };

                qrImg.onerror = () => {
                    reject(new Error('Error cargando la imagen del QR'));
                };

                qrImg.src = qrUrl;
            };

            designImg.onerror = () => {
                // Si no existe la imagen del diseño, crear un diseño simple
                canvas.width = 800;
                canvas.height = 600;
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Dibujar un borde
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 2;
                ctx.strokeRect(0, 0, canvas.width, canvas.height);

                // El QR ya es un data URL, dibujarlo directamente
                const qrImg = new Image();
                qrImg.onload = () => {
                    const qrSize = 450;
                    
                    // Calcular posición para diseño de fallback
                    const qrX = qrPosition?.x ?? (canvas.width - qrSize) / 2;
                    const qrY = qrPosition?.y ?? canvas.height * 0.45;
                    
                    ctx.drawImage(
                        qrImg,
                        qrX,
                        qrY,
                        qrSize,
                        qrSize
                    );

                    // Agregar código promocional
                    const codigoY = qrY + qrSize + 20;
                    const codigoX = qrX + qrSize / 2;
                    
                    ctx.font = 'bold 48px Arial, sans-serif';
                    ctx.fillStyle = '#E91E63';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(codPromo, codigoX, codigoY);

                    const dataUrl = canvas.toDataURL('image/png');
                    resolve(dataUrl);
                };

                qrImg.onerror = () => {
                    reject(new Error('Error cargando la imagen del QR'));
                };

                qrImg.src = qrUrl;
            };

            // Cargar imagen desde public
            designImg.src = designImagePath.startsWith('/')
                ? designImagePath
                : `/${designImagePath}`;
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Descarga una imagen desde un data URL
 */
export const downloadImage = (dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

/**
 * Construye la URL del código promocional
 */
export const buildPromoUrl = (productId: number, codPromo: string): string => {
    return `https://appmedicall24.com/Examen-bexa?promo=${codPromo}&product=${productId}`;
};
