import { AxiosError } from "axios"

export const UtilsErrorService = (err: unknown) => {
    let errorMessage: string = "An unexpected error occurred!"

    if(err instanceof AxiosError) {
        errorMessage = err.response?.data.msg
    } else if(err instanceof Error) {
        errorMessage = err.message
    }

    return errorMessage
}