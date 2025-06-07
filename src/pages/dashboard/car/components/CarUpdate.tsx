import { CarSchema, type typeCarUpdateSchema } from "@/schemas/cars"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router"
import { CarHeader } from "./CarHeader.tsx.tsx"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import { FUEL_TYPE, TRANSMISSION } from "@/lib/const/data.ts"
import { Textarea } from "@/components/ui/textarea.tsx"
import { Button } from "@/components/ui/button.tsx"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "react-use"
import { useBrandGetAll } from "@/lib/query/brand/useBrandGetAll.ts"
import Swal from "sweetalert2"
import { UtilsErrorService } from "@/lib/utils/errors.ts"
import { ServiceCar } from "@/lib/services/cars.ts"
import { useCarGetOne } from "@/lib/query/car/useCarGetOne.ts"
import { CARSTATUS } from "@/lib/types/cars.ts"

export const CarUpdate = () => {
    const params = useParams<{id: string}>()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [token] = useLocalStorage("token", "")

    const queryBrand = useBrandGetAll({params: ""})
    const queryCarOne = useCarGetOne(token!, params.id!)

    const form = useForm<typeCarUpdateSchema>({
        resolver: zodResolver(CarSchema.UPDATE),
    })

    const mutation = useMutation({
        mutationKey: ["carUpdate"],
        mutationFn: (data: typeCarUpdateSchema) => ServiceCar.update(token!, params.id!, data)
    })
    
    const handleForm = form.handleSubmit((values: typeCarUpdateSchema) => {
    
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
            }
        })
    })

    if(queryBrand.isLoading || queryCarOne.isLoading) return <p>Loading...</p>
    if(queryBrand.isError || queryCarOne.isError) return <p>Error 404</p>

    const dataBrand = queryBrand.data.data
    const dataCar = queryCarOne.data.data

    return (
        <div className="space-y-4">
            <CarHeader title="Update Car" />
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
                                        <Input {...field} type="text" defaultValue={dataCar.name} placeholder="e.g. Toyota Avanza 1.5 G" />
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
                                                <Input {...field} type="text" defaultValue={dataCar.model} placeholder="e.g. Avanza 1.5 G" />
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
                                                <Select value={field.value} onValueChange={field.onChange} defaultValue={dataCar.brand_id._id}>
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
                                            <Input {...field} type="number" defaultValue={dataCar.price} placeholder="e.g. 250000000" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                            <FormField 
                                control={form.control}
                                name="year"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Year</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" defaultValue={dataCar.car_detail.year} placeholder="e.g. 1999" />
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
                                             <Select value={field.value} onValueChange={field.onChange} defaultValue={dataCar.car_detail.transmission}>
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
                            <FormField 
                                control={form.control}
                                name="fuel_type"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Fuel Type</FormLabel>
                                        <FormControl>
                                             <Select value={field.value} onValueChange={field.onChange} defaultValue={dataCar.car_detail.fuel_type}>
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
                        <div className="grid grid-cols-3 gap-3">
                            <FormField 
                                control={form.control}
                                name="plate_number"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Plate number</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" defaultValue={dataCar.car_detail.plate_number} placeholder="e.g. E 2897182 ZX" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="mileage"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Mileage</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" defaultValue={dataCar.car_detail.mileage} placeholder="e.g. 3200" />
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
                                                <Select value={field.value} onValueChange={field.onChange} defaultValue={dataCar.status}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="e.g. sold" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {CARSTATUS.map(status => (
                                                            <SelectItem key={status} value={status}>{status}</SelectItem>
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
                            name="color"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" defaultValue={dataCar.car_detail.color} placeholder="e.g. white" />
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
                                        <Textarea {...field} defaultValue={dataCar.car_detail.description} placeholder="e.g. desc..." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="bg-green-500 hover:bg-green-800 cursor-pointer">Update</Button>
                </form>
            </Form>
        </div>
    )
}