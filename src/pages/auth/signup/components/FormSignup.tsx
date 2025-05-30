import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ServiceUserSignup } from "@/lib/services/users"
import { UtilsErrorService } from "@/lib/utils/errors"
import { UserSchema, type typeUserSignup } from "@/schemas/users"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { BiSolidLockAlt } from "react-icons/bi"
import { IoPerson } from "react-icons/io5"
import { MdEmail } from "react-icons/md"
import { useNavigate } from "react-router"
import Swal from "sweetalert2"

export const FormSignup = () => {
    const router = useNavigate()

    const form = useForm<typeUserSignup>({
        resolver: zodResolver(UserSchema.SIGNUP),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const mutation = useMutation({
        mutationKey: ["userSignup"],
        mutationFn: (data: typeUserSignup) => ServiceUserSignup(data)
    })

    const handleForm = form.handleSubmit((values: typeUserSignup) => {
        mutation.mutate(values, {
            onSuccess: (data) => {
                Swal.fire({
                    title: data.message,
                    icon: "success",
                    draggable: true
                })
                router("/auth/signin")
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
            <form onSubmit={handleForm} className="space-y-6 ">
                <div className="space-y-4">
                    <FormField 
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-white">Name</FormLabel>
                                <div className="relative">
                                    <IoPerson className="text-sm absolute left-2 top-1/2 -translate-y-1/2 text-white/50" />
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="Example..." className="pl-8 border border-white/20 text-white" />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                    <FormField 
                        control={form.control}
                        name="confirmPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-white">Confirm Password</FormLabel>
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
                <Button type="submit" className="w-full">Signup</Button>
            </form>
        </Form>
    )
}