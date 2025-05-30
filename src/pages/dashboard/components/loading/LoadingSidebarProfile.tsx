import { Skeleton } from "@/components/ui/skeleton"

export const LoadingSidebarProfile = () => {
    return (
            <div className="w-full grid grid-cols-4 gap-3">
                <Skeleton className="col-span-1 bg-gray-800 h-8" />
                <div className="col-span-2 flex flex-col justify-center gap-1">
                    <Skeleton className="max-w-[45%] bg-gray-800 h-3 space-y-1" />
                    <Skeleton className="bg-gray-800 h-3 space-y-1" />
                </div>
                <Skeleton className="col-span-1 bg-gray-800 h-8" />
            </div>
    )
}