import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "../src/routes/app.routes";

const App: React.FC = () => {
  const routing = useRoutes(routes);

  return (
    <Suspense fallback={<div className="text-center mt-10 text-xl">Cargando...</div>}>
      {routing}
    </Suspense>
  );
};

export default App;
