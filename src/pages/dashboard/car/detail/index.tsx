import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import config from "@/config"
import { useCarGetOne } from "@/lib/query/car/useCarGetOne"
import { ServiceCarImage } from "@/lib/services/car-images"
import { UtilsErrorService } from "@/lib/utils/errors"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import clsx from "clsx"
import Autoplay from "embla-carousel-autoplay"
import { useState } from "react"
import { RiImageCircleAiLine } from "react-icons/ri"
import { useParams } from "react-router"
import { useLocalStorage } from "react-use"
import Swal from "sweetalert2"
import { PageDashboardCarImage } from "./image"

export const PageDashboardCarDetail = () => {
    const queryClient = useQueryClient()

    const params = useParams<{id: string}>()
    const [token] = useLocalStorage("token", "")
    const [imagePreview, setImagePreview] = useState<{url: string, id: string}>({url: "", id: ""})

    const query = useCarGetOne(token!, params.id!)

    const mutationUpdate = useMutation({
        mutationKey: ["carImageUpdate"],
        mutationFn: (id: string) => ServiceCarImage.updateStatus({token, id}, {car_id: params.id})
    })

    const mutationDelete = useMutation({
        mutationKey: ["carImageDelete"],
        mutationFn: (data: string) => ServiceCarImage.deleteById({token, id: data})
    })

    const handleUpdateCarImagePrimary = (values: string) => {
        mutationUpdate.mutate(values, {
            onSuccess: () => {
                Swal.fire({
                    title: "Update Image Primary successfully",
                    icon: "success"
                })

                queryClient.invalidateQueries({queryKey: ["carGetAll"]})
            },

            onError: (err: unknown) => {
                Swal.fire({
                    title: UtilsErrorService(err),
                    icon: "error"
                })
            }
        })
    }

    const handleDeleteImage = (values: string) => {
        Swal.fire({
            title: "Are you sure ?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if(result.isConfirmed) {
                mutationDelete.mutate(values, {
                    onSuccess: (data) => {
                        Swal.fire({
                            title: data.message,
                            icon: "success"
                        })

                        setImagePreview({url: "", id: ""})
                        queryClient.invalidateQueries({queryKey: ["carGetOne"]})
                    },

                    onError: (err) => {
                        Swal.fire({
                            title: UtilsErrorService(err),
                            icon: "error"
                        })
                    }
                })
            }
        })
    }

    if(query.isLoading) return <p>Loading...</p>
    if(query.isError) return <p>Error 404...</p>

    const dataCar = query.data.data
    const classStatus = clsx("absolute top-4 right-5 font-normal rounded-full px-4 py-1 capitalize z-50", dataCar.status === "available" ? "text-white bg-green-700" : dataCar.status === "rented" ? "text-white bg-gray-700" : "text-white bg-red-700")
    return (
        <div className="space-y-6">
            <div className="relative h-[440px] bg-center bg-cover bg-no-repeat rounded-xl" style={{backgroundImage: "url(/images/garage-default.jpg)"}}>
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/70 rounded-xl"></div>

                <strong className={classStatus}>{dataCar.status}</strong>

                {imagePreview.url && (
                    <>
                        <figure className="absolute inset-0 flex items-center justify-center w-full h-full bg-gray-800 rounded-xl">
                            <img src={`${config.BASEURLIMAGE}${imagePreview.url}`} alt="" className="w-[400px]" />
                        </figure>
                        <div className="absolute bottom-5 px-5 w-full flex items-center justify-between gap-6">
                            <div className="-space-y-1">
                                <p className="text-white/70 text-sm">{dataCar.brand_id.name}</p>
                                <h3 className="text-white font-semibold text-2xl">{dataCar.name}</h3>
                            </div>

                            <p className="text-2xl text-green-500">{dataCar.price.toLocaleString("id-ID", {
                                currency: "IDR",
                                style: "currency",
                                maximumFractionDigits: 0
                                })}
                            </p>

                            <div className="flex items-center gap-2">
                                <Button onClick={() => handleDeleteImage(imagePreview.id)} className="bg-red-500">Delete Image</Button>
                                <Button onClick={() => handleUpdateCarImagePrimary(imagePreview.id)} className="text-white text-xs bg-green-500 cursor-pointer"><RiImageCircleAiLine /> Set thumbnail</Button>
                            </div>
                        </div>
                    </>
                )}

            </div>
            <div className="w-full grid grid-cols-5 gap-4">
                <Carousel opts={{loop: true, align: "start"}} plugins={[Autoplay({delay: 2000, stopOnInteraction: false})]} className={clsx(dataCar.images.length > 0 ? "col-span-4" : "col-span-5")}>
                    <CarouselContent >
                        {dataCar.images.length !== 0 ? dataCar.images.map(image => (
                            <CarouselItem key={image._id} className="basis-1/3 cursor-pointer " onClick={() => setImagePreview({url: image.image_url, id: image._id})}>
                                <Card className="h-52">
                                    <CardContent>
                                        <img src={`${config.BASEURLIMAGE}${image.image_url}`} alt={image.createdAt} className="w-full h-full object-cover" />
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        )) : (
                            <CarouselItem className="basis-4/4 cursor-pointer ">
                                <PageDashboardCarImage />
                            </CarouselItem>
                        )}
                    </CarouselContent>
                </Carousel>
                {dataCar.images.length > 0 && (
                    <PageDashboardCarImage />
                    // <Card className="col-span-1 w-full h-52 bg-green-500 flex items-center justify-center">
                    // </Card>
                )}
            </div>
        </div>
    )
}