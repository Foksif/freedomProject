import axios from 'axios'
import { apiConfig } from "../configs/api.config.ts";

const instance = axios.create({
    baseURL: apiConfig.baseURL,
})

instance.interceptors.request.use(config => {
    const token = 'Bearer ' + localStorage.getItem('token')
    config.headers.Authorization = token
    return config
})

export default instance