import { ServiceCar } from "@/lib/services/cars"
import type { Car } from "@/lib/types/cars"
import type { ResponseQuery } from "@/lib/types/response"
import { useQuery } from "@tanstack/react-query"

export const useCarGetOne = (token: string, id: string): ResponseQuery<Car> => {
    const query = useQuery({
        queryKey: ["carGetOne"],
        queryFn: () => ServiceCar.getOne(token, id)
    }) as ResponseQuery<Car>

    return query
}