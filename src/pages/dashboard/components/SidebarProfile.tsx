import { useUserGetOne } from "@/lib/query/user/useUserGetone";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useLocalStorage } from "react-use";
import Swal from "sweetalert2";
import { LoadingSidebarProfile } from "./loading/LoadingSidebarProfile";

export const SidebarProfile = () => {
  const navigate = useNavigate();
  const [token] = useLocalStorage("token", "");
  const query = useUserGetOne(token ?? "");

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure ?",
      text: "Are you sure you want to log out? You’ll need to log in again to access your account.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logout",
          text: "Successfully signed out. Please log in again to continue.",
          icon: "success",
        });

        localStorage.removeItem("token");
        navigate("/auth/signin");
      }
    });
  };
  
  if (query.isLoading) return <LoadingSidebarProfile />;
  if (query.isError) return <p>Error...</p>;

  const profile = query.data.data;
  return (
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl">
              {Array.from(profile.name).splice(0, 2)}
            </span>
          </div>
          <div className="-space-y-2">
            <h3>Admin</h3>
            <strong>{profile.name}</strong>
          </div>
        </div>
        <button onClick={handleLogout} className="mt-2 cursor-pointer">
          <LuLogOut className="text-red-500 text-xl" />
        </button>
      </div>
  );
};
