import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("../pages/index"));
const FindDoctor = lazy(() => import("../pages/findDoctor"));
const Bexa = lazy(() => import("../pages/bexa"));
const Allies = lazy(() => import("../pages/allies"));
const PeoplePlan = lazy(() => import("../pages/peoplePlan"))
const Company = lazy(() => import("../pages/company"))


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
    path: "/bexa",
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
];

export default routes;
