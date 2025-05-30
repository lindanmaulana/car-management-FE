import type { typeBrandCreateSchema, typeBrandDeleteSchema, typeBrandUpdateSchema } from "@/schemas/brands";
import { axiosInstance, setToken } from "../axiosInstance";
import { UtilsErrorService } from "../utils/errors";

export interface BrandSearchRequest {
    params?: string
}

export class ServiceBrand {
    static async getAll(request: BrandSearchRequest) {
        try {
            const response = await axiosInstance.get(`/brands?${request.params}`)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }

    static async getOne(id: string) {
        try {
            const response = await axiosInstance.get(`/brands/${id}`)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }

    static async create(token: string, data: typeBrandCreateSchema) {
        if(token) setToken(token)
        try {
            const response = await axiosInstance.post("/brands", data)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }

    static async update(token: string, id: string, data: typeBrandUpdateSchema) {
        if(token) setToken(token)

        try {
            const response = await axiosInstance.patch(`/brands/${id}`, data)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }

    static async delete(token: string, data: typeBrandDeleteSchema) {
        if(token) setToken(token)
        try {
            const response = await axiosInstance.delete(`/brands/${data.id}`)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }
}