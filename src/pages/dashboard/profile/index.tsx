import { FaUserGear } from "react-icons/fa6";
import { ProfileName } from "./components/ProfileName";
import { ProfilePassword } from "./components/ProfilePassword";

const PageDashboardProfile = () => {
    return (
        <section className="py-4">
            <div className="container max-w-6xl mx-auto space-y-4">
                <h2 className="flex items-center gap-1 text-lg text-gray-800 font-semibold"><FaUserGear className="text-xl" />My Profile</h2>
                <div className="grid grid-cols-2 gap-6">
                    <ProfileName />
                    <ProfilePassword />
                </div>
            </div>
        </section>
    )
}

export default PageDashboardProfile