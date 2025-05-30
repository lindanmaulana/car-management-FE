import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBrandGetAll } from "@/lib/query/brand/useBrandGetAll"
import { ServiceCar } from "@/lib/services/cars"
import { UtilsErrorService } from "@/lib/utils/errors"
import { CarSchema, type typeCarUpdateSchema } from "@/schemas/cars"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FiEdit } from "react-icons/fi"
import { useLocalStorage } from "react-use"
import Swal from "sweetalert2"

interface CarUpdateProps {
    id: string
}
export const CarUpdate = ({id}: CarUpdateProps) => {
    const queryClient = useQueryClient()
    const [token] = useLocalStorage("token", "")
    const queryBrand = useBrandGetAll({params: ""})
    const [open, setOpen] = useState<boolean>(false)

    const form = useForm<typeCarUpdateSchema>({
        resolver: zodResolver(CarSchema.UPDATE)
    })

    const mutation = useMutation({
        mutationKey: ["carUpdate"],
        mutationFn: (data: typeCarUpdateSchema) => ServiceCar.update(token!, id, data)
    })

    const handleForm = form.handleSubmit((values: typeCarUpdateSchema) => {
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
            }
        })
    })

    if(queryBrand.isLoading) return <p>Loading...</p>
    if(queryBrand.isError) return <p>Error 404</p>

    const dataBrand = queryBrand.data.data

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
                <DialogTrigger className="text-xl cursor-pointer text-blue-500">
                    <FiEdit className="mt-px" />
                </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Car</DialogTitle>
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
                                name="status"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="available">Available</SelectItem>
                                                    <SelectItem value="rented">Rented</SelectItem>
                                                    <SelectItem value="sold">Sold</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
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