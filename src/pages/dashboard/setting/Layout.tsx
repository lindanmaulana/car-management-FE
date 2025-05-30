import { NavLink, Outlet } from "react-router"
import { Main } from "../components/Main"

export const LayoutDashboardSetting = () => {
    return (
        <Main title="Settings" message="Manage system settings">
            <div className="py-6 px-4 rounded-xl shadow-card space-y-6">
                <nav>
                    <ul className="flex items-center gap-3">
                        <li>
                            <NavLink to={''} end className={({isActive}) => isActive ? "px-4 py-1 text-gray-900 border-b-2 border-gray-800" : "px-4 py-1"}>Profile</NavLink>
                        </li>
                        {/* <li>
                            <NavLink to={'brand'}  className={({isActive}) => isActive ? "px-4 py-1 text-gray-900 border-b-2 border-gray-800" : "px-4 py-1"}>Brand</NavLink>
                        </li> */}
                    </ul>
                </nav>
                <Outlet />
            </div>
        </Main>
    )
}