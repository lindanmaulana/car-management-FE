import { Button } from "@/components/ui/button"
import { Link } from "react-router"

interface AuthFooterProps {
    titleFooter: string
    titleButton: string
    toPage: string
}
export const AuthFooter = ({titleFooter, titleButton, toPage}: AuthFooterProps) => {
    return (
        <div className="w-full flex items-center justify-center">
            <p className="text-sm text-white/50">{titleFooter}</p>
            <Button variant={"link"} className="p-0 m-0 text-blue-500" asChild>
                <Link to={toPage}>{titleButton}</Link>
            </Button>
        </div>
    )
}