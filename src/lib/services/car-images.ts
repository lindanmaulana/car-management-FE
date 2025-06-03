import type { TypeCarImageUpdateSchema } from "@/schemas/car-images";
import { axiosInstance, setContentType, setToken } from "../axiosInstance";
import type { CarImage } from "../types/car-images";
import type { Response } from "../types/response";
import { UtilsErrorService } from "../utils/errors";

interface defaultParams {
    token?: string
    id?: string
}

export class ServiceCarImage {
    static async upload(token: string, id: string, data: File): Promise<Response<CarImage>> {
        const formData = new FormData()
        formData.append("image", data)
        
        setToken(token)
        setContentType(formData)
        try {
            const response = await axiosInstance.post(`/car-images/${id}`, formData)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }

    static async updateStatus({token, id}: defaultParams, data: TypeCarImageUpdateSchema): Promise<Response<CarImage>> {
        if(token) setToken(token)

        try {
            const response = await axiosInstance.patch(`/car-images/${id}`, data)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }

    static async deleteById({token, id}: defaultParams): Promise<Response<CarImage>> {
        if(token) setToken(token)

        try {
            const response = await axiosInstance.delete(`/car-images/${id}`)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }
}