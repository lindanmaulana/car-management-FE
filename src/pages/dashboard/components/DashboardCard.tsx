import { useBrandGetAll } from "@/lib/query/brand/useBrandGetAll"
import { useCarGetAll } from "@/lib/query/car/useCarGetAll"
import { LuMoveRight } from "react-icons/lu"
import { Link } from "react-router"
import { LoadingDashboardCard } from "./loading/LoadingDashboardCard"

export const DashboardCard = () => {
        const queryCar = useCarGetAll({params: ""})
        const queryBrand = useBrandGetAll({params: ""})
        
        if(queryCar.isLoading || queryBrand.isLoading) return <LoadingDashboardCard />
        if(queryCar.isError || queryBrand.isError) return <p>Error {queryCar.error?.message} || {queryBrand.error?.message}...</p>
        
        const dataCar = queryCar.data.data
        const dataBrand = queryBrand.data.data
    return (
        <>
            <Link to={"/dashboard/car"} className="rounded-2xl h-70 bg-gray-600 ">
                        <figure className="w-full p-1 h-[70%] rounded-xl overflow-hidden">
                            <img src="/images/car.jpg" alt="Car" className="w-full h-full object-cover object-bottom rounded-xl" />
                        </figure>
                        <div className="h-[30%] px-8 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-white">Car</h2>
                                <p className="text-white/40">{dataCar.length} Units</p>
                            </div>
                            <p>
                                <LuMoveRight className="text-2xl text-white/50" />
                            </p>
                        </div>
                    </Link>
                    <Link to={"/dashboard/car/brand"} className="rounded-2xl h-70 bg-gray-600">
                        <figure className="w-full p-1 h-[70%] rounded-xl overflow-hidden">
                            <img src="/images/brand.jpg" alt="Car" className="w-full h-full object-cover object-bottom rounded-xl" />
                        </figure>
                        <div className="h-[30%] px-8 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-white">Brand</h2>
                                <p className="text-white/40">{dataBrand.length} </p>
                            </div>
                            <p>
                                <LuMoveRight className="text-2xl text-white/50" />
                            </p>
                        </div>
                    </Link>
        </>
    )
}