import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../layouts/layout-secondary'
import SEO from '../components/seo/SEO'

type PolicySection =
  | { title: string; content: string[]; subtitle?: string }
  | {
      title: string
      subsections: Array<{
        subtitle?: string
        content: string[]
        list?: string[]
        contentAfter?: string[]
      }>
    }

const PoliticaPrivacidad: React.FC = () => {
  const navigate = useNavigate()

  const sections: PolicySection[] = [
    {
      title: 'Política de Privacidad',
      content: [
        'Esta Política de Privacidad aplica para los productos producidos, suministrados y controlados por MEDICALL24 SAS (en adelante MEDICALL24), los cuales incluyen los siguientes CANALES VIRTUALES: i) Plataforma web para prestadores de salud denominada “Panel Web”; ii) Aplicación para dispositivos móviles denominada "App MEDICALL24", y iii) Página web con dirección www.appmedicall24.com.co.',
        'En esta Política de Privacidad se explica cómo recopilamos, usamos, compartimos y tratamos la información personal de los usuarios u organizaciones que usan nuestros CANALES VIRTUALES, por favor léala cuidadosamente. MEDICALL24 SAS se compromete a proteger y respetar su privacidad, sin embargo, si usted no está de acuerdo con esta Política de Privacidad, no debe usar nuestros CANALES VIRTUALES.',
      ],
    },
    {
      title: '¿Qué información recopilamos?',
      subsections: [
        {
          subtitle: 'Información que usted nos proporciona',
          content: [
            'La información de registro y perfil. Cuando un usuario se registra en cualquiera de los CANALES VIRTUALES de MEDICALL24, nos proporciona información que define el rol del usuario, el cual puede ser cualquiera de los siguiente roles: 1). Rol paciente, 2). Rol médico, y 3). Rol prestador de salud.',
            'Cuando el usuario se registra con el rol paciente, nos proporciona la información como el tipo de identificación, el número de identificación, sus nombres y apellidos, la dirección de correo electrónico y la contraseña de la cuenta; este usuario podrá proporcionar también los datos de afiliación en salud y el régimen de afiliación si así lo desea.',
            'Cuando el usuario se registra con el rol médico, nos proporciona la información como el tipo de identificación, el número de identificación, sus nombres y apellidos, la especialidad, la dirección de correo electrónico y la contraseña de la cuenta.',
            'A los usuarios registrados con roles de pacientes y médicos, les recopilamos la información que el usuario suministra al ingresar a su cuenta y completar su perfil, como lo es: el género (si es masculino o femenino), la fecha de nacimiento, el estado civil, la ocupación, la dirección, el teléfono, los nombres y apellidos de la persona responsable del usuario, el parentesco de la persona responsable del usuario, el teléfono de la persona responsable del usuario, y finalmente una imagen de perfil.',
            'El registro de un usuario como un prestador de salud, aplica para personas naturales o jurídicas debidamente habilitadas por los órganos de vigilancia y control para prestar el servicio de salud en Colombia. En este registro este usuario nos proporciona información como el tipo de identificación, el número de identificación, el dígito de verificación (del Número de Identificación Tributaria), el código del prestador, los nombres y apellidos en caso de ser personas naturales, o la razón social en caso de ser personas jurídicas; la clase de prestador (que pueden ser Instituciones - IPS, Profesionales Independientes o Transporte Especial de Pacientes), la dirección de correo electrónico, la naturaleza jurídica, el nivel de atención, el tipo de empresa (si es pública, privada o mixta), la dirección del domicilio, el teléfono, la página web, los datos del representante legal, la contraseña de la cuenta, una imagen de portada de su perfil y un logo.',
            'Contenido del usuario. Recopilamos la información de contenido que genera el usuario a través de los CANALES VIRTUALES, incluidas imágenes, archivos en pdf, audios y videos. Así mismo, recopilamos información de retroalimentación, reseñas y transmisiones en vivo que el usuario realiza, y los metadatos asociados, como, por ejemplo, ¿cuándo?, ¿dónde?, y ¿por quién? se creó el contenido, y los usuarios involucrados.',
            'Información en salud. Recopilamos información relacionada con la salud de los usuarios que utilizan los CANALES VIRTUALES de MEDICALL24. Esta información puede incluir la información médica, como el historial médico del paciente, las condiciones de salud actuales, los antecedentes farmacológicos, los antecedentes alérgicos, los antecedentes quirúrgicos, los antecedentes familiares, sus hábitos, y cualquier otra información relevante para que un profesional o especialista de la salud en Colombia pueda instaurar el tratamiento médico que el paciente requiera.',
            'Mensajes. Recopilamos la información que el usuario proporciona cuando redacta, envía o recibe mensajes a través de las funcionalidades de mensajería de los CANALES VIRTUALES. Esa información incluye el contenido del mensaje y la información sobre el mensaje, como por ejemplo, cuándo se envió, recibió o leyó, y los participantes del mensaje. Tenga en cuenta que los mensajes que elija enviar a otros usuarios desde los CANALES VIRTUALES, podrán ser consultados por dichos usuarios y que no somos responsables de la manera en que esos usuarios usen o compartan los mensajes.',
            'Información de compra. Cuando el usuario realiza una compra o pago a través de los CANALES VIRTUALES, recopilamos información sobre la compra o transacción de pago, como por ejemplo, información de la tarjeta de pago, facturación, entrega e información de contacto, y el concepto de la compra.',
            'Solicitudes y PQRS. Recopilamos la información en las comunicaciones que nos envían los usuarios, incluso cuando se comunican con nosotros para obtener asistencia o realizar una PQRS.',
          ],
        },
        {
          subtitle: 'Información recopilada automáticamente',
          content: [
            'Información de uso. Recopilamos información sobre cómo interactúa el usuario con los CANALES VIRTUALES, lo que incluye el contenido que le mostramos, el contenido que le gusta, el contenido que no le gusta, el contenido que le interesa y los problemas detectados.',
            'MEDICALL24 almacenará automáticamente información general, así como la cantidad y periodicidad de consulta del usuario en nuestros CANALES VIRTUALES. La mencionada información personal sólo se utilizará para obtener un correcto funcionamiento de la aplicación, junto con los fines estadísticos y comerciales.',
            'Datos de registro. Recopilamos información sobre las computadoras, teléfonos y otros dispositivos utilizados al interactuar con los CANALES VIRTUALES, que puede incluir información sobre los parlantes, el micrófono, la cámara, la versión del sistema operativo, la identificación del disco duro, el nombre de la PC o dispositivo, el modelo, la dirección del protocolo de internet (IP), el tipo de red, la configuración de la aplicación al utilizar nuestro servicio, la fecha y hora de uso del servicio, y cualquier otro dato que sea de relevancia para MEDICALL24. Cuando el usuario inicie sesión desde varios dispositivos, podremos usar la información de su perfil para identificar su actividad en los diferentes dispositivos que use.',
            'Información de imagen y texto. Recopilamos información sobre imágenes y mensajería de texto que forman parte del contenido y las transmisiones de datos durante la interacción de los usuarios. Podemos recopilar esta información para la moderación del contenido, para clasificación demográfica y para recomendaciones de contenido; además, para mejorar la interacción de los usuarios que utilizan los CANALES VIRTUALES.',
            'Contenido y contexto de salas de video y otras funciones: Recopilamos la información y el contenido de las salas de reuniones virtuales (videollamadas), generadas a través del uso de los CANALES VIRTUALES de MEDICALL24, que pueden incluir imágenes, grabaciones de audio y video, y la transcripción y edición del texto registrado por el usuario, antes, durante y después de la realización de la videollamada. El contenido del usuario puede contener su voz e imagen, según los permisos concedidos por el usuario.',
            'Información de uso de los CANALES VIRTUALES: recopilamos información sobre cómo los usuarios y sus dispositivos interactúan con las funcionalidades de los CANALES VIRTUALES; cuándo los participantes entran y salen de una sala; si los usuarios enviaron mensajes y con quién lo hicieron; si quedó registro de transcripciones y ediciones de texto; qué usuarios agregan contenido; qué usuarios reaccionan al contenido agregado por otro usuario, y otra información y métricas de uso. Esto también incluye información sobre cuándo y cómo la persona se registró o no, en un producto o servicio de MEDICALL24, y las visitas e interacciones que tuvo con los CANALES VIRTUALES.',
            'Los datos personales, archivos de imágenes, documentos, audio y/o videos que se obtengan en virtud del uso de los CANALES VIRTUALES, tendrán fines de suministro de información seleccionada para la interacción de los usuarios, para mejorar las funcionalidades de los CANALES VIRTUALES y será de uso exclusivo para MEDICALL24; por lo tanto, no se cederán ni se suministrarán a ningún tercero. El usuario, al aceptar esta Política de Privacidad, acepta el tratamiento de sus datos personales conforme a los fines mencionados y según lo dispuesto en la Ley 1581 de 2012 y el Decreto 1377 de 2013 en el territorio de Colombia.',
          ],
        },
      ],
    },
    {
      title:
        'Recolección de información proveniente de terceros, servidores publicitarios y patrocinadores',
      subsections: [
        {
          content: [
            'A pesar de que el contenido publicado en los CANALES VIRTUALES de MEDICALL24 pueda direccionar a los usuarios a páginas web de servidores publicitarios y empresas que ofrezcan bienes y servicios, esta Política de Privacidad solo tendrá por objeto los CANALES VIRTUALES de MEDICALL24. En consecuencia, MEDICALL24 SAS no se hará responsable, ni asumirá ninguna responsabilidad por el contenido, la información publicitaria, las promociones de bienes y servicios, la información y demás contenido que los usuarios publiquen en los CANALES VIRTUALES de MEDICALL24, ya que, en ningún caso, tal información comercial guarda relación con el objeto social de MEDICALL24 SAS.',
          ],
        },
        {
          subtitle:
            'Uso de cookies, clear, Gifs, web beacons o cualquier tecnología similar',
          content: [
            'MEDICALL24 SAS, así como los anunciantes y patrocinadores podrán usar cookies, clear, Gifs, web beacons o cualquier tecnología similar cuando el usuario utilice los CANALES VIRTUALES. El ingreso a los CANALES VIRTUALES se tomará como autorización expresa sobre el uso de cookies. La finalidad exclusiva del uso de cookies es recordarle al usuario sus preferencias comerciales, país, características del navegador, y la información del uso de los CANALES VIRTUALES, entre otros.',
            'Nuestros servidores podrán utilizar cookies, web beacons y otras tecnologías similares para apoyar a la presentación de dichos anuncios, y para medir la eficacia de los anuncios de publicidad.',
            'El usuario, en caso de ingresar a páginas web o a enlaces de internet de terceros, a través de las publicaciones realizadas en los CANALES VIRTUALES de MEDICALL24, deberá leer y aceptar por su cuenta las políticas de privacidad y los términos y condiciones de las mencionadas páginas y aplicaciones. Cada enlace y página web que direccione a páginas de clientes o terceros, se regirá por sus propias políticas de privacidad y de términos y condiciones, de las cuales MEDICALL24 SAS no se hace responsable.',
            'Las mencionadas páginas web o servidores de los anunciantes podrán emplear cookies, clear, Gifs, web beacons o cualquier tecnología similar para soportar las presentaciones de dichos anuncios. La utilización de esas nuevas tecnologías por terceras partes se rige por sus propias políticas de privacidad y no son objeto de regulación por esta Política de Privacidad.',
          ],
        },
      ],
    },
    {
      title: '¿Cómo usamos su información?',
      subsections: [
        {
          content: [
            'Los empleados de MEDICALL24 SAS no acceden ni utilizan el contenido del usuario sin la autorización del propietario de la cuenta, o según lo requieran razones legales o de seguridad. MEDICALL24 SAS no utiliza su información de audio, video, texto, imágenes y archivos adjuntos u otro contenido similar a comunicaciones, para entrenar modelos de inteligencia artificial propios o de terceros.',
            'Utilizamos su información para mejorar, para brindar asistencia y administrar los CANALES VIRTUALES de MEDICALL24, para permitirle utilizar de mejor manera las funcionalidades y para cumplir y hacer cumplir nuestros Términos de servicio. También podemos usar su información para personalizar el contenido que ve en los CANALES VIRTUALES, para la ampliación de los servicios y para personalizar su experiencia según las preferencias y gustos del usuario.',
            'Además, utilizamos la información que recopilamos para realizar las siguientes actividades:',
          ],
          list: [
            'Para cumplir con las funcionalidades de los CANALES VIRTUALES, para operaciones internas incluidas la resolución de problemas, análisis de datos, pruebas, investigación, fines estadísticos y comerciales.',
            'Para enviar materiales promocionales, incluso por mensajería instantánea o correo electrónico.',
            'Para mejorar y desarrollar nuestros CANALES VIRTUALES y llevar a cabo el desarrollo de otros productos.',
            'Para apoyar las funciones de los CANALES VIRTUALES, lo cual incluye permitirle a usted y a otras personas contactarse entre sí (por ejemplo, a través de nuestra funcionalidad de videollamadas), y para que usted y otras personas compartan e interactúen con el contenido que publican a través de los CANALES VIRTUALES.',
            'Para inferir más información sobre usted, como su rango de edad, género e intereses.',
            'Para ayudarnos a detectar y combatir abusos, actividades perjudiciales, fraudes, correos no deseados y actividades ilegales en los CANALES VIRTUALES.',
            'Para garantizar que el contenido se presente de la manera más eficiente para usted y su dispositivo.',
            'Para promover la seguridad de los CANALES VIRTUALES, lo que incluye escanear, analizar y revisar el contenido del usuario, los mensajes y los metadatos asociados para detectar violaciones de nuestros Términos de servicio, normas comunitarias, así como otras condiciones y políticas.',
            'Para verificar su identidad o edad.',
            'Para comunicarnos con usted, lo cual incluye notificarle cambios en nuestros servicios.',
            'De acuerdo con los permisos que usted haya otorgado, para proporcionarle servicios basados en la ubicación, como publicidad y otro contenido personalizado.',
            'Para capacitar y mejorar nuestra tecnología, como nuestros modelos y algoritmos de aprendizaje automático.',
            'Para cumplir con la ley aplicable o responder a un proceso legal válido, incluso de agencias policiales o gubernamentales, para investigar o participar en descubrimientos civiles, litigios u otros procedimientos legales contradictorios, protegerlo a usted, a nosotros y a otros contra fraudes y maliciosos, actividades engañosas, abusivas o ilegales, y para hacer cumplir o investigar posibles violaciones de nuestros Términos de servicio o políticas.',
          ],
        },
      ],
    },
    {
      title: '¿Cómo compartimos su información?',
      subsections: [
        {
          content: [
            'Proporcionamos datos personales a terceros solo con su consentimiento o en una de las siguientes circunstancias:',
            'Información del usuario: cuando utilice los servicios de los CANALES VIRTUALES de MEDICALL24, la información de su perfil, sus datos personales, la información relacionada con su salud, y el contenido de su cuenta, serán visibles para otros usuarios, siempre y cuando usted autorice que otros usuarios tengan acceso a su información.',
            'Proveedores de servicios: Proporcionamos información y contenido a proveedores de servicios que brindan asistencia a nuestra empresa, como por ejemplo proveedores de servicios en la nube y proveedores de servicios de moderación de contenido, y proveedores de servicios que nos ayuden a comercializar los CANALES VIRTUALES.',
            'Procesadores de pagos y proveedores de cumplimiento de transacciones: Si elige realizar transacciones relacionadas con pagos, compartiremos datos con el procesador de pagos correspondiente para facilitar esta transacción.',
            'Proveedores de análisis: Utilizamos proveedores de análisis que nos ayudan a optimizar y mejorar los CANALES VIRTUALES.',
            'Por razones legales: podemos compartir datos personales según sea necesario para:',
          ],
          list: [
            'Cumplir con la ley aplicable o responder, investigar o participar en procesos y procedimientos legales válidos, incluso de agencias policiales o gubernamentales;',
            'Hacer cumplir o investigar posibles violaciones de sus Términos de servicio o políticas;',
            'Detectar, prevenir o investigar posibles fraudes, abusos o problemas de seguridad, incluidas las amenazas al público;',
            'Proteger nuestros derechos y propiedades y los de nuestros clientes;',
            'Resolver disputas y hacer cumplir acuerdos.',
          ],
          contentAfter: [
            'Cambio de control: podemos compartir datos personales con adquirentes reales o potenciales, sus representantes y otros participantes relevantes en, o durante las negociaciones de, cualquier venta, fusión, adquisición, reestructuración o cambio de control que involucre todo o una parte del negocio de MEDICALL24 SAS o sus activos, incluso en relación con procedimientos de quiebra o similares.',
          ],
        },
      ],
    },
    {
      title: '¿Dónde almacenamos su información?',
      content: [
        'Su información puede almacenarse en servidores ubicados dentro o fuera del país donde vive, como, por ejemplo, Canadá o los Estados Unidos.',
      ],
    },
    {
      title: 'Sus derechos y opciones',
      content: [
        'Usted tiene derechos y puede opinar en lo que respecta a su información. Es posible que las leyes aplicables le otorguen ciertos derechos, que pueden incluir el derecho a acceder, eliminar, actualizar o rectificar sus datos, a ser informado del tratamiento de sus datos, a presentar denuncias ante las autoridades y posiblemente otros derechos.',
        'Puede presentar una solicitud para ejercer sus derechos en virtud de las leyes aplicables en la siguiente dirección: https://appmedicall24.com.co/pqrs/. Puede objetar cualquier decisión que hayamos tomado sobre su solicitud siguiendo las instrucciones en la comunicación que reciba de nosotros en la que se le notifique nuestra decisión.',
        'Tenga en cuenta que usted puede editar la información de su perfil iniciando sesión en la cuenta que tenga activa en nuestros CANALES VIRTUALES. También puede limitar y controlar quien ve su contenido, entre otras cosas. Si decide hacerlo, puede eliminar toda su cuenta en la sección de Configuración y privacidad.',
      ],
    },
    {
      title: 'Seguridad de su información',
      content: [
        'Tomamos las medidas necesarias para garantizar que se trate su información de manera segura y de acuerdo con esta política.',
        'Aunque la transmisión de información a través de Internet no es completamente segura, contamos con medidas técnicas y administrativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo de probabilidad e impacto para sus derechos y libertades, así como los de otros usuarios. Por lo anterior, implementamos medidas razonables para proteger y garantizar la seguridad de sus datos personales, por ejemplo, mediante el uso de encriptación en tránsito o de cifrado en tránsito, que protege los datos en caso de que se intercepten las comunicaciones mientras se transfieren datos entre un sitio y el proveedor de servicios en la nube o entre dos servicios.',
        'Mantendremos estas medidas técnicas y administrativas y las actualizaremos para mejorar la seguridad de nuestros sistemas cuando corresponda.',
      ],
    },
    {
      title: 'Información relacionada con niños y adolescentes',
      content: [
        'Menores de 18 años: Los menores de 12 años de edad podrán registrarse como usuarios de los CANALES VIRTUALES de MEDICALL24, siempre y cuando cuenten con la autorización de los padres o representantes legales. Los menores a su cargo, deberán manifestar su consentimiento en relación con las condiciones aquí descritas y aportar la información personal requerida para el registro del usuario; sin embargo, los padres o representantes legales del menor, serán los responsables del registro del menor en los CANALES VIRTUALES de MEDICALL24.',
        'Para el caso de los padres o representantes legales de los menores de edad que sean mayores adultos (esto es mayores de 12 años), únicamente podrán abrir las cuentas de usuarios de estos menores adultos cuando cuenten con autorización para ello. Se entenderá que la apertura de cuentas de usuarios menores adultos, por parte de sus padres o representantes legales, cuenta con la autorización de los menores adultos, razón por la que MEDICALL24 SAS no se hará responsable por la apertura de cuentas de usuario que carezcan de tal autorización. Los padres o representantes legales deben informar a los menores sobre la finalidad del tratamiento de sus datos personales por parte de MEDICALL24 SAS.',
        'Personas incapaces o adultos mayores: En los casos de representación por condiciones de incapacidad legal, o por relaciones de parentesco; por ejemplo en caso de que un hijo mayor de edad quiera manejar la cuenta de sus padres adultos mayores, o un padre quiera manejar la cuenta de su hijo adolescente, los representantes legales o parientes tendrán la posibilidad de abrir cuenta de usuarios en los CANALES VIRTUALES de MEDICALL24 para las personas a su cargo; sin embargo, deberá contar con autorización expresa de las partes relacionadas o del tutor o curador del incapaz, en donde conste que se actúa como la persona a cargo de la información del incapaz o adulto mayor y en consecuencia, que podrá tener acceso directo a la cuenta de este.',
      ],
    },
    {
      title: '¿Cuánto tiempo conservamos su información?',
      content: [
        'Conservamos datos personales durante el tiempo necesario para realizar los usos descritos en esta Política de Privacidad, a menos que la ley aplicable exija un período de retención distinto.',
        'Conservamos datos personales si tenemos la obligación legal de hacerlo, por ejemplo, ciertas leyes nos exigen mantener registros de sus transacciones durante un cierto período de tiempo antes de que podamos eliminarlos.',
        'Se conservarán datos personales si la retención es aconsejable a la luz de nuestra posición legal, como en lo que respecta a la aplicación de nuestros acuerdos, la resolución de disputas y los estatutos de limitaciones, litigios o investigaciones regulatorias aplicables.',
      ],
    },
    {
      title: 'Actualización de la Política de Privacidad',
      content: [
        'Actualizaremos esta Política de Privacidad cuando lo consideremos necesario. Al actualizar la Política de Privacidad, le notificaremos actualizando la fecha de la "Última actualización" que aparece en la parte superior de esta política y publicando la nueva o proporcionando cualquier otro aviso que exija la ley aplicable. Si usted continúa usando a los CANALES VIRTUALES de MEDICALL24, después de la fecha de actualización de la política, se considerará que acepta la política actualizada.',
      ],
    },
    {
      title: 'Contáctenos',
      content: [
        'Para ejercer sus derechos, o si tiene alguna pregunta o comentario relacionado con la privacidad de sus datos, o con respecto a esta Política de Privacidad, envíenos una petición haciendo clic en el siguiente link: https://appmedicall24.com.co/pqrs/.',
      ],
    },
  ]

  return (
    <>
      <SEO
        title="Política de Privacidad | Medicall24"
        description="Conozca cómo Medicall24 protege y trata sus datos personales de acuerdo con la Ley 1581 de 2012 en Colombia."
        keywords="política de privacidad, datos personales, protección de datos, Medicall24, Ley 1581"
        url="https://medicall24.com.co/politica-de-privacidad"
      />
      <Layout title="Política de Privacidad | Medicall24">
        <div className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-8 py-6 bg-primary text-white text-center">
                <h1 className="text-2xl font-bold uppercase">
                  Política de Privacidad
                </h1>
                <p className="mt-2 opacity-90">
                  Tratamiento de Datos Personales - Medicall24 SAS
                </p>
              </div>

              <div className="px-8 py-8 space-y-8 text-gray-800">
                {sections.map((section, idx) => (
                  <div key={idx}>
                    <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase border-b border-gray-200 pb-2">
                      {section.title}
                    </h2>
                    {'subsections' in section && section.subsections ? (
                      <div className="space-y-6 mt-4">
                        {section.subsections.map((sub, sIdx) => (
                          <div key={sIdx}>
                            {sub.subtitle && (
                              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                {sub.subtitle}
                              </h3>
                            )}
                            <div className="space-y-3 text-gray-700 leading-relaxed">
                              {sub.content.map((paragraph, pIdx) => (
                                <p key={pIdx} className="text-sm">
                                  {paragraph}
                                </p>
                              ))}
                              {sub.list && (
                                <ul className="list-disc pl-6 space-y-2 mt-3">
                                  {sub.list.map((item, iIdx) => (
                                    <li key={iIdx} className="text-sm">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {sub.contentAfter?.map((paragraph, pIdx) => (
                                <p
                                  key={`after-${pIdx}`}
                                  className="text-sm mt-3"
                                >
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        {'subtitle' in section && section.subtitle && (
                          <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-3">
                            {section.subtitle}
                          </h3>
                        )}
                        <div className="space-y-3 text-gray-700 leading-relaxed">
                          {('content' in section ? section.content : []).map(
                            (paragraph: string, pIdx: number) => (
                              <p key={pIdx} className="text-sm">
                                {paragraph}
                              </p>
                            ),
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="px-8 py-6 bg-gray-100 flex justify-center rounded-b-xl">
                <button
                  onClick={() => navigate(-1)}
                  className="px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primarydark transition-colors duration-300"
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default PoliticaPrivacidad
