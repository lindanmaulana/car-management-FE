import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ServiceBrand } from "@/lib/services/brands"
import { UtilsErrorService } from "@/lib/utils/errors"
import { BrandSchema, type typeBrandCreateSchema } from "@/schemas/brands"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { IoIosAdd } from "react-icons/io"
import { useNavigate } from "react-router"
import Swal from "sweetalert2"

interface BrandAddProps {
    token: string
}
export const BrandAdd = ({token}: BrandAddProps) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [open, setOpen] = useState<boolean>(false)
    
    const form = useForm<typeBrandCreateSchema>({
        resolver: zodResolver(BrandSchema.CREATE),
        defaultValues: {
            name: "",
            country: ""
        }
    })

    const mutation = useMutation({
        mutationKey: ["brandCreate"],
        mutationFn: (data: typeBrandCreateSchema) => ServiceBrand.create(token, data)
    })

    const handleForm = form.handleSubmit((values: typeBrandCreateSchema) => {
        setOpen(false)

        mutation.mutate(values, {
            onSuccess: (data) => {
                Swal.fire({
                    title: data.message,
                    icon: "success"
                })
                
                form.reset()
                queryClient.invalidateQueries({queryKey: ["brandGetAll"]})
                navigate("/dashboard/car/brand")
            },

            onError: (err) => {
                Swal.fire({
                    title: UtilsErrorService(err),
                    icon: "error"
                })

                form.reset()
            }
        })
    })
    
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <Button className="bg-gray-800" asChild>
                <DialogTrigger className="flex items-center">
                        <IoIosAdd className="mt-px" /> Add Brand
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Brand</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleForm} className="space-y-6">
                        <div className="space-y-4">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-800">Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text" placeholder="Example..." className="border border-gray-400 " />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                              <FormField
                                control={form.control}
                                name="country"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-800">Country</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text" placeholder="Example..." className="border border-gray-400 " />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <Button type="reset" variant={"ghost"}>Reset</Button>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}