import api from "../../api/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constant";


export async function userRegister(payload) {
    const res = await api.post('api/auth/register/', payload)
    return res.data;
}

export async function userLogin(payload) {
    const res = await api.post('api/auth/login/', payload)
    const response = res.data;
    if (response.success) {
        // ! If Success Setting Access And Refresh Token At Local Storage 
        localStorage.setItem(ACCESS_TOKEN, response.data.access)
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
    }
    return res.data;
}

export async function changePassword(payload) {
    const res = await api.post('api/auth/change-password/', payload)
    return res.data;
}

export async function forgotPassword(payload) {
    const res = await api.post('api/auth/forgot-password/', payload)
    return res.data;
}

export async function resetPassword(payload, uid, token) {
    const res = await api.post(`api/auth/reset-password/${uid}/${token}/`, payload)
    return res.data;
} 
