import config from "@/config";
import axios, { type AxiosInstance } from "axios"
console.log({config: config.BASEURLAPI})
export const axiosInstance: AxiosInstance = axios.create({
    baseURL: config.BASEURLAPI
})

export const setContentType = (data: unknown) => {
    if(data instanceof FormData) {
        delete axiosInstance.defaults.headers["Content-Type"]
    } else {
        axiosInstance.defaults.headers["Content-Type"] = "application/json"
    }
}

export const setToken = (token: string | null) => {
    if(token) {
        axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`
    } else {
        delete axiosInstance.defaults.headers["Authorization"]
    }
}   