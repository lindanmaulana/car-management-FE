import type { typeCarCreateSchema, typeCarUpdateSchema } from "@/schemas/cars";
import { axiosInstance, setToken } from "../axiosInstance";
import { UtilsErrorService } from "../utils/errors";

export interface ServiceCarParams {
    params?: string
}


export class ServiceCar {
    static async create(token: string, data: typeCarCreateSchema) {
        if(token) setToken(token)
        try {
            const response = await axiosInstance.post("/cars", data)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }

    static async getAll({params}: ServiceCarParams) {
        try {
            const response = await axiosInstance.get(`/cars?${params}`)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }

    static async getOne(token: string, id: string) {
        setToken(token)
        try {
            const response = await axiosInstance.get(`/cars/${id}`)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }

    static async update(token: string, id: string, data: typeCarUpdateSchema) {
        if(token) setToken(token)
        try {
            const response = await axiosInstance.patch(`/cars/${id}`, data)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }

    static async delete(token: string, id: string) {
        if(token) setToken(token)
        try {
            const response = await axiosInstance.delete(`/cars/${id}`)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))            
        }
    }
}