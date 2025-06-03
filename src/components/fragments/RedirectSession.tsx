import { useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2"

interface RedirectSessionProps {
    title?: string
    message?: string
    successMessage?: string
}
export const RedirectSession = ({title, message, successMessage}: RedirectSessionProps) => {
    const navigate = useNavigate()
    useEffect(() => {
        Swal.fire({
          title: title || "Session expired",
          text: message || `Your session has expired. You need to log in again to continue.`,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Logout",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Logged Out",
              text: successMessage || "You have been logged out. Please sign in again to continue.",
              icon: "success",
            });
    
            localStorage.removeItem("token");
            navigate("/auth/signin");
          }
        });
    }, [navigate, title, message, successMessage])
        return null
}