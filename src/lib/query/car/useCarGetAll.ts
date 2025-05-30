import { ServiceCar, type ServiceCarParams } from "@/lib/services/cars"
import type { Car } from "@/lib/types/cars"
import type { ResponseQuery } from "@/lib/types/response"
import { useQuery } from "@tanstack/react-query"

export const useCarGetAll = (request: ServiceCarParams): ResponseQuery<Car[]> => {
    const query = useQuery({
        queryKey: ["carGetAll", request.params],
        queryFn: () => ServiceCar.getAll({params: request.params})
    }) as ResponseQuery<Car[]>

    return query
}