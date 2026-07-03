// Imágenes por slide: se cargan bajo demanda (no entran todas al chunk inicial)

export interface SliderItem {
  imageLoader?: () => Promise<{ default: string }>
  caption: string
}

export interface SliderSlide {
  title: string
  items: SliderItem[]
}

export const softwareSliderSlides: SliderSlide[] = [
  {
    title:
      'Seguridad y tecnología de última generación, con acceso ilimitado a tu información',
    items: [
      {
        imageLoader: () => import('../../../assets/img/slide1-1.webp'),
        caption:
          'Infraestructura tecnológica en la nube de Microsoft Azure, con almacenamiento para archivos multimedia hasta 100 GB para 1 año.',
      },
      {
        imageLoader: () => import('../../../assets/img/slide1-2.webp'),
        caption:
          'Acceso ilimitado a la cuenta de usuario del Prestador de Salud, desde portal web y app móvil.',
      },
    ],
  },
  {
    title: 'Uso ilimitado de funcionalidades esenciales para la atención de pacientes',
    items: [
      {
        imageLoader: () => import('../../../assets/img/slide2-1.webp'),
        caption:
          'Uso ilimitado de la agenda de citas para que los pacientes programen las consultas presenciales y por telemedicina',
      },
      {
        imageLoader: () => import('../../../assets/img/slide2-2.webp'),
        caption:
          'Registro ilimitado de historias clínicas electrónicas para atenciones presenciales o de telemedicina',
      },
      {
        imageLoader: () => import('../../../assets/img/slide2-3.webp'),
        caption:
          'Recurso estándar de videollamadas cifradas de extremo a extremo para realizar consultas por telemedicina',
      },
    ],
  },
  {
    title:
      'Interoperabilidad de la historia clínica electrónica y cumplimiento de la norma vigente en Colombia ',
    items: [
      {
        imageLoader: () => import('../../../assets/img/slide3-1.webp'),
        caption:
          'Generación del Resumen Digital de Atención a partir de la HCE, para enviar al Ministerio de Salud',
      },
      {
        imageLoader: () => import('../../../assets/img/slide3-2.webp'),
        caption:
          'Facturación electrónicas con RIPS en formato Json, para validar en la DIAN y en el Ministerio de Salud',
      },
    ],
  },
  {
    title:
      'Integración de herramientas de IA y dispositivos externos para mejorar experiencia del usuario',
    items: [
      {
        imageLoader: () => import('../../../assets/img/slide4-1.webp'),
        caption:
          'Integración de asistente de IA para diligenciar y completar las historias clínicas',
      },
      {
        imageLoader: () => import('../../../assets/img/slide4-2.webp'),
        caption: 'Integra algoritmos de IA para la predicción de riesgo en salud',
      },
      {
        imageLoader: () => import('../../../assets/img/slide4-3.webp'),
        caption:
          'Integración a fotopletismografía (PPG) con IA para medir signos vitales de pacientes',
      },
      {
        imageLoader: () => import('../../../assets/img/slide4-4.webp'),
        caption:
          'Conecta equipos biomédicos para el monitoreo remoto de signos vitales de pacientes',
      },
    ],
  },
  {
    title: 'Comercio electrónico integrado para trasferencias seguras',
    items: [
      {
        imageLoader: () => import('../../../assets/img/slide5-1.webp'),
        caption:
          'Comercio electrónico integrado a Wompi Bancolombia con métodos de pago por TC, TD, Bontón bancolombia, PSE y Nequi.',
      },
    ],
  },
  {
    title: 'Centraliza y automatiza la gestión financiera',
    items: [
      {
        imageLoader: () => import('../../../assets/img/slide6-1.webp'),
        caption:
          'Gestiona la información en tiempo real para optimizar costos, controlar presupuestos y asegurar la sostenibilidad financiera a largo plazo.',
      },
    ],
  },
]
