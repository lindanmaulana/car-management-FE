import { FaWarehouse } from "react-icons/fa"

interface AuthHeaderProps {
    descriptionHeader: string
}
export const AuthHeader = ({descriptionHeader}: AuthHeaderProps) => {
    return (
        <div className="flex flex-col items-center">
            <strong className="bg-gray-900 p-2 rounded"><FaWarehouse className="text-2xl text-white" /></strong>
            <div className="text-center">
                <h2 className="font-bold text-2xl text-white">Car Management</h2>
                <p className="text-white/50 text-sm">{descriptionHeader}</p>
            </div>
        </div>
    )
}