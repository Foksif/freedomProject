import axios from "axios";
import {ILogin, IRegister} from "../types/auth.type.ts";
import {apiConfig} from "../configs/api.config.ts";

const url = apiConfig.baseURL + apiConfig.auth

class AuthService {
    async register(data: IRegister) {
        return await axios.post(`${url}/register`, data)
    }

    async login(data: ILogin) {
        return await axios.post(`${url}/login`, data)
    }
}

export const authService = new AuthService();