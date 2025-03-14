import {IRegister} from "../types/auth.type.ts";
import {authService} from "../services/auth.service.ts";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {pageConfig} from "../configs/page.config.ts";

export function useRegister() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (data: IRegister) => {
            const response = await authService.register(data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Успешная регистрация! Пожалуйста войдите в систему");
            navigate(pageConfig.login);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Ошибка при регистрации");
        }

    })
}