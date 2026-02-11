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
const Terms = lazy(() => import("../pages/terminos"))
const PQRS = lazy(() => import("../pages/pqrs"))
const PoliticaPrivacidad = lazy(() => import("../pages/politica-privacidad"))


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
