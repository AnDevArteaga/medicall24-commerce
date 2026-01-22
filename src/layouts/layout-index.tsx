import React from "react";
import Header from "../components/layouts/header-primary"
import Footer from "../components/layouts/footer"

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
    React.useEffect(() => {
        document.title = title; 
    }, [title]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-gray-50">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
