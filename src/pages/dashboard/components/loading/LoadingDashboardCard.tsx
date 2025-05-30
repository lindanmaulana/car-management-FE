import { Skeleton } from "@/components/ui/skeleton"

export const LoadingDashboardCard = () => {
    return (
        <>
            <Skeleton className="relative w-full h-70 bg-gray-800 rounded-2xl">
                <Skeleton className="absolute top-1 left-1/2 -translate-x-1/2 w-[98%] h-40 rounded-xl" />
                <div className="absolute bottom-6 w-full flex items-center justify-between px-5">
                    <div className=" space-y-1">
                        <Skeleton className=" w-12 h-4 rounded-sm" />
                        <Skeleton className="w-14 h-4 rounded-sm" />
                    </div>
                    <Skeleton className="w-10 h-2 rounded-sm" />
                </div>
            </Skeleton>     
            <Skeleton className="relative w-full h-70 bg-gray-800 rounded-2xl">
                <Skeleton className="absolute top-1 left-1/2 -translate-x-1/2 w-[98%] h-40 rounded-xl" />
                <div className="absolute bottom-6 w-full flex items-center justify-between px-5">
                    <div className=" space-y-1">
                        <Skeleton className=" w-12 h-4 rounded-sm" />
                        <Skeleton className="w-14 h-4 rounded-sm" />
                    </div>
                    <Skeleton className="w-10 h-2 rounded-sm" />
                </div>
            </Skeleton>     
        </>
    )
}