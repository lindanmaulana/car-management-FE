import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBrandGetAll } from "@/lib/query/brand/useBrandGetAll"
import { ServiceCar } from "@/lib/services/cars"
import { UtilsErrorService } from "@/lib/utils/errors"
import { CarSchema, type typeCarCreateSchema } from "@/schemas/cars"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { IoIosAdd } from "react-icons/io"
import { useLocalStorage } from "react-use"
import Swal from "sweetalert2"

export const CarAdd = () => {
    const queryClient = useQueryClient()
    const [token] = useLocalStorage("token", "")
    const [open, setOpen] = useState<boolean>(false)
    const queryBrand = useBrandGetAll({params: ""})

    const form = useForm<typeCarCreateSchema>({
        resolver: zodResolver(CarSchema.CREATE),
        defaultValues: {
            name: "",
            brand_id: "",
            model: "",
            price: ""
        }
    })

    const mutation = useMutation({
        mutationKey: ["carCreate"],
        mutationFn: (data: typeCarCreateSchema) => ServiceCar.create(token!, data)
    })

    const handleForm = form.handleSubmit((values: typeCarCreateSchema) => {
        setOpen(false)

        mutation.mutate(values, {
            onSuccess: (data) => {
                Swal.fire({
                    title: data.message,
                    icon: "success"
                })

                queryClient.invalidateQueries({queryKey: ["carGetAll"]})
                form.reset()
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

    if(queryBrand.isLoading) return <p>Loading...</p>
    if(queryBrand.isError) return <p>Error 404</p>

    const dataBrand = queryBrand.data.data

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <Button className="bg-gray-800" asChild>
                <DialogTrigger className="flex items-center">
                    <IoIosAdd className="mt-px" /> Add Car
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Car</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleForm} className="space-y-6">
                        <div className="space-y-4">
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Example..." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="brand_id"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Brand</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Brand" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {dataBrand.map(brand => (
                                                        <SelectItem key={brand._id} value={brand._id} >{brand.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="model"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Model</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Example..." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" placeholder="xxxxxx" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <Button type="reset" variant={"ghost"} onClick={() => setOpen(false)}>Cancel</Button>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}