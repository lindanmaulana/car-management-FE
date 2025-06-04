export interface Response<T> {
    success: boolean
    data: T,
    message: string
    total: number
}

export interface ResponseQuery<T> {
    data: {
        data: T
    }
    isLoading: boolean
    isError: boolean
    error: Error | null
}