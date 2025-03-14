import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "react-toastify";
import { IAuthContextType } from "../types/auth.type.ts";
import axios from "../utils/axios.ts";
import { useQuery } from "@tanstack/react-query";

const AuthContext = createContext<IAuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const validateUser = () => axios.get("/user/get/token");

    const { data, isLoading } = useQuery({
        queryKey: ["getValid"],
        queryFn: validateUser,
        select: (data) => data?.data?.isValid ?? false,
    });

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);


    useEffect(() => {
        if (!isLoading && data !== undefined) {
            setIsAuthenticated(data);
        }
    }, [data, isLoading]);

    const login = () => {
        setIsAuthenticated(true);
        toast.success("Успешно вошёл в систему");
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
    };

    return (
        // @ts-ignore
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): IAuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
