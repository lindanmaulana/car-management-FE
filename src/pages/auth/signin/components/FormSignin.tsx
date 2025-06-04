import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ServiceUserSignin } from "@/lib/services/users"
import { UtilsErrorService } from "@/lib/utils/errors"
import { UserSchema, type typeUserSignin } from "@/schemas/users"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { BiSolidLockAlt } from "react-icons/bi"
import { MdEmail } from "react-icons/md"
import Swal from "sweetalert2"
import {useLocalStorage} from "react-use"
import { useNavigate } from "react-router"

export const FormSignin = () => {
    const [, setToken] = useLocalStorage("token", "")
    const [, setRole] = useLocalStorage("role", "")
    const navigate = useNavigate()

    const form = useForm<typeUserSignin>({
        resolver: zodResolver(UserSchema.SIGNIN),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const mutation = useMutation({
        mutationKey: ['userSignin'],
        mutationFn: (data: typeUserSignin) => ServiceUserSignin(data)
    })

    const handleForm = form.handleSubmit((values: typeUserSignin) => {
        mutation.mutate(values, {
            onSuccess: (data) => {
                Swal.fire({
                    title: data.message,
                    icon: "success",
                    draggable: true
                })

                setToken(data.data.token)
                setRole(data.data.role)
                navigate("/dashboard")
            },

            onError: (err) => {
                Swal.fire({
                    title: UtilsErrorService(err),
                    icon: "error",
                    draggable: true
                })
            }
        })
    })
    return (
        <Form {...form}>
            <form onSubmit={handleForm} className="space-y-6">
                <div className="space-y-4">
                    <FormField 
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-white">Email</FormLabel>
                               <div className="relative">
                                    <MdEmail className="text-sm absolute left-2 top-1/2 -translate-y-1/2 text-white/50" />
                                    <FormControl>
                                        <Input {...field} type="email" placeholder="Example@gmail.com" className="pl-8 border border-white/20 text-white" />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-white">Password</FormLabel>
                                    <div className="relative">
                                        <BiSolidLockAlt className="text-sm absolute left-2 top-1/2 -translate-y-1/2 text-white/50" />
                                        <FormControl>
                                            <Input {...field} type="password" placeholder="******" className="pl-8 border border-white/20 text-white" />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                </div>
                <Button type="submit" className="w-full">Signin</Button>
            </form>
        </Form>
    )
}