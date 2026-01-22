import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "../src/routes/app.routes";
import PulsingSvg from "./components/ui/general-loader.tsx";

const App: React.FC = () => {
  const routing = useRoutes(routes);

  return (
    <Suspense fallback={<PulsingSvg />}>
      {routing}
    </Suspense>
  );
};

export default App;
