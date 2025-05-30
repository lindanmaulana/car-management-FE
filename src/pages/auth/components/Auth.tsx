import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { AuthHeader } from "./AuthHeader"
import type { ReactNode } from "react"
import { AuthFooter } from "./AuthFooter"

interface AuthProps {
    children: ReactNode
    descriptionHeader: string
    titleFooter: string
    titleButton: string
    toPage: string
}
export const Auth = ({children, descriptionHeader, titleButton, titleFooter, toPage}: AuthProps) => {
    return (
        <Card data-aos="fade-down" data-aos-duration="1200" className="min-w-1/3 bg-gray-700">
            <CardHeader>
                <AuthHeader descriptionHeader={descriptionHeader} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <AuthFooter titleButton={titleButton} titleFooter={titleFooter} toPage={toPage}/>
            </CardFooter>
        </Card>
    )
}