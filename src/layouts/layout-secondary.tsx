import React from "react";
import Header from "../components/layouts/header-secondary"
import Footer from "../components/layouts/footer"

interface LayoutProps {
    title: string;
    children: React.ReactNode;
    menuItems?: Array<{
        id: string;
        label: string;
        icon: React.ComponentType<{ className?: string }>;
        badge?: number;
    }>;
    activeSection?: string;
    onSectionChange?: (section: string) => void;
    onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
    title, 
    children,
    menuItems,
    activeSection,
    onSectionChange,
    onLogout,
}) => {
    React.useEffect(() => {
        document.title = title; 
    }, [title]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header 
                menuItems={menuItems}
                activeSection={activeSection}
                onSectionChange={onSectionChange}
                onLogout={onLogout}
            />
            <main className="flex-1 bg-gray-50">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
