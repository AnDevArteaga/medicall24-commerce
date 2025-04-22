import React from "react";
import Layout from "../layouts/layout-index";
import Bexa from "../components/sections/index/bexa-service";
import Main from "../components/sections/index/main";
import PlanesEmpresa from "../components/sections/index/plan-company";
import PlanesPersonas from "../components/sections/index/plan-person";

const Home: React.FC = () => {
    return (
        <Layout title="Medicall24 | Inicio">
            <main>
                <section>
                    <Main />
                </section>
                <section>
                    <PlanesPersonas />
                </section>
                <section>
                    <PlanesEmpresa />
                </section>
                <section>
                    <Bexa />
                </section>
            </main>
        </Layout>
    );
};

export default Home;