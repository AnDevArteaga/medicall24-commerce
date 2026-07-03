import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("../pages/index"));
const FindDoctor = lazy(() => import("../pages/findDoctor"));
const Bexa = lazy(() => import("../pages/bexa"));
const Allies = lazy(() => import("../pages/allies"));
const PeoplePlan = lazy(() => import("../pages/peoplePlan"))
const Company = lazy(() => import("../pages/company"))
const PaymentGateway = lazy(() => import("../pages/paymentGateway"))
const Dashboard = lazy(() => import("../pages/dashboard"))
const Login = lazy(() => import("../pages/login"))
const FreeTrial = lazy(() => import("../pages/freeTrial"))
const FreeConsult = lazy(() => import("../pages/freeConsult"))
const FreeConsultAccess = lazy(() => import("../pages/freeConsultAccess"))
const FreeConsultSchedule = lazy(() => import("../pages/freeConsultSchedule"))
const FreeConsultFinalize = lazy(() => import("../pages/freeConsultFinalize"))
const FreeTrialSpecialties = lazy(() => import("../pages/freeTrialSpecialties"))
const Terms = lazy(() => import("../pages/terminos"))
const PQRS = lazy(() => import("../pages/pqrs"))
const PoliticaPrivacidad = lazy(() => import("../pages/politica-privacidad"))
const EcosistemaMedico360 = lazy(() => import("../pages/ecosistemaMedico360"))
const EcosistemaAsesoriaLegal = lazy(() => import("../pages/ecosistemaAsesoriaLegal"))
const EcosistemaRespaldoTecnologico = lazy(() => import("../pages/ecosistemaRespaldoTecnologico"))
const SoftwareEnSalud = lazy(() => import("../pages/softwareEnSalud"))
const SoftwarePrediccionRiesgo = lazy(() => import("../pages/softwarePrediccionRiesgo"))
const SoftwareMedicionSignosVitales = lazy(() => import("../pages/softwareMedicionSignosVitales"))
const SoftwareAgendaCitas = lazy(() => import("../pages/softwareAgendaCitas"))
const SoftwareTelemedicina = lazy(() => import("../pages/softwareTelemedicina"))
const SoftwareHistoriasClinicas = lazy(() => import("../pages/softwareHistoriasClinicas"))
const SoftwareFacturaElectronica = lazy(() => import("../pages/softwareFacturaElectronica"))
const SoftwareComercioElectronico = lazy(() => import("../pages/softwareComercioElectronico"))
const SoftwareFinancieroContable = lazy(() => import("../pages/softwareFinancieroContable"))
const SoftwareIntegracionApi = lazy(() => import("../pages/softwareIntegracionApi"))


const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/buscar-médico",
    element: <FindDoctor />
  },
  {
    path: "/Examen-bexa",
    element: <Bexa />
  },
  {
    path: "/personas",
    element: <PeoplePlan />
  },
  {
    path: "/ecosistema-medico-360",
    element: <EcosistemaMedico360 />
  },
  {
    path: "/ecosistema-medico-360/asesoria-legal",
    element: <EcosistemaAsesoriaLegal />
  },
  {
    path: "/ecosistema-medico-360/respaldo-tecnologico",
    element: <EcosistemaRespaldoTecnologico />
  },
  {
    path: "/software-en-salud",
    element: <SoftwareEnSalud />
  },
  {
    path: "/software-en-salud/prediccion-del-riesgo",
    element: <SoftwarePrediccionRiesgo />
  },
  {
    path: "/software-en-salud/medicion-signos-vitales",
    element: <SoftwareMedicionSignosVitales />
  },
  {
    path: "/software-en-salud/agenda-citas",
    element: <SoftwareAgendaCitas />
  },
  {
    path: "/software-en-salud/telemedicina",
    element: <SoftwareTelemedicina />
  },
  {
    path: "/software-en-salud/historias-clinicas",
    element: <SoftwareHistoriasClinicas />
  },
  {
    path: "/software-en-salud/factura-electronica",
    element: <SoftwareFacturaElectronica />
  },
  {
    path: "/software-en-salud/comercio-electronico",
    element: <SoftwareComercioElectronico />
  },
  {
    path: "/software-en-salud/financiero-contable",
    element: <SoftwareFinancieroContable />
  },
  {
    path: "/software-en-salud/integracion-api",
    element: <SoftwareIntegracionApi />
  },
  {
    path: "/empresas",
    element: <Company />
  },
  {
    path: "/aliados",
    element: <Allies />
  },
  {
    path: "/pagos",
    element: <PaymentGateway />
  },
  {
    path: "/prueba",
    element: <FreeTrial />
  },
  {
    path: "/consulta-gratis",
    element: <FreeConsult />
  },
  {
    path: "/consulta-gratis/acceso",
    element: <FreeConsultAccess />
  },
  {
    path: "/consulta-gratis/agendar",
    element: <FreeConsultSchedule />
  },
  {
    path: "/consulta-gratis/finalizar",
    element: <FreeConsultFinalize />
  },
  {
    path: "/prueba-gratuita-especialidades",
    element: <FreeTrialSpecialties />
  },
  {
    path: "/gestionar-creditos",
    element: <Dashboard />
  },
  {
    path: "/iniciar-sesion",
    element: <Login />
  },
    {
    path: "/terminos-y-condiciones/:id",
    element: <Terms />
  },
  {
    path: "/pqrs",
    element: <PQRS />
  },
  {
    path: "/politica-de-privacidad",
    element: <PoliticaPrivacidad />
  },
];

export default routes;
