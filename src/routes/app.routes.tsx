import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("../pages/index"));
const FindDoctor = lazy(() => import("../pages/findDoctor"));
const Bexa = lazy(() => import("../pages/bexa"));
const Allies = lazy(() => import("../pages/allies"));


const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/find-doctor",
    element: <FindDoctor />
  },
  {
    path: "/bexa",
    element: <Bexa />
  },
  {
    path: "/allies",
    element: <Allies />
  },
];

export default routes;
