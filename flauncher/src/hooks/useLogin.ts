import {ILogin} from "../types/auth.type.ts";
import {authService} from "../services/auth.service.ts";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../providers/AuthProvider.tsx";

export function useLogin() {
    const navigate = useNavigate();
    const { login } = useAuth()

    return useMutation({
        mutationFn: async (data: ILogin) => {
            const response = await authService.login(data);
            return response.data;
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.accessToken);
            login();
            navigate("/");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Ошибка при регистрации");
        }

    })
}