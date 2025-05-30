import { FaWarehouse } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router";

export const Header = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("profile")
        
        navigate("/auth/signin")
    }
    return (
        <header className="bg-gray-800 py-3">
            <div className="container max-w-6xl mx-auto">
                <div className="flex items-center justify-between">
                    <Link to={"/dashboard"}>
                        <h1 className="flex items-center gap-2 text-lg text-white font-semibold"><FaWarehouse className="text-xl text-white" /> Car Management</h1>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to={"/dashboard/profile"} className="flex items-center gap-1 text-sm text-white"><IoPersonCircleSharp className="self-center mt-px text-xl" /> Profile</Link>
                        <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-white"><LuLogOut /> Logout</button>
                    </div>
                </div>
            </div>
        </header>
    )
}