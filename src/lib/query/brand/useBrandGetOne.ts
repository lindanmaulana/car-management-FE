import { ServiceBrand } from "@/lib/services/brands"
import type { Brand } from "@/lib/types/brands"
import type { ResponseQuery } from "@/lib/types/response"
import { useQuery } from "@tanstack/react-query"

export const useBrandGetOne = (id: string): ResponseQuery<Brand> => {
    const query = useQuery({
        queryKey: ["brandGetOne"],
        queryFn: () => ServiceBrand.getOne(id)
    }) as ResponseQuery<Brand>


    return query
}