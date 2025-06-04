import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FUEL_TYPE, TRANSMISSION } from "@/lib/const/data"
import { useBrandGetAll } from "@/lib/query/brand/useBrandGetAll"
import { ServiceCar } from "@/lib/services/cars"
import { UtilsErrorService } from "@/lib/utils/errors"
import { CarSchema, type typeCarCreateSchema } from "@/schemas/cars"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useLocalStorage } from "react-use"
import Swal from "sweetalert2"
import { CarHeader } from "./CarHeader.tsx"

export const CarAdd = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [token] = useLocalStorage("token", "")
    const queryBrand = useBrandGetAll({params: ""})

    const form = useForm<typeCarCreateSchema>({
        resolver: zodResolver(CarSchema.CREATE),
        defaultValues: {
            name: "",
            brand_id: "",
            model: "",
            price: "",
            year: "",
            transmission: "",
            plate_number: "",
            fuel_type: "",
            mileage: "",
            color: "",
            description: ""
        }
    })

    const mutation = useMutation({
        mutationKey: ["carCreate"],
        mutationFn: (data: typeCarCreateSchema) => ServiceCar.create(token!, data)
    })

    const handleForm = form.handleSubmit((values: typeCarCreateSchema) => {
        mutation.mutate(values, {
            onSuccess: (data) => {
                Swal.fire({
                    title: data.message,
                    icon: "success"
                })

                queryClient.invalidateQueries({queryKey: ["carGetAll"]})
                form.reset()
                navigate(-1)
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
        <div className="space-y-6">
            <CarHeader title="Create New Car" />
            <Form {...form}>
                <form onSubmit={handleForm} className="space-y-6" >
                    <div className="space-y-4">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="e.g. Toyota Avanza 1.5 G" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <FormField 
                                    control={form.control}
                                    name="model"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Model</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text" placeholder="e.g. Avanza 1.5 G" />
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
                                                        <SelectValue placeholder="e.g. Toyota" />
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
                            </div>
                            <FormField 
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" placeholder="e.g. 250000000" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <FormField 
                                control={form.control}
                                name="year"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Year</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" placeholder="e.g. 1999" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="transmission"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Transmission</FormLabel>
                                        <FormControl>
                                             <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="e.g. manual" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {TRANSMISSION.map(transmisi => (
                                                        <SelectItem key={transmisi} value={transmisi} >{transmisi}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <FormField 
                                control={form.control}
                                name="plate_number"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Plate number</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="e.g. E 2897182 ZX" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="fuel_type"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Fuel Type</FormLabel>
                                        <FormControl>
                                             <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="e.g. bensin" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {FUEL_TYPE.map(fuel => (
                                                        <SelectItem key={fuel} value={fuel} >{fuel}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField 
                            control={form.control}
                            name="mileage"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Mileage</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" placeholder="e.g. 3200" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="color"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="e.g. white" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="e.g. desc..." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="bg-green-500 hover:bg-green-800 cursor-pointer">Submit</Button>
                </form>
            </Form>
        </div>
    )
}