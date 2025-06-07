import Aos from "aos"
import { Outlet } from "react-router"
import { useEffectOnce } from "react-use"
import { Sidebar } from "./components/Sidebar"

const LayoutDashboard = () => {
    useEffectOnce(() => {
        Aos.init({
            duration: 800,
            easing: "ease-in-out",
            once: true
        })
    })
    
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