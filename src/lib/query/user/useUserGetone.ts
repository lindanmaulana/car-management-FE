import { ServiceUserGetOne } from "@/lib/services/users"
import type { ResponseQuery } from "@/lib/types/response"
import type { User } from "@/lib/types/users"
import { useQuery } from "@tanstack/react-query"

export const useUserGetOne = (token: string): ResponseQuery<User>  => {
    const query = useQuery({
        queryKey: ["userGetOne"],
        queryFn: () => ServiceUserGetOne(token)
    }) as ResponseQuery<User>

    return query
}