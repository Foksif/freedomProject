import { ReactNode } from "react";
import {Header} from "../components/Header/Header.tsx";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header/>
            {children}
        </div>
    );
};

export default Layout;