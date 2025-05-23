import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";


const api = axios.create({
    baseURL: "http://localhost:8000/",
}
)

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `JWT ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    })

export default api;