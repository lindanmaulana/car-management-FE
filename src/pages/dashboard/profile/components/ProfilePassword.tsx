import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ServiceUserUpdate } from "@/lib/services/users";
import { UtilsErrorService } from "@/lib/utils/errors";
import { UserSchema, type typeUserUpdate } from "@/schemas/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { BiSolidLockAlt } from "react-icons/bi";
import { IoKey } from "react-icons/io5";
import { TbChecks } from "react-icons/tb";
import { useLocalStorage } from "react-use";
import Swal from "sweetalert2"


export const ProfilePassword = () => {
    const [token] = useLocalStorage("token", "")

    const form = useForm<typeUserUpdate>({
        resolver: zodResolver(UserSchema.UPDATE),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    const mutation =  useMutation({
        mutationKey: ["userUpdatePassword"],
        mutationFn: (data: typeUserUpdate) => ServiceUserUpdate(token!, data)
    })

    const handleForm = form.handleSubmit((values: typeUserUpdate) => {
        mutation.mutate(values, {
            onSuccess: (data) => {
                Swal.fire({
                    title: data.message,
                    icon: "success",
                    draggable: true
                })

                form.reset()
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
        <Card data-aos="fade-down" data-aos-duration="1000" className="p-5 bg-gray-800">
            <h3 className="flex items-center gap-2 text-white"><span className="bg-white rounded-full p-2"><IoKey className="text-gray-800" /></span> Change Password</h3>
            <Form {...form}>
                <form onSubmit={handleForm} className="space-y-6">
                    <div className="space-y-5">
                        <FormField 
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-white">New Password</FormLabel>
                                    <div className="relative">
                                        <BiSolidLockAlt className="text-sm absolute left-2 top-1/2 -translate-y-1/2 text-white/50" />
                                        <FormControl>
                                            <Input {...field} type="password" placeholder="Enter your new password" className="pl-8 border border-white/20 bg-gray-700 text-white" />
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
                                    <FormLabel className="text-white">Confirm New Password</FormLabel>
                                    <div className="relative">
                                        <TbChecks className="text-sm absolute left-2 top-1/2 -translate-y-1/2 text-white/50" />
                                        <FormControl>
                                            <Input {...field} type="password" placeholder="Confirm your new password" className="pl-8 border border-white/20 bg-gray-700 text-white" />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" disabled={mutation.isPending} className="w-full bg-green-500 text-gray-800 hover:text-white group"><IoKey className="text-gray-800 group-hover:text-white" /> Update Password</Button>
                </form>
            </Form>
        </Card>
    )
}