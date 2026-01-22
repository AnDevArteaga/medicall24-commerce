import { TermBlock } from "../../../../interfaces/terms.interface";
// import { Ally } from "../../../../interfaces/allies-supabase.interface"; // Ajusta la ruta según tu estructura

// // Función para extraer ciudades únicas con sus departamentos
// const getUniqueCities = (allies: Ally[]): { ciudad: string; departamento: string }[] => {
//     const citiesMap = new Map<string, string>();
    
//     allies.forEach(ally => {
//         // Asumiendo que el ally tiene propiedades 'ciudad' y 'departamento'
//         // Ajusta los nombres de las propiedades según tu interface Ally
//         if (ally.nombre_municipio && ally.nombre_departamento) {
//             // Usamos el nombre de la ciudad como clave para evitar duplicados
//             if (!citiesMap.has(ally.nombre_municipio)) {
//                 citiesMap.set(ally.nombre_municipio, ally.nombre_departamento);
//             }
//         }
//     });
    
//     // Convertir el Map a un array de objetos y ordenar alfabéticamente por ciudad
//     return Array.from(citiesMap.entries())
//         .map(([ciudad, departamento]) => ({ ciudad, departamento }))
//         .sort((a, b) => a.ciudad.localeCompare(b.ciudad));
// };

// // Función para generar el contenido de términos dinámicamente
// export const generateTermBexaContent = (allies: Ally[]): TermBlock[] => {
//     const uniqueCities = getUniqueCities(allies);
    
//     return [
//         {
//             type: "paragraph",
//             content:
//                 "Estos son los Términos y Condiciones para la prestación de los servicios ofertados y comercializados por MEDICALL24 SAS (en adelante LA COMPAÑIA), por favor lea cuidadosamente.",
//         },
//         {
//             type: "paragraph",
//             content:
//                 'Al hacer clic en la casilla "acepto los términos y condiciones", usted habrá manifestado su aceptación sin restricciones de esteaviso legal y, por lo tanto, de los Términos y Condiciones acá establecidos. Si usted no acepta los Términos y Condiciones establecidos aquí, usted no podrá acceder ni utilizar los servicios ofertados y comercializados por LA COMPAÑIA. Si usted en cualquier momento no estuviera de acuerdo total o parcialmente con estostérminos y condiciones, deberá abstenerse inmediatamente de contratar el servicio.',
//         },
//         {
//             type: "paragraph",
//             content:
//                 'LA COMPAÑÍA puede modificar estos Términos y Condiciones en cualquier momento sin previo aviso. Usted deberá leer lo contenido en este instrumento legal periódicamente para revisar las normativas aquí establecidas, debido a que las mismas son obligatorias para usted. Los términos "usted", "usuario", o, "paciente", tal como se usan aquí, se refieren a todas las personas o entidades (naturales o jurídicas) que compren o accedan a los servicios ofertados y comercializados por LA COMPAÑIA.',
//         },
//         {
//             type: "paragraph",
//             content:
//                 "Los presentes Términos y Condiciones constituyen un acuerdo legal vinculante entre el usuario y LA COMPAÑÍA, y establecen las condiciones para acceder a los servicios ofertados y comercializados por LA COMPAÑÍA; por lo anterior, es su obligación como usuario leer cuidadosamente los presentes Términos y Condiciones.",
//         },
//         {
//             type: "title",
//             content:
//                 "CONDICIONES PARA ACCEDER A LOS SERVICIOS DEL EXAMEN BEXA PARA DETECTAR MASAS EN MAMA",
//         },
//         {
//             type: "paragraph",
//             content:
//                 "La prestación de los servicios de salud que incluye el Examen BEXA para Detectar Masas en Mama será realizada por Prestadores de Salud habilitados por el Ministerio de salud de Colombia, los cuales hacen parte de nuestra Alianza Comercial Estratégica. LA COMPAÑÍA no es un Prestador de Salud, por lo tanto, no tiene responsabilidad alguna sobre la prestación de los servicios de salud que hacen parte del Examen BEXA para Detectar Masas en Mama, los cuales, están a cargo de los Prestadores de Salud que hacen parte de la Alianza ComercialEstratégica.",
//             link: {
//                 label: "Consulte nuestros Aliados aquí",
//                 href: "/aliados",
//             },
//         },
//         {
//             type: "paragraph",
//             content:
//                 "El Examen BEXA para Detectar Masas en Mama será realizado en las siguientes ciudades de Colombia:",
//         },
//         {
//             type: "grid",
//             items: uniqueCities,
//         },
//     ] as TermBlock[];
// };

// // Función para generar el contenido de términos del paquete
// export const generateTermBexaPackageContent = (allies: Ally[]): TermBlock[] => {
//     const uniqueCities = getUniqueCities(allies);
    
//     return [
//         {
//             type: "paragraph",
//             content:
//                 "Estos son los Términos y Condiciones para la prestación de los servicios ofertados y comercializados por MEDICALL24 SAS (en adelante LA COMPAÑIA), por favor lea cuidadosamente.",
//         },
//         {
//             type: "paragraph",
//             content:
//                 'Al hacer clic en la casilla "acepto los términos y condiciones", usted habrá manifestado su aceptación sin restricciones de esteaviso legal y, por lo tanto, de los Términos y Condiciones acá establecidos. Si usted no acepta los Términos y Condiciones establecidos aquí, usted no podrá acceder ni utilizar los servicios ofertados y comercializados por LA COMPAÑIA. Si usted en cualquier momento no estuviera de acuerdo total o parcialmente con estostérminos y condiciones, deberá abstenerse inmediatamente de contratar el servicio.',
//         },
//         {
//             type: "paragraph",
//             content:
//                 'LA COMPAÑÍA puede modificar estos Términos y Condiciones en cualquier momento sin previo aviso. Usted deberá leer lo contenido en este instrumento legal periódicamente para revisar las normativas aquí establecidas, debido a que las mismas son obligatorias para usted. Los términos "usted", "usuario", o, "paciente", tal como se usan aquí, se refieren a todas las personas o entidades (naturales o jurídicas) que compren o accedan a los servicios ofertados y comercializados por LA COMPAÑIA.',
//         },
//         {
//             type: "paragraph",
//             content:
//                 "Los presentes Términos y Condiciones constituyen un acuerdo legal vinculante entre el usuario y LA COMPAÑÍA, y establecen las condiciones para acceder a los servicios ofertados y comercializados por LA COMPAÑÍA; por lo anterior, es su obligación como usuario leer cuidadosamente los presentes Términos y Condiciones.",
//         },
//         {
//             type: "title",
//             content:
//                 "CONDICIONES PARA ACCEDER A LOS SERVICIOS DEL PAQUETE EXAMEN BEXA PARA DETECTAR MASAS EN MAMA",
//         },
//         {
//             type: "paragraph",
//             content:
//                 "La prestación de los servicios de salud que incluye el Examen BEXA para Detectar Masas en Mama será realizada por Prestadores de Salud habilitados por el Ministerio de salud de Colombia, los cuales hacen parte de nuestra Alianza Comercial Estratégica. LA COMPAÑÍA no es un Prestador de Salud, por lo tanto, no tiene responsabilidad alguna sobre la prestación de los servicios de salud que hacen parte del Examen BEXA para Detectar Masas en Mama, los cuales, están a cargo de los Prestadores de Salud que hacen parte de la Alianza ComercialEstratégica.",
//             link: {
//                 label: "Consulte nuestros Aliados aquí",
//                 href: "/aliados",
//             },
//         },
//         {
//             type: "paragraph",
//             content:
//                 "El Examen BEXA para Detectar Masas en Mama será realizado en las siguientes ciudades de Colombia:",
//         },
//         {
//             type: "grid",
//             items: uniqueCities,
//         },
//     ] as TermBlock[];
// };


// // Función para generar términos de planes de telemedicina
// export const generateTermTelemedicinePlanContent = (): TermBlock[] => {
//     return [
//         {
//             type: "paragraph",
//             content:
//                 "Estos son los Términos y Condiciones para la prestación de los servicios ofertados y comercializados por MEDICALL24 SAS (en adelante LA COMPAÑIA), por favor lea cuidadosamente.",
//         },
//         {
//             type: "paragraph",
//             content:
//                 'Al hacer clic en la casilla "acepto los términos y condiciones", usted habrá manifestado su aceptación sin restricciones de este aviso legal y, por lo tanto, de los Términos y Condiciones acá establecidos. Si usted no acepta los Términos y Condiciones establecidos aquí, usted no podrá acceder ni utilizar los servicios ofertados y comercializados por LA COMPAÑIA. Si usted en cualquier momento no estuviera de acuerdo total o parcialmente con estos términos y condiciones, deberá abstenerse inmediatamente de contratar el servicio.',
//         },
//         {
//             type: "paragraph",
//             content:
//                 'LA COMPAÑÍA puede modificar estos Términos y Condiciones en cualquier momento sin previo aviso. Usted deberá leer lo contenido en este instrumento legal periódicamente para revisar las normativas aquí establecidas, debido a que las mismas son obligatorias para usted. Los términos "usted", "usuario", o "paciente", tal como se usan aquí, se refieren a todas las personas o entidades (naturales o jurídicas) que compren o accedan a los servicios ofertados y comercializados por LA COMPAÑIA.',
//         },
//         {
//             type: "paragraph",
//             content:
//                 "Los presentes Términos y Condiciones constituyen un acuerdo legal vinculante entre el usuario y LA COMPAÑÍA, y establecen las condiciones para acceder a los servicios ofertados y comercializados por LA COMPAÑÍA; por lo anterior, es su obligación como usuario leer cuidadosamente los presentes Términos y Condiciones.",
//         },
//         {
//             type: "title",
//             content: "TÉRMINOS Y CONDICIONES DE ADQUISICIÓN DE PLANES DE TELEMEDICINA",
//         },
//         {
//             type: "subtitle",
//             content: "DEFINICIONES",
//         },
//         {
//             type: "paragraph",
//             content:
//                 "Cliente tomador: Grupo de personas naturales beneficiarias que el cliente tomador indica que podrán acceder a algunos de los servicios que contempla los planes de telemedicina que se contraten, los cuales se detallan en las condiciones de prestación de cada plan ofertado.",
//         },
//         {
//             type: "paragraph",
//             content:
//                 "Usuarios beneficiarios: Grupo de personas naturales beneficiarias que el cliente tomador indica que podrán acceder a algunos de los servicios que contempla los planes de telemedicina que se contraten, los cuales se detallan en las condiciones de prestación de cada plan ofertado.",
//         },
//         {
//             type: "paragraph",
//             content:
//                 "Vigencia: Período durante el cual el cliente tomador y los usuarios beneficiarios, tienen derecho a recibir los servicios de telemedicina descritos en cada plan ofertado. Para este caso el período de vigencia activa estará determinado por cada plan de telemedicina que el cliente tomador adquiera, y comenzará a regir 24 horas después del día de contratación del servicio.",
//         },
//         {
//             type: "subtitle",
//             content: "GENERALIDADES",
//         },
//         {
//             type: "paragraph",
//             content:
//                 "MEDICALL24 no es un Prestador de Salud ni de servicios conexos, por lo tanto, no tiene responsabilidad alguna sobre la prestación de los servicios de salud. LA COMPAÑÍA solo pone a disposición del usuario el acceso al servicio a través de la App MEDICALL24, que es un canal de comunicación sincrónico que garantiza la realización de videollamadas en tiempo real, para que los usuarios sean atendidos por los Prestadores de Salud que hacen parte de nuestra Alianza Comercial Estratégica, los cuales están debidamente habilitados por el Ministerio de salud de Colombia. Consulte nuestros Aliados aquí.",
//             link: {
//                 label: "Consulte nuestros Aliados aquí",
//                 href: "/aliados",
//             },
//         },
//         {
//             type: "paragraph",
//             content:
//                 "La utilización del servicio por parte del usuario, implica su aceptación expresa y su adhesión a los presentes términos y condiciones y se sujeta a ellos y a las modificaciones que pudieran sufrir.",
//         },
//         {
//             type: "paragraph",
//             content:
//                 "Los planes de Telemedicina brindan acceso durante todos los meses de su vigencia, a consultas y valoraciones de manera ilimitada con los profesionales de la salud y especialistas que se ofertan en cada plan. Los profesionales de la salud y especialistas estarán disponibles en el horario de 7:00 a.m. a 7:00 p.m. de lunes a domingo, con el propósito de atender citas virtuales a través de la App para dispositivos móviles MEDICALL24. Cada consulta tendrá una duración máxima de 30 minutos.",
//         },
//         {
//             type: "paragraph",
//             content:
//                 "La App de Telemedicina MEDICALL24 es la aplicación que el usuario deberá utilizar para solicitar y gestionar sus citas. Los pasos para la solicitud de citas se enviarán al correo electrónico que se ingrese al momento de la compra, una vez el pago sea realizado con éxito. También puede ver los pasos para solicitar las citas entrando aquí.",
//             link: {
//                 label: "ver pasos para solicitar citas",
//                 href: "/como-solicitar-citas",
//             },
//         },
//         {
//             type: "paragraph",
//             content:
//                 "La compra del plan de telemedicina da derecho a la prestación de los servicios que este incluya, de acuerdo con la oferta de servicios publicada por LA COMPAÑÍA.",
//         },
//         {
//             type: "paragraph",
//             content:
//                 "El cliente tomador y los usuarios beneficiarios del plan de Telemedicina pueden ser valorados, diagnosticados y tratados con las recomendaciones y el plan de manejo apropiado según su sintomatología, de acuerdo con el criterio del profesional de la salud o especialista tratante.",
//         },
//         {
//             type: "paragraph",
//             content:
//                 "El servicio de salud por Telemedicina será prestado por una IPS que actúa como un Prestador de Salud de Referencia, acorde a las normas vigentes que regulan la materia en Colombia. Los usuarios que soliciten el servicio desde la App para dispositivos móviles MEDICALL24, serán atendidos de acuerdo con la disponibilidad de agenda de los profesionales de la salud y especialistas del Prestador, teniendo la posibilidad de recibir atención de manera inmediata.",
//         },
//         {
//             type: "paragraph",
//             content:
//                 "Para continuar con el pago del plan de telemedicina, se deberá realizar el registro del cliente tomador del servicio. Este procedimiento podrá realizarse una vez sean aceptados los términos y condiciones aquí descritos. Con este registro, el cliente tomador queda automáticamente registrada en la App de Telemedicina MEDICALL24, y podrá inscribir 3 usuarios adicionales como beneficiarios del plan adquirido. Los usuarios beneficiarios podrán recibir la atención en salud en las mismas condiciones que el cliente tomador. Para agregar los usuarios beneficiarios el cliente tomador deberá registrarlos en la opción correspondiente al momento de la compra del plan de telemedicina.",
//         },
//     ] as TermBlock[];
// };


export const termContent: TermBlock[] = [
    {
        type: "paragraph",
        content:
          "Estos son los Términos y Condiciones de Uso de los CANALES VIRTUALES producidos, suministrados y controlados por MEDICALL24 SAS (en adelante LA COMPAÑÍA), los cuales incluyen los siguientes: i) Plataforma web para prestadores de salud denominada 'Panel Web'; ii) Aplicación para dispositivos móviles denominada 'App MEDICALL24'; y iii) Página web con dirección www.medicall24.com.co; por favor lea cuidadosamente."
      },
      {
        type: "paragraph",
        content:
          "Al hacer clic en la casilla 'acepto términos y condiciones', usted habrá manifestado su aceptación sin restricciones de este aviso legal y, por lo tanto, de los Términos y Condiciones de uso acá establecidas. Si usted no acepta los Términos y Condiciones de Uso establecidos aquí, usted no podrá acceder ni utilizar los servicios de los CANALES VIRTUALES de LA COMPAÑÍA."
      },
      {
        type: "paragraph",
        content:
          "LA COMPAÑÍA puede modificar estos Términos y Condiciones de Uso en cualquier momento sin previo aviso. Usted deberá leer lo contenido en este instrumento legal periódicamente para revisar las normativas aquí establecidas, debido a que las mismas son obligatorias para usted. Los términos 'usted' o 'usuario', tal como se usan aquí, se refieren a todas las personas o entidades (naturales o jurídicas) que accedan a los CANALES VIRTUALES de LA COMPAÑÍA."
      },
      {
        type: "paragraph",
        content:
          "Los Términos y Condiciones de Uso generales que a continuación se establecen, regulan el uso de los CANALES VIRTUALES de LA COMPAÑÍA. Si usted no está de acuerdo con estos Términos y Condiciones de Uso, le solicitamos abstenerse de utilizar estos CANALES VIRTUALES de LA COMPAÑÍA, ya que su uso de cualquier forma indicará que usted acepta tácitamente estos Términos y Condiciones."
      },
      {
        type: "title",
        content: "Introducción"
      },
      {
        type: "paragraph",
        content:
          "Los presentes Términos y Condiciones de Uso de los CANALES VIRTUALES de LA COMPAÑÍA se publican con el fin de informar a todos los usuarios que LA COMPAÑÍA ha puesto a su disposición los CANALES VIRTUALES con la finalidad de realizar transacciones y gestionar sus servicios de manera ágil y segura."
      },
      {
        type: "paragraph",
        content:
          "Los presentes Términos y Condiciones de Uso constituyen un acuerdo legal vinculante entre el usuario de los CANALES VIRTUALES y LA COMPAÑÍA, y establecen las condiciones de su uso. Por lo anterior, es su obligación como usuario de los CANALES VIRTUALES de LA COMPAÑÍA leer cuidadosamente los presentes Términos y Condiciones de Uso. Debe tener en cuenta que, si decide no aceptarlos, no podrá acceder ni utilizar los servicios de los CANALES VIRTUALES de LA COMPAÑÍA; por lo anterior, al hacer clic en la casilla 'acepto los Términos y Condiciones de Uso', habrá manifestado su aceptación expresa, sin restricciones, reservas ni modificaciones a este Aviso Legal y, por lo tanto, a los Términos y Condiciones de Uso aquí establecidos."
      },
      {
        type: "title",
        content: "Funciones de los Canales Virtuales"
      },
      {
        type: "paragraph",
        content:
          "Los CANALES VIRTUALES de LA COMPAÑÍA brindan acceso a los usuarios que cumplen con determinados roles, como lo son: rol paciente, rol médico y rol prestador de salud. Los CANALES VIRTUALES permiten a los usuarios interactuar con funcionalidades como: agregar contenido de texto, imágenes y videos; opinar sobre contenido; editar y personalizar su perfil; solicitar citas médicas por consulta externa —ya sea gestionadas por EPS o de forma particular—; dar respuesta a solicitudes por parte de prestadores; recaudar cuotas moderadoras y pagos particulares; brindar atención médica por telemedicina mediante videollamadas en tiempo real; registrar información en la historia clínica; y descargar documentos médicos como historias clínicas, fórmulas, órdenes y certificados de incapacidad."
      },
      {
        type: "paragraph",
        content:
          "La atención médica es responsabilidad del prestador de salud habilitado según la normatividad colombiana. La telemedicina ofrecida a través de los CANALES VIRTUALES se realiza mediante comunicación sincrónica y permite diagnósticos, tratamientos y registros clínicos."
      },
      {
        type: "paragraph",
        content:
          "El contenido publicado por los usuarios en los CANALES VIRTUALES es informativo y su veracidad es responsabilidad exclusiva del usuario que lo genera. LA COMPAÑÍA no se responsabiliza por el entendimiento, interpretación o uso del mismo."
      },
      {
        type: "paragraph",
        content:
          "LA COMPAÑÍA se reserva la facultad de modificar o eliminar contenido publicado en los CANALES VIRTUALES, directamente o mediante terceros autorizados, sin notificación previa."
      },
      {
        type: "paragraph",
        content:
          "Con la aceptación de estos Términos y Condiciones de Uso, el usuario se obliga a usar los CANALES VIRTUALES conforme a la normatividad aplicable, a los presentes Términos y a la moral, las buenas costumbres y la confidencialidad. El usuario no podrá destinarlos a fines ilícitos o inmorales, ni a afectar intereses de terceros o de LA COMPAÑÍA."
      },
      {
        type: "title",
        content: "Limitación de Responsabilidades Médicas"
      },
      {
        type: "paragraph",
        content:
          "El contenido disponible en los CANALES VIRTUALES no sustituye el criterio médico profesional. LA COMPAÑÍA no presta servicios médicos, diagnósticos ni tratamientos. El contenido publicado es responsabilidad del usuario que lo genera, y cada usuario determinará el nivel de confianza que le otorga. Los únicos autorizados para brindar servicios médicos son los usuarios con rol de médicos, vinculados a un prestador habilitado."
      }, 
      {
        type: "title",
        content: "Requisitos para el Acceso"
      },
      {
        type: "paragraph",
        content:
          "LA COMPAÑÍA no garantiza el acceso permanente e ininterrumpido a los CANALES VIRTUALES, ni que este acceso sea libre de errores, o que el servicio o el servidor que lo pone a disposición, estén libres de virus u otros agentes nocivos. Cuando el usuario accede a los CANALES VIRTUALES de LA COMPAÑÍA, será su responsabilidad tomar las medidas pertinentes para evitar y/o corregir los virus u otros agentes nocivos existentes en su dispositivo."
      },
      {
        type: "paragraph",
        content:
          "El usuario será el único responsable del uso de la información contenida en los CANALES VIRTUALES de LA COMPAÑÍA."
      },
      {
        type: "paragraph",
        content:
          "Los CANALES VIRTUALES de LA COMPAÑÍA solo funcionaran si el dispositivo del USUARIO está conectado a internet."
      },
      {
        type: "paragraph",
        content:
          "El correcto funcionamiento de los CANALES VIRTUALES de LA COMPAÑÍA depende de la estabilidad y velocidad de internet y/o de la red de datos a la cual está conectado el dispositivo del USUARIO."
      },
      {
        type: "paragraph",
        content:
          "LA COMPAÑÍA puede permitir el acceso a otros sitios de internet a través de vínculos contenidos en los CANALES VIRTUALES, pero esto no implica ninguna relación contractual o comercial entre LA COMPAÑÍA y el operador del sitio vinculado. LA COMPAÑÍA no es responsable del contenido de ninguno de estos sitios y no garantiza los productos o servicios ofrecidos por el sitio vinculado; por lo tanto, cualquier transacción que el usuario lleve a cabo con estos sitios de internet, se realiza única y exclusivamente bajo su propia responsabilidad y autonomía y el proveedor del servicio del sitio vinculado. LA COMPAÑÍA no es responsable por ningún tipo de transmisión recibida desde cualquier sitio vinculado."
      },
    
      {
        type: "title",
        content: "Marco Legal"
      },
      {
        type: "paragraph",
        content:
          "El marco legal que regirá para los productos y servicios de los CANALES VIRTUALES de LA COMPAÑÍA, será el estipulado para el adecuado tratamiento de los datos personales que sean incorporados o circulen, incluyendo los datos de carácter sensible, de conformidad con lo establecido en la legislación vigente de Habeas Data y por lo previsto en la Ley Estatutaria 1581 de 2012, Decreto Único Reglamentario del Sector Comercio, Industria y Turismo- Decreto 1074 de 2015, la resolución 2654 de 2019, y las Políticas de Privacidad y Tratamiento de Datos Personales adoptadas por LA COMPAÑÍA."
      },
      {
        type: "paragraph",
        content:
          "El contenido de los Términos y Condiciones de Uso aquí previstos, puede ser objeto de modificaciones o actualizaciones, razón por la que será obligación del usuario revisar periódicamente el contenido de los mismos con el fin de mantenerse informado frente a los cambios que se puedan presentar. Por lo anterior, mediante la puesta en conocimiento de los Términos y Condiciones de Uso de los CANALES VIRTUALES de LA COMPAÑÍA, se entenderá cumplido el deber de informar al usuario."
      },
    
      {
        type: "title",
        content: "Autorización de Uso de los Canales Virtuales"
      },
      {
        type: "paragraph",
        content:
          "LA COMPAÑÍA, autoriza únicamente el uso de los CANALES VIRTUALES, sujeto a las reglas contenidas en el presente acuerdo de Términos y Condiciones de Uso, permaneciendo restringido su uso comercial o con cualquier otro fin diferente al autorizado."
      },
      {
        type: "paragraph",
        content:
          "El usuario se abstendrá de modificar, manipular, alterar, copiar, distribuir, transmitir, reproducir, licenciar, crear sitios web y aplicaciones para dispositivos móviles derivadas, vender o entregar la información recibida de los CANALES VIRTUALES de LA COMPAÑÍA en su dispositivo a un tercero; y en consecuencia asumirá los efectos legales si no llegare a cumplir con esta condición. Esta prohibición también incluye expresamente, sin limitarla, a la práctica de Screen Scraping o raspado de pantalla para obtener información, y el uso por parte de un tercero o en beneficio de un tercero. LA COMPAÑÍA no se hará responsable del mal uso que se haga de los CANALES VIRTUALES. El usuario se hará responsable de toda copia, emulación, alteración o modificación que afecte la integridad de LA COMPAÑÍA."
      },
      {
        type: "paragraph",
        content:
          "El usuario garantizará a LA COMPAÑÍA que no usará los CANALES VIRTUALES para fines contrarios a la ley o a lo estipulado en el presente acuerdo de Términos y Condiciones de Uso. En caso de utilizarse, legitimará a LA COMPAÑÍA a desactivar e impedir que el usuario continúe ingresando a la aplicación y al contenido comercial del mismo, y a iniciar las acciones legales, si a ello hubiere lugar."
      },
      {
        type: "paragraph",
        content:
          "La categoría de 'usuario' se obtiene al momento de registrarse en los CANALES VIRTUALES de LA COMPAÑÍA, creando el vínculo contractual con LA COMPAÑÍA."
      },
      {
        type: "paragraph",
        content:
          "La categoría de usuario se perderá en los siguientes eventos: 1. Cuando el estado de la cuenta del usuario en los CANALES VIRTUALES de LA COMPAÑÍA, esté suspendida o cancelada. 2. En el evento en que se logre demostrar que existió suplantación de identidad. 3. En cualquier momento en que el usuario registrado realice alguna actuación considerada como violatoria de estos Términos y Condiciones de Uso, de la Política de Privacidad, o cualquier conducta contraria a la legislación colombiana, el orden público o las buenas costumbres."
      },
    
      {
        type: "subtitle",
        content: "Creación de Usuario para el Acceso a los Canales Virtuales de la Compañía"
      },
      {
        type: "paragraph",
        content:
          "El usuario de los CANALES VIRTUALES de LA COMPAÑIA entiende y acepta que, para hacer uso de los mismos, se requiere la creación de una cuenta que lo identifique como tal. Para efectuar el registro del usuario se deberá ingresar entre otros datos, la información de la identificación, los nombres y apellidos, el correo electrónico y una contraseña de uso personal e intransferible. El usuario garantiza la autenticidad y veracidad de todos aquellos datos personales e información que entregue para registrarse, y se compromete a completar el formulario de suscripción con el resto de datos personales que se le solicitará al registrarse a cualquiera de los CANALES VIRTUALES de LA COMPAÑIA, incluyendo el aporte de imágenes para personalizar el perfil de su cuenta."
      },
    
      {
        type: "subtitle",
        content: "Uso de la Contraseña"
      },
      {
        type: "paragraph",
        content:
          "El usuario acepta que las contraseñas ingresadas al momento de su registro en los CANALES VIRTUALES de LA COMPAÑÍA, con la cual podrá iniciar sesión en su cuenta, son privadas e intransferibles, por lo que tendrá la obligación de custodia de las mismas, siendo el único responsable de las consecuencias derivadas del uso que otras personas o terceros hagan de ellas, por la falta del cumplimiento del deber de custodia de dichas contraseñas."
      },
      {
        type: "paragraph",
        content:
          "Por lo anterior, el usuario se compromete a informar a LA COMPAÑÍA sobre la pérdida o robo de su contraseña, del uso no autorizado de su contraseña por parte de terceros, o cualquier circunstancia que a su juicio deba ser conocida por LA COMPAÑÍA, a más tardar dentro del día hábil siguiente a tener conocimiento de tal situación, con el fin de evitar actos fraudulentos en contra de su propia persona, de LA COMPAÑÍA, o de terceros."
      }, 
        {
          type: "paragraph",
          content:
            "El usuario al hacer uso de su contraseña se obliga a abstenerse de realizar las siguientes acciones: a) acceder a documentos confidenciales o datos de salud de personas de las que no se encuentra legitimado por ley o por convención para hacerlo. b) suministrar información falsa a título personal o de su grupo familiar, así como omitir datos necesarios para la buena prestación del servicio y el registro clínico. b) dar un uso de los CANALES VIRTUALES de LA COMPAÑÍA contrario a la Ley, la moral y las buenas costumbres. c) realizar acciones tendientes a ocasionar daño o interrupción del servicio de los CANALES VIRTUALES de LA COMPAÑÍA."
        },
        {
          type: "paragraph",
          content:
            "El usuario que viole cualquiera de las condiciones contenidas en este acuerdo de Términos y Condiciones de Uso, será responsable por los daños y perjuicios de cualquier naturaleza que pueda sufrir LA COMPAÑÍA, o cualquier tercero que resulte perjudicado por su actuación."
        },
      
        {
          type: "subtitle",
          content: "Obligaciones del Usuario"
        },
        {
          type: "paragraph",
          content:
            "El usuario se compromete a hacer uso de los CANALES VIRTUALES de LA COMPAÑÍA, de conformidad con la ley colombiana, a estos Términos y Condiciones de Uso, a la Política de Privacidad y a las demás instrucciones que sean puestas en su conocimiento por parte de LA COMPAÑÍA, así como de conformidad con el orden público, la moral y las buenas costumbres."
        },
        {
          type: "paragraph",
          content:
            "El usuario garantiza la autenticidad y veracidad de todos aquellos datos personales e información que entregue para completar el formulario de suscripción o registro. Así mismo, el usuario se compromete y se responsabiliza de mantener actualizada toda la información que haya entregado, permitiendo con ello prestar un mejor servicio por parte de LA COMPAÑÍA."
        },
        {
          type: "paragraph",
          content:
            "Cuando el usuario inserte o incorpore cualquier información a los CANALES VIRTUALES de LA COMPAÑÍA, garantiza que la información es completa y veraz, que posee todos los derechos sobre la misma y que se encuentra autorizado para entregarla."
        },
        {
          type: "paragraph",
          content:
            "El uso de los CANALES VIRTUALES de LA COMPAÑÍA únicamente se encuentra permitido para personas mayores de 18 años y para personas sin condiciones de incapacidad legal. Los menores de 18 años de edad y las personas en condiciones de incapacidad legal, podrán usar los CANALES VIRTUALES siempre y cuando cuenten con la autorización de los padres o sus representantes legales. En ese sentido y por el principio de la buena fe, se entiende que la persona que está accediendo a los CANALES VIRTUALES de LA COMPAÑÍA es mayor de edad, no tiene condición de incapacidad legal, o está autorizada, monitorizada o acompañada por sus padres o representantes legales, razón por la que no existirá responsabilidad alguna para LA COMPAÑÍA, por las actuaciones del usuario."
        },
      
        {
          type: "title",
          content: "Derechos de Propiedad Industrial e Intelectual"
        },
        {
          type: "paragraph",
          content:
            "Todas las marcas, nombres comerciales, signos distintivos, diseños industriales, modelos de utilidad, patentes, servicios, contenidos e informaciones de cualquier clase que aparecen en los CANALES VIRTUALES son propiedad de LA COMPAÑÍA, por lo que no podrán ser reproducidos, distribuidos, comunicados públicamente, transformados o modificados sin autorización expresa."
        },
        {
          type: "paragraph",
          content:
            "Por lo anterior, el usuario se abstendrá de obtener los contenidos de los CANALES VIRTUALES de LA COMPAÑÍA, empleando para ello medios o procedimientos distintos de los que, en algunos casos, se han puesto a su disposición o, en general, de los que se empleen habitualmente en internet siempre que, estos últimos, no entrañen un riesgo o daño o inutilización de los CANALES VIRTUALES de LA COMPAÑÍA y sus contenidos."
        },
        {
          type: "paragraph",
          content:
            "En ningún caso se entenderá que el acceso y la navegación del usuario en los CANALES VIRTUALES de LA COMPAÑÍA, implica que LA COMPAÑÍA haya otorgado una autorización o haya renunciado, transmitido, cedido total o parcialmente sus derechos, ni la concesión de ningún derecho ni expectativa de derecho y en concreto, de la alteración, transformación, explotación, reproducción, distribución o comunicación pública sobre los mismos."
        },
        {
          type: "paragraph",
          content:
            "Los titulares de los derechos de propiedad industrial podrán iniciar acciones legales comerciales, civiles, penales, o de cualquier clase, en contra del usuario de la aplicación que realice actos contrarios a las reglas de propiedad industrial contenidas en la ley, o en el presente acuerdo de Términos y Condiciones de Uso y la Política de Privacidad."
        },
      
        {
          type: "title",
          content: "Derechos de Autor"
        },
        {
          type: "paragraph",
          content:
            "Todo el contenido de cualquier clase que aparezca en los CANALES VIRTUALES de LA COMPAÑÍA, susceptible de ser objeto de derechos patrimoniales de autor, conforme a la Ley 23 de 1982 y demás normas que regulen esta materia, son propiedad de MEDICALL24 SAS, por lo que no podrán ser reproducidos, distribuidos, comunicados públicamente, transformados, copiados o modificados sin autorización expresa."
        },
        {
          type: "paragraph",
          content:
            "Conforme a lo anterior, los CANALES VIRTUALES serán en todo momento de titularidad de LA COMPAÑÍA. El usuario no tendrá ningún derecho de dominio ni disposición sobre los CANALES VIRTUALES de LA COMPAÑÍA, por lo que no podrá realizar actos de disposición, gravámenes, licenciamientos, ni cesiones sobre ellos."
        },
        {
          type: "paragraph",
          content:
            "En ningún caso se entenderá que el acceso y la navegación del usuario en los CANALES VIRTUALES de LA COMPAÑÍA, implica que LA COMPAÑÍA haya otorgado una autorización o haya renunciado, transmitido, cedido total o parcialmente sus derechos, ni la concesión de ningún derecho ni expectativa de derecho y en concreto, de la alteración, transformación, explotación, reproducción, distribución, copia o comunicación pública sobre los mismos."
        },
        {
          type: "paragraph",
          content:
            "Respecto del contenido comercial sobre el cual el usuario tiene acceso, este será exclusivamente de los clientes de LA COMPAÑIA, por lo que los Licenciatarios, no se harán responsables del contenido comercial de sus clientes. La función de LA COMPAÑÍA solo se limitará a permitir el acceso comercial mediante los CANALES VIRTUALES."
        },
        {
          type: "paragraph",
          content:
            "El Usuario se abstendrá de obtener los contenidos de los CANALES VIRTUALES de LA COMPAÑÍA empleando para ello medios o procedimientos distintos de los que, en algunos casos, se han puesto a su disposición o, en general, de los que se empleen habitualmente en internet, siempre que, estos últimos, no entrañen un riesgo, daño o inutilización de los CANALES VIRTUALES de LA COMPAÑÍA y sus contenidos."
        },
        {
          type: "paragraph",
          content:
            "LA COMPAÑÍA, como titulares de los derechos patrimoniales de los CANALES VIRTUALES, se reservará el derecho de iniciar las acciones legales comerciales, civiles, penales o de cualquier clase, en contra del usuario que realicen actos contrarios a las reglas de derechos de autor contenidas en la ley o en el presente acuerdo de Términos y Condiciones de Uso."
        },
        {
            type: "title",
            content: "LIMITACIÓN DE RESPONSABILIDAD"
          },
          {
            type: "paragraph",
            content:
              "El usuario utilizará los CANALES VIRTUALES bajo su exclusiva responsabilidad, teniendo en cuentas las siguientes circunstancias:"
          },
          {
            type: "list",
            items: [
              "LA COMPAÑÍA garantiza al usuario que los servidores contarán con procedimientos de seguridad necesarios para evitar la pérdida, alteración o acceso de terceros a la información personal del usuario, sin embargo, cada situación deberá analizarse en particular, puesto que el acceso ilícito a la información podrá constituir un caso de fuerza mayor o caso fortuito, en caso de que los Licenciatarios cumplan con las garantías mínimas de seguridad.",
              "LA COMPAÑÍA no será responsable de las destinaciones o transmisiones de dinero inválidas, fraudes y atentados a la seguridad de la información que se realicen por medio de las compañías proveedoras de internet.",
              "Bajo ninguna circunstancia, LA COMPAÑÍA, sus clientes, patrocinadores, anunciantes o proveedores de bienes y servicios se harán responsables de manera enunciativa, de daños directos, indirectos, incidentales, especiales, consecuenciales, o de cualquier otra clase, que sufra el usuario o tercero, por la utilización indebida de los CANALES VIRTUALES, de cualquier información, producto, servicios y demás gráficos relacionados que se obtengan a través de los servicios ofrecidos por LA COMPAÑÍA, ya sea con fundamento contractual, extracontractual, negligencia, responsabilidad objetiva o de cualquier régimen."
            ]
          },
        
          {
            type: "title",
            content: "RESTRICCIONES Y PROHIBICIONES"
          },
          {
            type: "paragraph",
            content:
              "El Usuario tendrá prohibido para sí o para terceras personas, autorizar la reproducción, copia, modificación o comercialización de los CANALES VIRTUALES de LA COMPAÑÍA y su contenido. El contenido de los CANALES VIRTUALES de LA COMPAÑÍA se extiende a textos, documentos, material audiovisual, imágenes gráficas, software, y sonidos en general, que genere la aplicación. Por lo anterior, el usuario bajo ninguna modalidad o circunstancia podrá explotar comercialmente, copiar, vender, distribuir, licenciar, ceder, o modificar el contenido de la aplicación. Tampoco podrá publicar el contenido de la aplicación en otras aplicaciones, blog´s o sitios web sin autorización previa, expresa y por escrito de LA COMPAÑÍA."
          },
          {
            type: "paragraph",
            content:
              "También le estará prohibido al usuario la realización o promoción de actividades en la aplicación que sean contrarios a la ley, a las sanas costumbres, al orden público y a la moral."
          },
          {
            type: "paragraph",
            content: "Con carácter enunciativo y no limitativo, se describirán algunas conductas prohibidas para los usuarios:"
          },
          {
            type: "list",
            items: [
              "Utilizar la aplicación para publicar contenido pornográfico, explotación sexual en cualquiera de sus modalidades, actos de racismo o apología del mismo, consumos de drogas, contenido de propaganda política, estafa o cualquier actitud contraria a las leyes de la República de Colombia y tratados Internacionales de ius cogens.",
              "Publicar contenido contrario a las reglas establecidas en la ley y en el presente acuerdo de Términos y Condiciones de Uso, respecto a los derechos de autor y a la propiedad industrial, así como cualquier acto de apología a la piratería o a la realización de copias ilegales protegidas por las leyes vigentes.",
              "Utilizar o fomentar el uso de los CANALES VIRTUALES de LA COMPAÑÍA, destinados a violar la intimidad de las personas, infringir la ley estatutaria de habeas data en cualquiera de sus modalidades o enviar correos masivos o spam.",
              "Realizar o promover la modificación del contenido de la aplicación, introducir de manera directa o indirecta virus, gusanos, troyanos y, en general, cualquier actitud tendiente a hackear el sistema y los ordenadores de los CANALES VIRTUALES de LA COMPAÑÍA. En consecuencia, si LA COMPAÑÍA detecta cualquier contenido que no guarde relación con el material de LA COMPAÑÍA, podrá retirarlo de los CANALES VIRTUALES en cualquier momento y sin previo aviso al usuario."
            ]
          },
        
          {
            type: "title",
            content: "EXCLUSIÓN DE RESPONSABILIDADES Y GARANTÍAS"
          },
        
          {
            type: "subtitle",
            content: "Disponibilidad y continuidad"
          },
          {
            type: "paragraph",
            content:
              "Por las características y necesidades tecnológicas de los CANALES VIRTUALES de LA COMPAÑÍA es posible que se presenten problemas en la disponibilidad o continuidad en el acceso y uso de los servicios de la misma, así como la ocurrencia de fallas técnicas en los servidores de acceso a la red. Por lo anterior, el usuario entiende y acepta que frente a la ocurrencia de fallas en los CANALES VIRTUALES debido a la indisponibilidad del servicio por causas de fuerza mayor, errores en las redes telemáticas de transferencia de datos o por causas ajenas a la voluntad de LA COMPAÑÍA, ésta no será responsable por los daños y perjuicios de cualquier naturaleza que puedan generarse al usuario y en esa medida, el usuario exime a LA COMPAÑÍA de cualquier responsabilidad en relación con las consecuencias de la ocurrencia de este tipo de eventos."
          },
          {
            type: "paragraph",
            content:
              "El acceso a la información y servicios que prestan los CANALES VIRTUALES de LA COMPAÑÍA, tienen en principio una duración indefinida, pero la misma dependerá de la decisión de LA COMPAÑÍA en continuar con el servicio prestado a través de los CANALES VIRTUALES. No obstante lo anterior, el acceso a los CANALES VIRTUALES podrá suspenderse o terminarse en cualquier momento en caso de que se compruebe cualquier violación a los esquemas de seguridad informática, o en caso de que se verifique suplantación en la identidad del usuario. Por lo anterior, LA COMPAÑÍA no será responsable por el retiro de los CANALES VIRTUALES o suspensión de la prestación de los servicios a través de la misma. En caso de que se pierda la calidad de usuario por cualquier causa, el usuario no podrá hacer uso de los CANALES VIRTUALES para consultar."
          },
        
          {
            type: "subtitle",
            content: "Exclusión de responsabilidad"
          },
          {
            type: "paragraph",
            content:
              "LA COMPAÑÍA no será responsable de los daños, pérdida de negocio, ingresos o beneficios, daño emergente, lucro cesante o de oportunidades de negocio, de ahorro de gastos y de desaparición o deterioro de datos, así como tampoco será en ningún caso responsable de: (a) Los costos, multas, sanciones, indemnizaciones, cargos, daños u honorarios que se deriven como consecuencia del incumplimiento por parte del usuario de sus obligaciones; (b) La violación del usuario de cualquier norma que pudiera resultar aplicable a causas o en relación con la utilización de los CANALES VIRTUALES, por lo tanto, el usuario es y será el único responsable de: (i) el uso que realice de los CANALES VIRTUALES; (ii) el cumplimiento íntegro de cualquier norma que pudiera resultar aplicable a causa o en relación con la utilización de los CANALES VIRTUALES, incluyendo, a título enunciativo pero no limitativo, las normas de uso de los CANALES VIRTUALES aquí contenidas, las disposiciones en materia de protección de datos, confidencialidad, secreto de las comunicaciones y derecho a la intimidad."
          },
        
          {
            type: "subtitle",
            content: "Virus y códigos maliciosos"
          },
          {
            type: "paragraph",
            content:
              "El usuario exime a LA COMPAÑÍAS de cualquier responsabilidad por los daños y perjuicios de toda naturaleza que puedan ser causados por, o que puedan deberse a la presencia de virus u otros códigos maliciosos en los contenidos que puedan producir cualquier tipo de daños en el sistema informático, documentos electrónicos o ficheros de los usuarios, incluyendo a título meramente enunciativo y sin carácter limitativo, \"virus informáticos\", gusanos, \"caballos de troya\", errores en la funcionalidad y operatividad (\"bugs\"), \"bombas de tiempo\", \"cancelbots\", \"Spyware\", \"phishing\", \"dialers\", \"hoaxes\", \"jokes\" etc."
          },
        
          {
            type: "subtitle",
            content: "Uso ilícito"
          },
          {
            type: "paragraph",
            content:
              "LA COMPAÑÍA cuenta con normas y procedimientos, restricciones de acceso y uso a la información que garantizan que solamente personal altamente calificado e idóneo maneje las bases de datos o de archivos sensibles cumpliendo con los protocolos para el manejo de esta información."
          },
          {
            type: "paragraph",
            content:
              "Por lo anterior LA COMPAÑÍA garantiza que los CANALES VIRTUALES se manejarán con adecuados estándares de seguridad, confidencialidad de la información y confiabilidad, de manera que cada usuario pueda mantener la reserva de su información. Sin embargo, no se hace responsable del incumplimiento de cualquier norma aplicable en que puedan incurrir los usuarios en su acceso a los CANALES VIRTUALES y/o utilización de las informaciones contenidas en la misma. Tampoco se hace responsable del uso ilegítimo que terceras personas puedan hacer de la información allí contenida."
          },
          {
            type: "title",
            content: "CLÁUSULA DE INDEMNIDAD A FAVOR DE LA COMPAÑÍA"
          },
          {
            type: "paragraph",
            content:
              "El usuario se obliga a mantener indemne a LA COMPAÑÍA de cualquier reclamación, perdida, daño, costo y pago de honorarios e indemnizaciones que se ocasione en virtud o como consecuencia directa o indirecta del uso de la aplicación, sobre el contenido al cual se tiene acceso y a la violación de leyes o derechos de terceros por parte del usuario."
          },
        
          {
            type: "title",
            content: "LEGISLACIÓN Y JURISDICCIÓN"
          },
          {
            type: "paragraph",
            content:
              "Los presentes Términos y Condiciones de Uso se regirán por la Legislación colombiana, y la jurisdicción competente para conocer de cualquier demanda que el uso de los CANALES VIRTUALES de LA COMPAÑÍA suscite, será la de los Juzgados y Tribunales de la República de Colombia."
          },
        
          {
            type: "title",
            content: "NULIDAD E INEFICACIA DE LOS NUMERALES O CLÁUSULAS"
          },
          {
            type: "paragraph",
            content:
              "Si cualquier numeral o cláusula incluida en estos Términos y Condiciones de Uso fuese declarado, total o parcialmente, nulo o ineficaz, tal nulidad o ineficacia afectará tan sólo a dicha disposición o a la parte de la misma que resulte nula o ineficaz, subsistiendo los Términos y Condiciones de Uso en todo lo demás."
          },
        
          {
            type: "title",
            content: "NATURALEZA DE LA RELACIÓN COMERCIAL"
          },
          {
            type: "paragraph",
            content:
              "El usuario reconoce y acepta que por el solo hecho de utilizar los CANALES VIRTUALES de LA COMPAÑÍA y aceptar los Términos y Condiciones de Uso, no tendrá la calidad de socio, mandatario, agente, empleado o representante de LA COMPAÑÍA. Bajo ninguna circunstancia, el usuario podrá realizar actos a nombre de los Licenciatarios en representación directa ni indirecta."
          },
        
          {
            type: "title",
            content: "FUERZA MAYOR O CASO FORTUITO"
          },
          {
            type: "paragraph",
            content:
              "Salvo las obligaciones dinerarias, entre ellas, las de pago, ninguna parte será responsable por demoras o responsable por no cumplimiento de las obligaciones pactadas por caso fortuito o fuerza mayor, así como circunstancias imprevisibles o irresistibles, de manera enunciativa y o limitativa, actos de guerra o conflicto civil, desastres naturales, paros, revoluciones y demás que no cuenten con un margen de previsión por las partes."
          },
        
          {
            type: "title",
            content: "CLÁUSULA DE INTEGRACIÓN DE CONTRACTUAL"
          },
          {
            type: "paragraph",
            content:
              "Las partes acuerdan que los presentes Términos y Condiciones de Uso serán el acuerdo único y completo, por lo que se podrá tener como fuente de interpretación de la relación comercial y, en consecuencia, sustituye cualquier acuerdo previo, escrito o verbal que hayan estipulado las partes."
          },
        
          {
            type: "title",
            content: "QUEJAS, SOLICITUDES O RECLAMOS"
          },
          {
            type: "paragraph",
            content:
              "En caso de que el usuario pretenda presentar una petición, queja, reclamo o solicitud, podrá enviarla por medio del siguiente link:",
              link: {
                label: "PQRS",
                href: "https://medicall24.com.co/pqrs/"
              }
          },

            {
              type: "title",
              content: "OBLIGACIONES DEL USUARIO"
            },
            {
              type: "list",
              listType: "dash",
              items: [
                "Guardar confidencialidad y buen uso de su cuenta y clave privada e intransferible de acceso a los CANALES VIRTUALES de LA COMPAÑÍA.",
                "Ser el responsable de todas las transacciones realizadas a través de su cuenta y clave privada e intransferible de acceso a los CANALES VIRTUALES de LA COMPAÑÍA.",
                "Notificar por escrito debidamente suscrito a LA COMPAÑÍA cualquiera de las siguientes situaciones:",
              ]
            },
            {
              type: "dash-list",
              items: [
                "Pérdida o hurto de su cuenta o clave privada e intransferible de acceso a los CANALES VIRTUALES.",
                "Uso no autorizado de su cuenta o clave personal e intransferible de acceso a los CANALES VIRTUALES.",
                "Fallas, errores o hechos inusuales al recibir algún mensaje en relación con una orden ejecutada por el usuario a través del sistema electrónico, o que haya sido recibida y/o ejecutada a través del mismo.",
                "Anulación de órdenes no emitidas por el usuario, o de impresiones o desacuerdos en la trasmisión de la información",
              ]
            },
            {
              type: "list",
              listType: "dash",
              items: [
                "Aceptar que la sesión de transacción no se cerrará hasta que el usuario lo decida haciendo clic en el botón cerrar sesión.",
                "Asumir la responsabilidad por las claves de acceso y las cuentas de usuario que llegase a delegar.",
                "Respetar la propiedad intelectual y derechos de autor sobre cualquier signo distintivo, información, material o contenido de los CANALES VIRTUALES de LA COMPAÑÍA.",
                "Aceptar los Términos y Condiciones de Uso que modifiquen o deroguen las condiciones de acceso y uso de los CANALES VIRTUALES de LA COMPAÑÍA.",
                "Será responsable del uso correcto de los CANALES VIRTUALES de LA COMPAÑÍA, así como de la veracidad de los datos que provea en el momento del registro de usuario."
              ]
            },
          
            {
              type: "title",
              content: "EXIMENTES DE RESPONSABILIDAD"
            },
            {
              type: "list",
              listType: "dash",
              items: [
                "Publicidad de bienes o servicios no prestados directamente por LA COMPAÑÍA.",
                "Intermitencia o suspensión del funcionamiento de los CANALES VIRTUALES de LA COMPAÑÍA.",
                "Suspensión del usuario por causas no imputables a LA COMPAÑÍA.",
                "Cambio sin previo aviso en el contenido de los CANALES VIRTUALES de LA COMPAÑÍA.",
                "Enlaces o conexiones a otras páginas web que no sean de propiedad de LA COMPAÑÍA.",
                "Dar por terminado este servicio e impedir el acceso a los CANALES VIRTUALES, cuando el usuario haya perdido dicha calidad."
              ]
            }

          
      


      
] as TermBlock[];

export const termBexaContent: TermBlock[] = [
    {
        type: "paragraph",
        content:
          "Estos son los Términos y Condiciones de Uso de los CANALES VIRTUALES producidos, administrados y controlados por MEDICALL24 SAS identificada con NIT 901144840-7 (en adelante LA COMPAÑIA), los cuales incluyen los siguientes: i) Plataforma web para prestadores de salud denominada “Panel Web MEDICALL24”; ii) Aplicación para dispositivos móviles denominada \"App MEDICALL24\", y iii) Páginas web con dirección www.appmedicall24.com y www.medicall24.com.co; por favor lea cuidadosamente."
      },
      {
        type: "paragraph",
        content:
          "Al hacer clic en la casilla “acepto términos y condiciones”, usted habrá manifestado su aceptación sin restricciones de este aviso legal y, por lo tanto, de los Términos y Condiciones de uso acá establecidas. Si usted no acepta los Términos y Condiciones de Uso establecidos aquí, usted no podrá acceder ni utilizar los servicios de los CANALES VIRTUALES de LA COMPAÑIA."
      },
      {
        type: "paragraph",
        content:
          "LA COMPAÑÍA puede modificar estos Términos y Condiciones de Uso en cualquier momento sin previo aviso. Usted deberá leer lo contenido en este instrumento legal periódicamente para revisar las normativas aquí establecidas, debido a que las mismas son obligatorias para usted. Los términos \"usted\", o, \"usuario\" tal como se usan aquí, se refieren a todas las personas o entidades (naturales o jurídicas) que accedan a los CANALES VIRTUALES de LA COMPAÑÍA."
      },
      {
        type: "paragraph",
        content:
          "Los Términos y Condiciones de Uso generales que a continuación se establecen, regulan el uso de los CANALES VIRTUALES de LA COMPAÑÍA. Si usted no está de acuerdo con estos Términos y Condiciones de Uso, le solicitamos abstenerse de utilizar estos CANALES VIRTUALES de LA COMPAÑÍA, ya que su uso de cualquier forma, indicará que usted acepta tácitamente estos Términos y Condiciones."
      },
      { type: "title", content: "INTRODUCCIÓN" },
      {
        type: "paragraph",
        content:
          "Los presentes Términos y Condiciones de Uso de los CANALES VIRTUALES de LA COMPAÑÍA se publican con el fin de informar a todos los usuarios, que LA COMPAÑÍA, ha puesto a su disposición la los CANALES VIRTUALES con la finalidad de realizar transacciones y gestionar sus servicios de manera ágil y segura."
      },
      {
        type: "paragraph",
        content:
          "Los presentes Términos y Condiciones de Uso constituyen un acuerdo legal vinculante entre el usuario de los CANALES VIRTUALES y LA COMPAÑÍA, y establecen las condiciones de su uso. Por lo anterior, es su obligación como usuario de los CANALES VIRTUALES de LA COMPAÑÍA leer cuidadosamente los presentes Términos y Condiciones de Uso. Debe tener en cuenta que, si decide no aceptarlos, no podrá acceder ni utilizar los servicios de los CANALES VIRTUALES de LA COMPAÑÍA; por lo anterior, al hacer Click en la casilla “acepto los Términos y Condiciones de Uso”, habrá manifestado su aceptación expresa, sin restricciones, reservas ni modificaciones a este Aviso Legal y por lo tanto a los Términos y Condiciones de Uso acá establecidos."
      },
      { type: "title", content: "FUNCIONES DE LOS CANALES VIRTUALES." },
{
  type: "paragraph",
  content:
    "Los CANALES VIRTUALES de LA COMPAÑÍA brindan acceso a los usuarios que cumplen con determinados roles, como lo son: rol paciente, rol médico y rol prestador de salud. Los CANALES VIRTUALES de LA COMPAÑÍA, permiten a los usuarios la interacción con diversas funcionalidades, como por ejemplo: i) agregar contenido de texto, imágenes y videos a su cuenta; ii) opinar sobre el contenido que le gusta, que no le gusta, o que le interesa de otros usuarios; iii) editar y personalizar su perfil; iv) realizar solicitudes de citas para servicios médicos, ya sea que estas se gestionen como parte del proceso de cuidado a cargo de una EPS, o que el paciente la solicite como parte de un servicio comprado de forma particular a un privado; v) dar respuesta a las solicitudes de citas por parte del prestador de salud habilitado; vi) recaudar cuotas moderadoras; vii) recaudar el valor de un servicio particular; viii) brindar atención médica mediante consultas bajo la modalidad de telemedicina, que son realizadas por los médicos de los prestadores de salud habilitados; ix) brindar atención médica urgente bajo la modalidad de telemedicina a los pacientes que consulten con médicos disponible en la urgencia del prestador de salud habilitado; x) registrar la información en salud de los pacientes en la historia clínica y sus formatos complementarios, luego de finalizar una atención médica; xi) descargar historias clínicas, fórmulas de medicamentos, órdenes médicas y certificados de incapacidad"
},

{
  type: "paragraph",
  content:
    "La atención en salud que se gestione utilizando cualquiera de los CANALES VIRTUALES de LA COMPAÑÍA, es responsabilidad de los prestadores de salud que brinde el servicio, los cuales, deben estar habilitado por el órgano de control competente, acorde a lo estipulado por las normas legales que regulan la materia en Colombia. El servicio de telemedicina que se brinda a través de los CANALES VIRTUALES de LA COMPAÑÍA, se realiza mediante videollamadas en tiempo real (comunicación sincrónica), y permite que los médicos de un prestador de salud atiendan eficientemente a sus pacientes, pudiendo emitir diagnósticos, instaurar tratamientos, y dejar registro de la atención en la clínica del paciente."
},
{
  type: "paragraph",
  content:
    "El contenido publicado por los usuarios en los CANALES VIRTUALES de LA COMPAÑÍA, es informativo; por lo tanto, ni LA COMPAÑÍA ni su(s) autor(es), se responsabilizan del entendimiento, la interpretación y el uso de este contenido por parte del usuario, pues la veracidad de la información contenida y publicada, es de exclusiva responsabilidad del usuario que la genera."
},
{
  type: "paragraph",
  content:
    "LA COMPAÑÍA se reserva la facultad de modificar o eliminar el contenido publicado en los CANALES VIRTUALES, por sí misma o mediante un tercero autorizado, sin notificar previamente al usuario."
},
{
  type: "paragraph",
  content:
    "Con la aceptación de los Términos y Condiciones de Uso de los CANALES VIRTUALES de LA COMPAÑÍA, el usuario se obliga a usar los CANALES VIRTUALES conforme a la normatividad que rige la materia y a los Términos y Condiciones de Uso que aquí se contemplan, siempre en observancia de la ley, la moral, la confidencialidad y las buenas costumbres; así mismo, se compromete a no destinar su uso a fines ilícitos o inmorales, o en detrimento de los intereses de terceros o de LA COMPAÑÍA."
},

{ type: "title", content: "CONDICIONES PARA ACCEDER A LOS SERVICIOS DEL EXAMEN BEXA PARA DETECTAR MASAS EN MAMA" },
{
  type: "paragraph",
  content:
    "El examen BEXA es un método de Tamizaje seguro y preciso, diseñado para superar las limitaciones de la mamografía, que no duele, no genera radiación, proporciona el resultado de inmediato, y se puede hacer en mujeres de cualquier edad, incluso si están embarazadas o lactando."
},
{
  type: "paragraph",
  content:
    "El examen se realiza con un dispositivo de alta precisión, que utiliza la elastografía de alta resolución y la inteligencia artificial, para generar imágenes que mapean las propiedades elásticas y la rigidez del tejido mamario, proporcionando la información sobre la presencia o no de masas anormales en la mama, incluyendo el cáncer, con una precisión asombrosa del 92%."
},
{
  type: "paragraph",
  content:
    "Este examen se comercializa por medio de los CANALES VIRTUALES de LA COMPAÑÍA, e incluye los siguientes beneficios:"
},
{
  type: "list",
  items: [
    "Valoración por médico general para establecer la condición de salud de la paciente.",
    "La realización del examen en las dos mamas.",
    "El análisis clínico para interpretar el resultado del examen, identificar si hay masas anormales en las mamas, y prescribir estudios complementarios.",
    "La educación para que las mujeres se realicen el autoexamen correctamente.",
    "La historia clínica de la atención.",
    "La entrega inmediata del resultado del examen."
  ]
},
{
  type: "paragraph",
  content:
    "La prestación de los servicios de salud que incluye el Examen BEXA para Detectar Masas en Mama, será realizada por Prestadores de Salud habilitados por el Ministerio de salud de Colombia, con los cuales, LA COMPAÑÍA ha suscrito una Alianza de Asociación Comercial Estratégica, para que estos prestadores de salud garanticen la prestación de los servicios de salud promovidos y comercializados por LA COMPAÑÍA."
},
{
  type: "paragraph",
  content:
    "LA COMPAÑÍA no es un Prestador de Salud, por lo tanto, la responsabilidad sobre la prestación de los servicios de salud promovidos y comercializados por LA COMPAÑÍA por medio de los CANALES VIRTUALES, está a cargo de los Prestadores de Salud que hacen parte de nuestra Alianza de Asociación Comercial Estratégica."
},
{
  type: "paragraph",
  content:
    "El Examen BEXA para Detectar Masas en Mama comercializado por medio de los CANALES VIRTUALES de LA COMPAÑÍA, solo será realizado en las instalaciones de los Prestadores de Salud que hacen parte de nuestra Alianza de Asociación Comercial Estratégica, ubicados en las ciudades que aparecen disponibles en la lista de ciudades al momento de la compra."
},
{
  type: "paragraph",
  content:
    "Para continuar con el pago del Examen BEXA para Detectar Masas en Mama, se deberá realizar el registro del(la) paciente que será beneficiario(a) del servicio. Este procedimiento podrá realizarse una vez sean aceptados los términos y condiciones aquí descritos. Con este registro el(la) paciente queda automáticamente registrado(a) en la App MEDICALL24, que será la aplicación que el(la) paciente deberá descargar de su tienda de aplicaciones y utilizar para verificar la asignación de la cita para el Examen BEXA para Detectar Masas en Mama. Esta App, además permite recibir las notificaciones de recordatorio de citas, cancelar y reprogramar nuevas citas, y descargar la historia clínica de la atención, las órdenes médicas y fórmulas de medicamentos, y el resultado del examen BEXA."
},

{
    type: "paragraph",
    content:
      "La dirección exacta donde se prestarán los servicios de salud que incluye el Examen BEXA para Detectar Masas en Mama, también puede ser consultada en la confirmación de la cita que estará disponible en la App MEDICALL24; sin embargo, esta información también será enviada al correo electrónico que se ingrese al momento del registro del(la) paciente."
  },
  {
    type: "paragraph",
    content:
      "El Examen BEXA para Detectar Masas en Mama se realizará de acuerdo con la disponibilidad de la agenda del Prestador de Salud designado o seleccionado al momento de la compra."
  },
  {
    type: "paragraph",
    content:
      "En caso de inasistencia a la cita asignada al(la) paciente, se aplicará un cobro adicional por valor de $30.000 COP para volver a programar la cita. La solicitud de la cita deberá realizarse a través de la App MEDICALL24, al mismo prestador de salud que se designó para brindar la atención; sin embargo, para que la cita vuelva a ser confirmada, el pago de este monto se deberá pagar de forma anticipada utilizando los métodos de pago electrónico disponibles en la App MEDICALL24."
  },
  {
    type: "paragraph",
    content:
      "Cualquier reclamación, solicitud, controversia, petición, queja o reclamo, que pueda surgir en relación con el Examen BEXA para Detectar Masas en Mama, adquirido por medio de los CANALES VIRTUALES de LA COMPAÑÍA, al igual que las solicitudes de reembolso, serán tramitadas a través de nuestro servicio de atención al cliente, utilizando el siguiente link:",
      link: {
        label: "PQRS",
        href: "https://medicall24.com.co/pqrs/"
      }
  },
  {
    type: "title",
    content: "LIMITACIÓN DE RESPONSABILIDADES MÉDICAS."
  },

  {
    type: "paragraph",
    content:
      "LA COMPAÑÍA no es responsable por las decisiones médicas tomadas por los usuarios registrados en los CANALES VIRTUALES de LA COMPAÑÍA con el rol médico o profesionales de la salud, ni por las consecuencias que puedan derivarse de las mismas. Los usuarios registrados en los CANALES VIRTUALES de LA COMPAÑÍA con el rol médico o profesionales de la salud, son los únicos que pueden proveer servicios de salud, de diagnóstico y tratamiento para pacientes. Sin embargo, los usuarios registrados en los CANALES VIRTUALES de LA COMPAÑÍA con el rol médico o profesionales de la salud, sólo podrán proveer servicios de salud, siempre y cuando estén vinculados en nuestro sistema a través de un prestador de salud registrado."
  },
  {
    type: "title",
    content: "REQUISITOS PARA EL ACCESO"
  },
  {
    type: "paragraph",
    content:
      "LA COMPAÑÍA no garantiza el acceso permanente e ininterrumpido a los CANALES VIRTUALES, ni que este acceso sea libre de errores, o que el servicio o el servidor que lo pone a disposición, estén libres de virus u otros agentes nocivos. Cuando el usuario accede a los CANALES VIRTUALES de LA COMPAÑÍA, será su responsabilidad tomar las medidas pertinentes para evitar y/o corregir los virus u otros agentes nocivos existentes en su dispositivo."
  },
  {
    type: "paragraph",
    content:
      "El usuario será el único responsable del uso de la información contenida en los CANALES VIRTUALES de LA COMPAÑÍA. Los CANALES VIRTUALES de LA COMPAÑÍA solo funcionaran si el dispositivo del USUARIO está conectado a internet. El correcto funcionamiento de los CANALES VIRTUALES de LA COMPAÑÍA depende de la estabilidad y velocidad de internet y/o de la red de datos a la cual está conectado el dispositivo del USUARIO."
  },
  {
    type: "paragraph",
    content:
      "LA COMPAÑÍA puede permitir el acceso a otros sitios de internet a través de vínculos contenidos en los CANALES VIRTUALES, pero esto no implica ninguna relación contractual o comercial entre LA COMPAÑÍA y el operador del sitio vinculado. LA COMPAÑÍA no es responsable del contenido de ninguno de estos sitios y no garantiza los productos o servicios ofrecidos por el sitio vinculado; por lo tanto, cualquier transacción que el usuario lleve a cabo con estos sitios de internet, se realiza única y exclusivamente bajo su propia responsabilidad y autonomía y el proveedor del servicio del sitio vinculado. LA COMPAÑÍA no es responsable por ningún tipo de transmisión recibida desde cualquier sitio vinculado."
  },
  {
    type: "title",
    content: "MARCO LEGAL"
  },
  {
    type: "paragraph",
    content:
      "El marco legal que regirá para los productos y servicios de los CANALES VIRTUALES de LA COMPAÑÍA, será el estipulado para el adecuado tratamiento de los datos personales que sean incorporados o circulen, incluyendo los datos de carácter sensible, de conformidad con lo establecido en la legislación vigente de Habeas Data y por lo previsto en la Ley Estatutaria 1581 de 2012, Decreto Único Reglamentario del Sector Comercio, Industria y Turismo- Decreto 1074 de 2015, la resolución 2654 de 2019, y las Políticas de Privacidad y Tratamiento de Datos Personales adoptadas por LA COMPAÑÍA."
  },
  {
    type: "paragraph",
    content:
      "El contenido de los Términos y Condiciones de Uso aquí previstos, puede ser objeto de modificaciones o actualizaciones, razón por la que será obligación del usuario revisar periódicamente el contenido de los mismos con el fin de mantenerse informado frente a los cambios que se puedan presentar. Por lo anterior, mediante la puesta en conocimiento de los Términos y Condiciones de Uso de los CANALES VIRTUALES de LA COMPAÑÍA, se entenderá cumplido el deber de informar al usuario."
  },
  {
    type: "title",
    content: "AUTORIZACIÓN DE USO DE LOS CANALES VIRTUALES"
  },
  {
    type: "paragraph",
    content:
      "LA COMPAÑÍA, autoriza únicamente el uso de los CANALES VIRTUALES, sujeto a las reglas contenidas en el presente acuerdo de Términos y Condiciones de Uso, permaneciendo restringido su uso comercial o con cualquier otro fin diferente al autorizado."
  },
  {
    type: "paragraph",
    content:
      "El usuario se abstendrá de modificar, manipular, alterar, copiar, distribuir, transmitir, reproducir, licenciar, crear sitios web y aplicaciones para dispositivos móviles derivadas, vender o entregar la información recibida de los CANALES VIRTUALES de LA COMPAÑÍA en su dispositivo a un tercero; y en consecuencia asumirá los efectos legales si no llegare a cumplir con esta condición. Esta prohibición también incluye expresamente, sin limitarla, a la práctica de Screen Scraping o raspado de pantalla para obtener información, y el uso por parte de un tercero o en beneficio de un tercero. LA COMPAÑÍA no se hará responsable del mal uso que se haga de los CANALES VIRTUALES. El usuario se hará responsable de toda copia, emulación, alteración o modificación que afecte la integridad de LA COMPAÑÍA."
  },
  {
    type: "paragraph",
    content:
      "El usuario garantizará a LA COMPAÑÍA que no usará los CANALES VIRTUALES para fines contrarios a la ley o a lo estipulado en el presente acuerdo de Términos y Condiciones de Uso. En caso de utilizarse, legitimará a LA COMPAÑÍA a desactivar e impedir que el usuario continúe ingresando a la aplicación y al contenido comercial del mismo, y a iniciar las acciones legales, si a ello hubiere lugar."
  },
  {
    type: "paragraph",
    content:
      "La categoría de “usuario” se obtiene al momento de registrarse en los CANALES VIRTUALES de LA COMPAÑÍA, creando el vínculo contractual con LA COMPAÑÍA."
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Cuando el estado de la cuenta del usuario en los CANALES VIRTUALES de LA COMPAÑÍA, esté suspendida o cancelada.",
      "En el evento en que se logre demostrar que existió suplantación de identidad.",
      "En cualquier momento en que el usuario registrado realice alguna actuación considerada como violatoria de estos Términos y Condiciones de Uso, de la Política de Privacidad, o cualquier conducta contraria a la legislación colombiana, el orden público o las buenas costumbres."
    ]
  },
  {
    type: "subtitle",
    content: "CREACIÓN DE USUARIO PARA EL ACCESO A LOS CANALES VIRTUALES DE LA COMPAÑÍA"
  },
  {
    type: "paragraph",
    content:
      "El usuario de los CANALES VIRTUALES de LA COMPAÑIA entiende y acepta que, para hacer uso de los mismos, se requiere la creación de una cuenta que lo identifique como tal. Para efectuar el registro del usuario se deberá ingresar entre otros datos, la información de la identificación, los nombres y apellidos, el correo electrónico y una contraseña de uso personal e intransferible. El usuario garantiza la autenticidad y veracidad de todos aquellos datos personales e información que entregue para registrarse, y se compromete a completar el formulario de suscripción con el resto de datos personales que se le solicitará al registrarse a cualquiera de los CANALES VIRTUALES de LA COMPAÑIA, incluyendo el aporte de imágenes para personalizar el perfil de su cuenta."
  },
  {
    type: "subtitle",
    content: "Uso de la contraseña"
  },
  {
    type: "paragraph",
    content:
      "El usuario acepta que las contraseñas ingresadas al momento de su registro en los CANALES VIRTUALES de LA COMPAÑÍA, con la cual podrá iniciar sesión en su cuenta, son privadas e intransferibles, por lo que tendrá la obligación de custodia de las mismas, siendo el único responsable de las consecuencias derivadas del uso que otras personas o terceros hagan de ellas, por la falta del cumplimiento del deber de custodia de dichas contraseñas."
  },
  {
    type: "paragraph",
    content:
      "Por lo anterior, el usuario se compromete a informar a LA COMPAÑÍA sobre la pérdida o robo de su contraseña, del uso no autorizado de su contraseña por parte de terceros, o cualquier circunstancia que a su juicio deba ser conocida por LA COMPAÑÍA, a más tardar dentro del día hábil siguiente a tener conocimiento de tal situación, con el fin de evitar actos fraudulentos en contra de su propia persona, de LA COMPAÑÍA, o de terceros."
  },
  {
    type: "paragraph",
    content:
      "El usuario al hacer uso de su contraseña se obliga a abstenerse de realizar las siguientes acciones: a) acceder a documentos confidenciales o datos de salud de personas de las que no se encuentra legitimado por ley o por convención para hacerlo. b) suministrar información falsa a título personal o de su grupo familiar, así como omitir datos necesarios para la buena prestación del servicio y el registro clínico. b) dar un uso de los CANALES VIRTUALES de LA COMPAÑÍA contrario a la Ley, la moral y las buenas costumbres. c) realizar acciones tendientes a ocasionar daño o interrupción del servicio de los CANALES VIRTUALES de LA COMPAÑÍA."
  },
  {
    type: "paragraph",
    content:
      "El usuario que viole cualquiera de las condiciones contenidas en este acuerdo de Términos y Condiciones de Uso, será responsable por los daños y perjuicios de cualquier naturaleza que pueda sufrir LA COMPAÑÍA, o cualquier tercero que resulte perjudicado por su actuación."
  }
  ,
  {
    type: "subtitle",
    content: "Obligaciones del Usuario"
  },
  {
    type: "paragraph",
    content:
      "El usuario se compromete a hacer uso de los CANALES VIRTUALES de LA COMPAÑÍA, de conformidad con la ley colombiana, a estos Términos y Condiciones de Uso, a la Política de Privacidad y a las demás instrucciones que sean puestas en su conocimiento por parte de LA COMPAÑÍA, así como de conformidad con el orden público, la moral y las buenas costumbres."
  },
  {
    type: "paragraph",
    content:
      "El usuario garantiza la autenticidad y veracidad de todos aquellos datos personales e información que entregue para completar el formulario de suscripción o registro. Así mismo, el usuario se compromete y se responsabiliza de mantener actualizada toda la información que haya entregado, permitiendo con ello prestar un mejor servicio por parte de LA COMPAÑÍA."
  },
  {
    type: "paragraph",
    content:
      "Cuando el usuario inserte o incorpore cualquier información a los CANALES VIRTUALES de LA COMPAÑÍA, garantiza que la información es completa y veraz, que posee todos los derechos sobre la misma y que se encuentra autorizado para entregarla."
  },
  {
    type: "paragraph",
    content:
      "El uso de los CANALES VIRTUALES de LA COMPAÑÍA únicamente se encuentra permitido para personas mayores de 18 años y para personas sin condiciones de incapacidad legal. Los menores de 18 años de edad y las personas en condiciones de incapacidad legal, podrán usar los CANALES VIRTUALES siempre y cuando cuenten con la autorización de los padres o sus representantes legales. En ese sentido y por el principio de la buena fe, se entiende que la persona que está accediendo a los CANALES VIRTUALES de LA COMPAÑÍA es mayor de edad, no tiene condición de incapacidad legal, o está autorizada, monitorizada o acompañada por sus padres o representantes legales, razón por la que no existirá responsabilidad alguna para LA COMPAÑÍA, por las actuaciones del usuario."
  },
  {
    type: "title",
    content: "DERECHOS DE PROPIEDAD INDUSTRIAL E INTELECTUAL"
  },
  {
    type: "paragraph",
    content:
      "Todas las marcas, nombres comerciales, signos distintivos, diseños industriales, modelos de utilidad, patentes, servicios, contenidos e informaciones de cualquier clase que aparecen en los CANALES VIRTUALES son propiedad de LA COMPAÑÍA, por lo que no podrán ser reproducidos, distribuidos, comunicados públicamente, transformados o modificados sin autorización expresa."
  },
  {
    type: "paragraph",
    content:
      "Por lo anterior, el usuario se abstendrá de obtener los contenidos de los CANALES VIRTUALES de LA COMPAÑÍA, empleando para ello medios o procedimientos distintos de los que, en algunos casos, se han puesto a su disposición o, en general, de los que se empleen habitualmente en internet siempre que, estos últimos, no entrañen un riesgo o daño o inutilización de los CANALES VIRTUALES de LA COMPAÑÍA y sus contenidos."
  },
  {
    type: "paragraph",
    content:
      "En ningún caso se entenderá que el acceso y la navegación del usuario en los CANALES VIRTUALES de LA COMPAÑÍA, implica que LA COMPAÑÍA haya otorgado una autorización o haya renunciado, transmitido, cedido total o parcialmente sus derechos, ni la concesión de ningún derecho ni expectativa de derecho y en concreto, de la alteración, transformación, explotación, reproducción, distribución o comunicación pública sobre los mismos."
  },
  {
    type: "paragraph",
    content:
      "Los titulares de los derechos de propiedad industrial podrán iniciar acciones legales comerciales, civiles, penales, o de cualquier clase, en contra del usuario de la aplicación que realice actos contrarios a las reglas de propiedad industrial contenidas en la ley, o en el presente acuerdo de Términos y Condiciones de Uso y la Política de Privacidad."
  },
  {
    type: "title",
    content: "DERECHOS DE AUTOR"
  },
  {
    type: "paragraph",
    content:
      "Todo el contenido de cualquier clase que aparezca en los CANALES VIRTUALES de LA COMPAÑÍA, susceptible de ser objeto de derechos patrimoniales de autor, conforme a la Ley 23 de 1982 y demás normas que regulen esta materia, son propiedad de MEDICALL24 SAS, por lo que no podrán ser reproducidos, distribuidos, comunicados públicamente, transformados, copiados o modificados sin autorización expresa."
  },
  {
    type: "paragraph",
    content:
      "Conforme a lo anterior, los CANALES VIRTUALES serán en todo momento de titularidad de LA COMPAÑÍA. El usuario no tendrá ningún derecho de dominio ni disposición sobre los CANALES VIRTUALES de LA COMPAÑÍA, por lo que no podrá realizar actos de disposición, gravámenes, licenciamientos, ni cesiones sobre ellos."
  },
  {
    type: "paragraph",
    content:
      "En ningún caso se entenderá que el acceso y la navegación del usuario en los CANALES VIRTUALES de LA COMPAÑÍA, implica que LA COMPAÑÍA haya otorgado una autorización o haya renunciado, transmitido, cedido total o parcialmente sus derechos, ni la concesión de ningún derecho ni expectativa de derecho y en concreto, de la alteración, transformación, explotación, reproducción, distribución, copia o comunicación pública sobre los mismos."
  },
  {
    type: "paragraph",
    content:
      "Respecto del contenido comercial sobre el cual el usuario tiene acceso, este será exclusivamente de los clientes de LA COMPAÑIA, por lo que los Licenciatarios, no se harán responsables del contenido comercial de sus clientes. La función de LA COMPAÑÍA solo se limitará a permitir el acceso comercial mediante los CANALES VIRTUALES."
  },
  {
    type: "paragraph",
    content:
      "El Usuario se abstendrá de obtener los contenidos de los CANALES VIRTUALES de LA COMPAÑÍA empleando para ello medios o procedimientos distintos de los que, en algunos casos, se han puesto a su disposición o, en general, de los que se empleen habitualmente en internet, siempre que, estos últimos, no entrañen un riesgo, daño o inutilización de los CANALES VIRTUALES de LA COMPAÑÍA y sus contenidos."
  },
  {
    type: "paragraph",
    content:
      "LA COMPAÑÍA, como titulares de los derechos patrimoniales de los CANALES VIRTUALES, se reservará el derecho de iniciar las acciones legales comerciales, civiles, penales o de cualquier clase, en contra del usuario que realicen actos contrarios a las reglas de derechos de autor contenidas en la ley o en el presente acuerdo de Términos y Condiciones de Uso."
  },
  {
    type: "title",
    content: "LIMITACIÓN DE RESPONSABILIDAD"
  },
  {
    type: "paragraph",
    content:
      "El usuario utilizará los CANALES VIRTUALES bajo su exclusiva responsabilidad, teniendo en cuenta las siguientes circunstancias:"
  },
  {
    type: "list",
    items: [
      "LA COMPAÑÍA garantiza al usuario que los servidores contarán con procedimientos de seguridad necesarios para evitar la pérdida, alteración o acceso de terceros a la información personal del usuario, sin embargo, cada situación deberá analizarse en particular, puesto que el acceso ilícito a la información podrá constituir un caso de fuerza mayor o caso fortuito, en caso de que los Licenciatarios cumplan con las garantías mínimas de seguridad.",
      "LA COMPAÑÍA no será responsable de las destinaciones o transmisiones de dinero inválidas, fraudes y atentados a la seguridad de la información que se realicen por medio de las compañías proveedoras de internet.",
      "Bajo ninguna circunstancia, LA COMPAÑÍA, sus clientes, patrocinadores, anunciantes o proveedores de bienes y servicios se harán responsables de manera enunciativa, de daños directos, indirectos, incidentales, especiales, consecuenciales, o de cualquier otra clase, que sufra el usuario o tercero, por la utilización indebida de los CANALES VIRTUALES, de cualquier información, producto, servicios y demás gráficos relacionados que se obtengan a través de los servicios ofrecidos por LA COMPAÑÍA, ya sea con fundamento contractual, extracontractual, negligencia, responsabilidad objetiva o de cualquier régimen."
    ]
  },
  
  {
    type: "title",
    content: "RESTRICCIONES Y PROHIBICIONES"
  },
  {
    type: "paragraph",
    content:
      "El Usuario tendrá prohibido para sí o para terceras personas, autorizar la reproducción, copia, modificación o comercialización de los CANALES VIRTUALES de LA COMPAÑÍA y su contenido. El contenido de los CANALES VIRTUALES de LA COMPAÑÍA se extiende a textos, documentos, material audiovisual, imágenes gráficas, software, y sonidos en general, que genere en cualquiera de ellos. Por lo anterior, el usuario bajo ninguna modalidad o circunstancia podrá explotar comercialmente, copiar, vender, distribuir, licenciar, ceder, o modificar el contenido de los CANALES VIRTUALES de LA COMPAÑÍA. Tampoco podrá publicar el contenido de los CANALES VIRTUALES de LA COMPAÑÍA en otras aplicaciones, blog´s o sitios web sin autorización previa, expresa y por escrito de LA COMPAÑÍA. También le estará prohibido al usuario la realización o promoción de actividades en los CANALES VIRTUALES de LA COMPAÑÍA que sean contrarios a la ley, a las sanas costumbres, al orden público y a la moral."
  },
  {
    type: "list",
    items: [
      "Utilizar los CANALES VIRTUALES de LA COMPAÑÍA para publicar contenido pornográfico, explotación sexual en cualquiera de sus modalidades, actos de racismo o apología del mismo, consumos de drogas, contenido de propaganda política, estafa o cualquier actitud contraria a las leyes de la República de Colombia y tratados Internacionales de ius cogens.",
      "Publicar contenido contrario a las reglas establecidas en la ley y en el presente acuerdo de Términos y Condiciones de Uso, respecto a los derechos de autor y a la propiedad industrial, así como cualquier acto de apología a la piratería o a la realización de copias ilegales protegidas por las leyes vigentes.",
      "Utilizar o fomentar el uso de los CANALES VIRTUALES de LA COMPAÑÍA, destinados a violar la intimidad de las personas, infringir la ley estatutaria de habeas data en cualquiera de sus modalidades o enviar correos masivos o spam.",
      "Realizar o promover la modificación del contenido de la aplicación, introducir de manera directa o indirecta virus, gusanos, troyanos y, en general, cualquier actitud tendiente a hackear el sistema y los ordenadores de los CANALES VIRTUALES de LA COMPAÑÍA. En consecuencia, si LA COMPAÑÍA detecta cualquier contenido que no guarde relación con el material de LA COMPAÑÍA, podrá retirarlo de los CANALES VIRTUALES en cualquier momento y sin previo aviso al usuario."
    ]
  },
  

  {
    type: "title",
    content: "EXCLUSIÓN DE RESPONSABILIDADES Y GARANTÍAS"
  },
  {
    type: "subtitle",
    content: "Disponibilidad y continuidad"
  },
  {
    type: "paragraph",
    content:
      "Por las características y necesidades tecnológicas de los CANALES VIRTUALES de LA COMPAÑÍA, es posible que se presenten problemas en la disponibilidad o continuidad en el acceso y uso de los servicios de la misma, así como la ocurrencia de fallas técnicas en los servidores de acceso a la red. Por lo anterior, el usuario entiende y acepta que frente a la ocurrencia de fallas en los CANALES VIRTUALES debido a la indisponibilidad del servicio por causas de fuerza mayor, errores en las redes telemáticas de transferencia de datos o por causas ajenas a la voluntad de LA COMPAÑÍA, esta no será responsable por los daños y perjuicios de cualquier naturaleza que puedan generarse al usuario y en esa medida, el usuario exime a LA COMPAÑÍA de cualquier responsabilidad en relación con las consecuencias de la ocurrencia de este tipo de eventos."
  },
  {
    type: "paragraph",
    content:
      "El acceso a la información y servicios que prestan los CANALES VIRTUALES de LA COMPAÑÍA, tienen en principio una duración indefinida, pero la misma dependerá de la decisión de LA COMPAÑÍA en continuar con el servicio prestado a través de los CANALES VIRTUALES. No obstante lo anterior, el acceso a los CANALES VIRTUALES podrá suspenderse o terminarse en cualquier momento en caso de que se compruebe cualquier violación a los esquemas de seguridad informática, o en caso de que se verifique suplantación en la identidad del usuario. Por lo anterior, LA COMPAÑÍA no será responsable por el retiro de los CANALES VIRTUALES o suspensión de la prestación de los servicios a través de la misma. En caso de que se pierda la calidad de usuario por cualquier causa, el usuario no podrá hacer uso de los CANALES VIRTUALES para consultar."
  },
  {
    type: "subtitle",
    content: "Exclusión de responsabilidad"
  },
  {
    type: "paragraph",
    content:
      "LA COMPAÑÍA no será responsable de los daños, pérdida de negocio, ingresos o beneficios, daño emergente, lucro cesante o de oportunidades de negocio, de ahorro de gastos y de desaparición o deterioro de datos, así como tampoco será en ningún caso responsable de: (a) Los costos, multas, sanciones, indemnizaciones, cargos, daños u honorarios que se deriven como consecuencia del incumplimiento por parte del usuario de sus obligaciones; (b) La violación del usuario de cualquier norma que pudiera resultar aplicable a causas o en relación con la utilización de los CANALES VIRTUALES, por lo tanto, el usuario es y será el único responsable de: (i) el uso que realice de los CANALES VIRTUALES; (ii) el cumplimiento íntegro de cualquier norma que pudiera resultar aplicable a causa o en relación con la utilización de los CANALES VIRTUALES, incluyendo, a título enunciativo pero no limitativo, las normas de uso de los CANALES VIRTUALES aquí contenidas, las disposiciones en materia de protección de datos, confidencialidad, secreto de las comunicaciones y derecho a la intimidad."
  },
  {
    type: "subtitle",
    content: "Virus y códigos maliciosos"
  },
  {
    type: "paragraph",
    content:
      "El usuario exime a LA COMPAÑÍAS de cualquier responsabilidad por los daños y perjuicios de toda naturaleza que puedan ser causados por, o que puedan deberse a la presencia de virus u otros códigos maliciosos en los contenidos que puedan producir cualquier tipo de daños en el sistema informático, documentos electrónicos o ficheros de los usuarios, incluyendo a título meramente enunciativo y sin carácter limitativo, \"virus informáticos\", gusanos, \"caballos de troya\", errores en la funcionalidad y operatividad (\"bugs\"), \"bombas de tiempo\", \"cancelbots\", \"Spyware\", \"phishing\", \"dialers\", \"hoaxes\", \"jokes\" etc."
  },
  {
    type: "subtitle",
    content: "Uso ilícito"
  },
  {
    type: "paragraph",
    content:
      "LA COMPAÑÍA cuenta con normas y procedimientos, restricciones de acceso y uso a la información que garantizan que solamente personal altamente calificado e idóneo maneje las bases de datos o de archivos sensibles cumpliendo con los protocolos para el manejo de esta información. Por lo anterior, LA COMPAÑÍA garantiza que los CANALES VIRTUALES se manejarán con adecuados estándares de seguridad, confidencialidad de la información y confiabilidad, de manera que cada usuario pueda mantener la reserva de su información. Sin embargo, no se hace responsable del incumplimiento de cualquier norma aplicable en que puedan incurrir los usuarios en su acceso a los CANALES VIRTUALES y/o utilización de las informaciones contenidas en la misma. Tampoco se hace responsable del uso ilegítimo que terceras personas puedan hacer de la información allí contenida."
  },
  {
    type: "title",
    content: "CLÁUSULA DE INDEMNIDAD A FAVOR DE LA COMPAÑÍA"
  },
  {
    type: "paragraph",
    content:
      "El usuario se obliga a mantener indemne a LA COMPAÑÍA de cualquier reclamación, perdida, daño, costo y pago de honorarios e indemnizaciones que se ocasione en virtud o como consecuencia directa o indirecta del uso de la aplicación, sobre el contenido al cual se tiene acceso y a la violación de leyes o derechos de terceros por parte del usuario."
  },
  {
    type: "title",
    content: "LEGISLACIÓN Y JURISDICCIÓN"
  },
  {
    type: "paragraph",
    content:
      "Los presentes Términos y Condiciones de Uso se regirán por la Legislación colombiana, y la jurisdicción competente para conocer de cualquier demanda que el uso de los CANALES VIRTUALES de LA COMPAÑÍA suscite, será la de los Juzgados y Tribunales de la República de Colombia."
  },
  {
    type: "title",
    content: "NULIDAD E INEFICACIA DE LOS NUMERALES O CLÁUSULAS"
  },
  {
    type: "paragraph",
    content:
      "Si cualquier numeral o cláusula incluida en estos Términos y Condiciones de Uso fuese declarado, total o parcialmente, nulo o ineficaz, tal nulidad o ineficacia afectará tan sólo a dicha disposición o a la parte de la misma que resulte nula o ineficaz, subsistiendo los Términos y Condiciones de Uso en todo lo demás."
  },
  {
    type: "title",
    content: "NATURALEZA DE LA RELACIÓN COMERCIAL"
  },
  {
    type: "paragraph",
    content:
      "El usuario reconoce y acepta que por el solo hecho de utilizar los CANALES VIRTUALES de LA COMPAÑÍA y aceptar los Términos y Condiciones de Uso, no tendrá la calidad de socio, mandatario, agente, empleado o representante de LA COMPAÑÍA. Bajo ninguna circunstancia, el usuario podrá realizar actos a nombre de los Licenciatarios en representación directa ni indirecta."
  },
  
  {
    type: "title",
    content: "FUERZA MAYOR O CASO FORTUITO"
  },
  {
    type: "paragraph",
    content:
      "Salvo las obligaciones dinerarias, entre ellas, las de pago, ninguna parte será responsable por demoras o responsable por no cumplimiento de las obligaciones pactadas por caso fortuito o fuerza mayor, así como circunstancias imprevisibles o irresistibles, de manera enunciativa y o limitativa, actos de guerra o conflicto civil, desastres naturales, paros, revoluciones y demás que no cuenten con un margen de previsión por las partes."
  },
  {
    type: "title",
    content: "CLÁUSULA DE INTEGRACIÓN CONTRACTUAL"
  },
  {
    type: "paragraph",
    content:
      "Las partes acuerdan que los presentes Términos y Condiciones de Uso serán el acuerdo único y completo, por lo que se podrá tener como fuente de interpretación de la relación comercial y, en consecuencia, sustituye cualquier acuerdo previo, escrito o verbal que hayan estipulado las partes."
  },
  {
    type: "title",
    content: "QUEJAS, SOLICITUDES O RECLAMOS"
  },
  {
    type: "paragraph",
    content:
      "En caso de que el usuario pretenda presentar una petición, queja, reclamo o solicitud, podrá enviarla por medio del siguiente link: ",
      link: {
        label: "PQRS",
        href: "https://medicall24.com.co/pqrs/"
      }
  },
  {
    type: "title",
    content: "OBLIGACIONES DEL USUARIO"
  },
  {
    type: "list",
    items: [
      "Guardar confidencialidad y buen uso de su cuenta y clave privada e intransferible de acceso a los CANALES VIRTUALES de LA COMPAÑÍA.",
      "Ser el responsable de todas las transacciones realizadas a través de su cuenta y clave privada e intransferible de acceso a los CANALES VIRTUALES de LA COMPAÑÍA.",
      "Notificar por escrito debidamente suscrito a LA COMPAÑÍA cualquiera de las siguientes situaciones:"
    ]
  },
  {
    type: "dash-list",
    items: [
      "Pérdida o hurto de su cuenta o clave privada e intransferible de acceso a los CANALES VIRTUALES.",
      "Uso no autorizado de su cuenta o clave personal e intransferible de acceso a los CANALES VIRTUALES.",
      "Fallas, errores o hechos inusuales al recibir algún mensaje en relación con una orden ejecutada por el usuario a través del sistema electrónico, o que haya sido recibida y/o ejecutada a través del mismo.",
      "Anulación de órdenes no emitidas por el usuario, o de impresiones o desacuerdos en la trasmisión de la información"
    ]
  },
  {
    type: "list",
    items: [
      "Aceptar que la sesión de transacción no se cerrará hasta que el usuario lo decida haciendo clic en el botón cerrar sesión.",
      "Asumir la responsabilidad por las claves de acceso y las cuentas de usuario que llegase a delegar.",
      "Respetar la propiedad intelectual y derechos de autor sobre cualquier signo distintivo, información, material o contenido de los CANALES VIRTUALES de LA COMPAÑÍA.",
      "Aceptar los Términos y Condiciones de Uso que modifiquen o deroguen las condiciones de acceso y uso de los CANALES VIRTUALES de LA COMPAÑÍA.",
      "Será responsable del uso correcto de los CANALES VIRTUALES de LA COMPAÑÍA, así como de la veracidad de los datos que provea en el momento del registro de usuario."
    ]
  },
  
  {
    type: "title",
    content: "EXIMENTES DE RESPONSABILIDAD"
  },
  {
    type: "list",
    items: [
      "Publicidad de bienes o servicios no prestados directamente por LA COMPAÑÍA.",
      "Intermitencia o suspensión del funcionamiento de los CANALES VIRTUALES de LA COMPAÑÍA.",
      "Suspensión del usuario por causas no imputables a LA COMPAÑÍA.",
      "Cambio sin previo aviso en el contenido de los CANALES VIRTUALES de LA COMPAÑÍA.",
      "Enlaces o conexiones a otras páginas web que no sean de propiedad de LA COMPAÑÍA.",
      "Dar por terminado este servicio e impedir el acceso a los CANALES VIRTUALES, cuando el usuario haya perdido dicha calidad."
    ]
  },
  

      
    // {
    //     type: "grid",
    //     items: [
    //         { ciudad: "MONTERÍA", departamento: "CORDOBA" },
    //         { ciudad: "BOGOTA, D.C.", departamento: "BOGOTA DC" },
    //         { ciudad: "MEDELLIN", departamento: "ANTIOQUIA" },
    //         { ciudad: "SAN JOSE DE CUCUTA", departamento: "NORTE DE SANTANDER" },
    //         { ciudad: "SANTA MARTA", departamento: "MAGDALENA" },
    //     ],
    // },
] as TermBlock[];



export const termBexaPackageContent: TermBlock[] = [
    {
        type: "paragraph",
        content:
            "Estos son los Términos y Condiciones para la prestación de los servicios ofertados y comercializados por MEDICALL24 SAS (en adelante LA COMPAÑIA), por favor lea cuidadosamente.",
    },
    {
        type: "paragraph",
        content:
            "Al hacer clic en la casilla “acepto los términos y condiciones”, usted habrá manifestado su aceptación sin restricciones de esteaviso legal y, por lo tanto, de los Términos y Condiciones acá establecidos. Si usted no acepta los Términos y Condiciones establecidos aquí, usted no podrá acceder ni utilizar los servicios ofertados y comercializados por LA COMPAÑIA. Si usted en cualquier momento no estuviera de acuerdo total o parcialmente con estostérminos y condiciones, deberá abstenerse inmediatamente de contratar el servicio.",
    },
    {
        type: "paragraph",
        content:
            'LA COMPAÑÍA puede modificar estos Términos y Condiciones en cualquier momento sin previo aviso. Usted deberá leer lo contenido en este instrumento legal periódicamente para revisar las normativas aquí establecidas, debido a que las mismas son obligatorias para usted. Los términos "usted", "usuario", o, "paciente", tal como se usan aquí, se refieren a todas las personas o entidades (naturales o jurídicas) que compren o accedan a los servicios ofertados y comercializados por LA COMPAÑIA.',
    },
    {
        type: "paragraph",
        content:
            "Los presentes Términos y Condiciones constituyen un acuerdo legal vinculante entre el usuario y LA COMPAÑÍA, y establecen las condiciones para acceder a los servicios ofertados y comercializados por LA COMPAÑÍA; por lo anterior, es su obligación como usuario leer cuidadosamente los presentes Términos y Condiciones.",
    },
    {
        type: "title",
        content:
            "CONDICIONES PARA ACCEDER A LOS SERVICIOS DEL PAQUETE EXAMEN BEXA PARA DETECTAR MASAS EN MAMA",
    },
    {
        type: "paragraph",
        content:
            "La prestación de los servicios de salud que incluye el Examen BEXA para Detectar Masas en Mama será realizada por Prestadores de Salud habilitados por el Ministerio de salud de Colombia, los cuales hacen parte de nuestra Alianza Comercial Estratégica. LA COMPAÑÍA no es un Prestador de Salud, por lo tanto, no tiene responsabilidad alguna sobre la prestación de los servicios de salud que hacen parte del Examen BEXA para Detectar Masas en Mama, los cuales, están a cargo de los Prestadores de Salud que hacen parte de la Alianza ComercialEstratégica.",
        link: {
            label: "Consulte nuestros Aliados aquí",
            href: "/aliados",
        },
    },
    {
        type: "paragraph",
        content:
            "  El Examen BEXA para Detectar Masas en Mama será realizado en las siguientes ciudades de Colombia:",
    },
    {
        type: "grid",
        items: [
            { ciudad: "MONTERÍA", departamento: "CORDOBA" },
            { ciudad: "BOGOTA, D.C.", departamento: "BOGOTA DC" },
            { ciudad: "MEDELLIN", departamento: "ANTIOQUIA" },
            { ciudad: "SAN JOSE DE CUCUTA", departamento: "NORTE DE SANTANDER" },
            { ciudad: "SANTA MARTA", departamento: "MAGDALENA" },

        ],
    },
] as TermBlock[];
