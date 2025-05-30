
// interface ServiceUserSignupParams {
//     name: string
//     email: string
//     password: string
//     confirmPassword: string
// }

import type { typeUserSignin, typeUserSignup, typeUserUpdate } from "@/schemas/users";
import { axiosInstance, setToken } from "../axiosInstance";
import type { Response } from "../types/response";
import type { User } from "../types/users";
import { UtilsErrorService } from "../utils/errors";

export const ServiceUserSignup = async (data: typeUserSignup): Promise<Response<User>> => {
    try {
        const response = await axiosInstance.post("/auth/signup", data)

        return response.data
    } catch (err) {
        throw new Error(UtilsErrorService(err))
    }
}

export const ServiceUserSignin = async (data: typeUserSignin): Promise<Response<User>> => {
    try {
        const response = await axiosInstance.post("/auth/signin", data)

        return response.data
    } catch (err) {
        throw new Error(UtilsErrorService(err))
    }
}


export const ServiceUserGetOne = async (token: string) => {
    if(token) setToken(token)

    try {
        const response = await axiosInstance.get("/users/profile")

        return response.data
    } catch (err) {
        throw new Error(UtilsErrorService(err))
    }
}

export const ServiceUserUpdate = async (token: string, data: typeUserUpdate) => {
    if(token) setToken(token)

    try {
        const response = await axiosInstance.patch("/users/update", data)

        return response.data
    } catch (err) {
        throw new Error(UtilsErrorService(err))
    }
}