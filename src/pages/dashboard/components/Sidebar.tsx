import clsx from "clsx";
import type { IconType } from "react-icons/lib";
import { LuSettings } from "react-icons/lu";
import { PiCarProfileLight } from "react-icons/pi";
import { RiDashboardLine } from "react-icons/ri";
import { Link } from "react-router";
import { useLocation } from "react-use";
import { SidebarProfile } from "./SidebarProfile";

export const Sidebar = () => {
  const route = useLocation();

  return (
    <aside className="w-[280px] py-6 px-4 shadow-card h-full flex flex-col gap-10">
      <Link to={"/dashboard"}>
        <h1 className="flex items-center gap-2 text-xl font-bold">
          Admin Dashboard
        </h1>
      </Link>
      <ul className="space-y-2">
        {SidebarMenu?.map((sidebar) => {
          const isActive =
            sidebar.url === "/dashboard"
              ? route.pathname === "/dashboard"
              : route.pathname?.startsWith(sidebar.url);
          return (
            <li
              key={sidebar.id}
              className={clsx(
                " px-4 py-2 rounded",
                isActive ? "bg-gray-300 border-l-2 border-gray-900" : ""
              )}
            >
              <Link
                to={sidebar.url}
                className={clsx(
                  " flex items-center gap-2 text-base font-medium",
                  isActive ? "text-gray-800" : "text-gray-500"
                )}
              >
                <sidebar.icon className="text-xl mt-px" /> {sidebar.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="h-full flex items-end">
        <SidebarProfile />
      </div>
    </aside>
  );
};

interface SidebarMenu {
  id: number;
  title: string;
  url: string;
  icon: IconType;
  exact: boolean;
}

const SidebarMenu: SidebarMenu[] = [
  {
    id: 1,
    title: "Dashboard",
    url: "/dashboard",
    icon: RiDashboardLine,
    exact: false,
  },
  {
    id: 2,
    title: "Car",
    url: "/dashboard/car",
    icon: PiCarProfileLight,
    exact: true,
  },
  {
    id: 3,
    title: "Setting",
    url: "/dashboard/setting",
    icon: LuSettings,
    exact: true,
  },
];
