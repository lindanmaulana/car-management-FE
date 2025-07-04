import { NavLink, Outlet } from "react-router"
import { Main } from "../components/Main"

export const LayoutDashboardCar = () => {

    return (
        <Main title="Car Management" message="Manage all your car">
            <div className="py-6 px-4 space-y-6">
                <nav>
                    <ul className="flex items-center gap-3">
                        <li>
                            <NavLink to={``} end className={({isActive}) => isActive ? "px-4 py-1 bg-gray-800 text-white rounded" : "px-2 rounded py-1"}>Car List</NavLink>
                        </li>
                        <li>
                            <NavLink to={'brand'}  className={({isActive}) => isActive ? "px-4 py-1 bg-gray-800 text-white rounded" : "px-2 rounded py-1"}>Brand</NavLink>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </Main>
    )
}