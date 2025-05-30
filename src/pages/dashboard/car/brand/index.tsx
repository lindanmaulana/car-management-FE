import { useLocalStorage } from "react-use";
import { BrandAdd } from "./components/BrandAdd";
import { BrandItem } from "./components/BrandItem";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";
import type React from "react";
import { useMemo } from "react";
import debounce from "lodash.debounce"

const PageDashboardCarBrand = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [token] = useLocalStorage("token", "")

    const searchDebounce = useMemo(() => debounce((key: string, params: string) => {
        let url;

        if(params) {
            url = `${location.pathname}?${key}=${encodeURI(params)}`
        } else {
            url = location.pathname
        }

        navigate(url)

    }, 1000), [location.pathname, navigate])

    const handleSearchBrand = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        searchDebounce(key, value)
    }

    return (
       <div className="space-y-5">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Brand</h3>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <IoSearch className="absolute top-1/2 -translate-y-1/2 left-3" />
                        <Input type="text" placeholder="Search brand..." className="pl-9" onChange={(e) => handleSearchBrand("keyword", e)} />
                    </div>
                    <BrandAdd token={token!} />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <BrandItem token={token!} />
            </div>
       </div>
    )
}

export default PageDashboardCarBrand