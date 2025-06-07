import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "react-use";
import Swal from "sweetalert2";

interface AdminRouteProps {
    children: ReactNode
}

export const AdminRoute = ({children}: AdminRouteProps) => {
    const navigate = useNavigate()
    
    const [token] = useLocalStorage("token", "")
    const [role] = useLocalStorage("role", "")

    useEffect(() => {
        const checkToken = async () => {
            if(!token) {
                await Swal.fire({
                    title: "You have been logged out. Please sign in to continue.",
                    icon: "info",
                    confirmButtonText: "Oke",
                })
     
                localStorage.removeItem("token")
                localStorage.removeItem("role")
                navigate("/auth/signin")
            }

            if(role) {
                if(role !== "admin") {
                    await Swal.fire({
                        title: "You do not have admin access. Please login with an admin account to continue.",
                        icon: "info",
                        confirmButtonText: "Oke",
                    })
        
                    localStorage.removeItem("token")
                    localStorage.removeItem("role")
                    navigate("/auth/signin")
                }
            }
        }
    
        checkToken()
    }, [navigate, token, role])

    return children
}