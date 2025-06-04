import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import { useMemo } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { CarItem } from "./components/CarItem";

const PageDashboardCar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const searchDebounce = useMemo(() => debounce((key: string, params: string) => {
        const urlParams = new URLSearchParams(window.location.search)

        if(params) {
            urlParams.set(key, params)
        } else {
            urlParams.delete(key)
        }
    
        navigate(`${location.pathname}?${urlParams.toString()}`)
    }, 1000) ,[location.pathname, navigate])
        
    const handleSearch = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        
        searchDebounce(key, value)
    }
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Car</h3>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <IoSearch className="absolute top-1/2 -translate-y-1/2 left-3" />
                        <Input type="text" placeholder="Search car..." className="pl-9" defaultValue={searchParams.get("keyword") ?? ""} onChange={(e) => handleSearch("keyword", e)} />
                    </div>
                    <Button asChild>
                        <Link to={`${location.pathname}/add`}><IoIosAdd className="mt-px" /> Add New</Link>
                    </Button>
                </div>
            </div>
            <CarItem />
        </div>
    )
}

export default PageDashboardCar