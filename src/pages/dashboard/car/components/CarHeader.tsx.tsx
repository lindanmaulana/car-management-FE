import { Button } from "@/components/ui/button"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router"

interface CarHeaderProps {
    title: string
}

export const CarHeader = ({title}: CarHeaderProps) => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate(-1)
    }
    
    return (
        <div className="flex items-center justify-between">
            <Button onClick={handleBack} size={"sm"}><IoIosArrowBack /> Back</Button>
            <h4 className="text-2xl font-semibold">{title}</h4>
        </div>
    )
}