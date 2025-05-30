import type { ReactNode } from "react"

interface MainProps {
    children: ReactNode
    title: string
    message: string
}

export const Main = ({children, title, message}: MainProps) => {
    return (
        <div className="w-full flex-1 px-4 space-y-2">
             <div className="bg-gray-800 rounded-b-xl px-4 py-12">
                <h2 className="text-xl text-white font-semibold">{title}</h2>
                <p className="text-base text-white/50 e font-semibold">{message}</p>
            </div>
            <div className="my-8 shadow-[0_0_2px_1px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden">
                {children}
            </div>
        </div>
    )
}