import { Main } from "@/pages/dashboard/components/Main"
import { DashboardCard } from "./components/DashboardCard"

const PageDashboard = () => {
    return (
        <Main title="Dashboard" message="Wellcome back, Admin">
            <div>
                <div className="grid grid-cols-2 gap-6">
                    <DashboardCard />
                </div>
            </div>
        </Main>
    )
}

export default PageDashboard