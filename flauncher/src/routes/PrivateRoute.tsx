import { Navigate } from "react-router-dom";
import { ReactNode} from "react";
import { useAuth } from "../providers/AuthProvider.tsx";
import {pageConfig} from "../configs/page.config.ts";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === undefined) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to={pageConfig.login} />;
};

export default PrivateRoute;
