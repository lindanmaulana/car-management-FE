import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { ReactNode } from "react"

interface TooltipActionProps {
    children: ReactNode
    text: string
}
export const TooltipAction = ({children, text}: TooltipActionProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                <p>{text}</p>
            </TooltipContent>
        </Tooltip>
    )
}