import { ServiceBrand, type BrandSearchRequest } from "@/lib/services/brands"
import type { Brand } from "@/lib/types/brands"
import type { ResponseQuery } from "@/lib/types/response"
import { useQuery } from "@tanstack/react-query"

export const useBrandGetAll = (request: BrandSearchRequest): ResponseQuery<Brand[]> => {
    const query = useQuery({
        queryKey: ["brandGetAll", request.params],
        queryFn: () => ServiceBrand.getAll({params: request.params})
    }) as ResponseQuery<Brand[]>

    return query
}