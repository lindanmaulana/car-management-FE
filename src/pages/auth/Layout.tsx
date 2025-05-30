import Aos from "aos"
import { Outlet } from "react-router"
import { useEffectOnce } from "react-use"
const LayoutAuth = () => {
    useEffectOnce(() => {
        Aos.init({
            duration: 800,
            easing: "ease-in-out",
            once: true
        })
    })
    return (
        <section className="w-full h-screen bg-white">
            <div className="container max-w-6xl h-full mx-auto">
                <div className="h-full flex items-center justify-center">
                    <Outlet />
                </div>
            </div>
        </section>
    )
}

export default LayoutAuth