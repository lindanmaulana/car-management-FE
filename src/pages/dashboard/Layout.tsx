import { useStoreAuth } from "@/lib/zustand/store/auth.store"
import Aos from "aos"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { useEffectOnce, useLocalStorage } from "react-use"
import Swal from "sweetalert2"
import { Sidebar } from "./components/Sidebar"

const LayoutDashboard = () => {
    const navigate = useNavigate()
    const [token] = useLocalStorage("token", "")
    const [role] = useLocalStorage("role", "")
    const setToken = useStoreAuth((state) => state.setToken)

    useEffectOnce(() => {
        Aos.init({
            duration: 800,
            easing: "ease-in-out",
            once: true
        })
    })

     useEffect(() => {
         const checkToken = async () => {
             if(!token) {
                 const result = await Swal.fire({
                     title: "You have been logged out. Please sign in to continue.",
                     icon: "info",
                     confirmButtonText: "Login Ulang",
                 })
 
                 if(result.isConfirmed) {
                     localStorage.removeItem("token")
                     localStorage.removeItem("role")
                     navigate("/auth/signin")
                 }
             } else {
                 setToken(token)
             }
         }

         checkToken()
     }, [navigate, token, role, setToken])
    
    return (
         <div className="h-screen overflow-hidden">
            <main className="w-full h-full flex gap-4">
                <Sidebar />
                <div className="w-full h-full overflow-y-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default LayoutDashboard