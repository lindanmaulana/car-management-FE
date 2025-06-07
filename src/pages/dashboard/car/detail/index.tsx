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
import { FaGasPump } from "react-icons/fa"
import { LuCalendarRange, LuGauge } from "react-icons/lu"
import { RiImageCircleAiLine } from "react-icons/ri"
import { TbAutomaticGearbox } from "react-icons/tb"
import { useParams } from "react-router"
import { useLocalStorage } from "react-use"
import Swal from "sweetalert2"
import { CarHeader } from "../components/CarHeader.tsx"
import { PageDashboardCarImage } from "./image"
import { PiSelectionBackgroundLight } from "react-icons/pi"
import { TooltipAction } from "@/components/fragments/TooltipAction.tsx"

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
        setImagePreview({id: "", url: ""})

        mutationUpdate.mutate(values, {
            onSuccess: () => {
                Swal.fire({
                    title: "Update Image Primary successfully",
                    icon: "success"
                })

                queryClient.invalidateQueries({queryKey: ["carGetOne"]})
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
    const imagePrimary = dataCar.images.find(image => image.is_primary === true)

    const preview = imagePrimary ? `${config.BASEURLIMAGE}${imagePrimary.image_url}` : "/images/car-default.jpg"

    const classStatus = clsx("absolute top-4 right-4 font-normal text-sm rounded-sm px-4 py-1 capitalize z-50", dataCar.status === "available" ? "text-white bg-green-700" : dataCar.status === "rented" ? "text-white bg-gray-700" : "text-white bg-red-700")
    return (
        <div className="space-y-10">
            <CarHeader title="Car Detail" />
            <div className="w-full h-[340px] bg-center rounded-xl">
                {!imagePreview.url ? (
                    <div className="h-full grid grid-cols-3 gap-4">
                        <figure className="relative col-span-2 w-full h-[500px] rounded">
                            <img src={preview} alt={dataCar.name} className="w-full h-full object-cover rounded-lg" />
                            <strong className={classStatus}>{dataCar.status}</strong>
                        </figure>
                        <div className="space-y-6">
                            <div>
                                <h5 className="text-3xl font-semibold text-primary"><strong className="font-normal">{dataCar.brand_id.name}</strong> | <span className="text-blue-500">{dataCar.name}</span></h5>
                                <p className="text-gray-500">{dataCar.model}</p>
                            </div>
                            <div>
                                <h6 className="text-base font-semibold text-gray-600">Price</h6>
                                <p className="text-xl text-green-500">{dataCar.price.toLocaleString("id-ID", {
                                    currency: "IDR",
                                    style: "currency",
                                    maximumFractionDigits: 0
                                    })}
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h6 className="text-base font-semibold text-gray-600">Car Detail</h6>
                                <article className="grid grid-cols-4 *:text-gray-500">
                                    <article className="flex flex-col items-center justify-center">
                                        <LuCalendarRange />
                                        <p>{dataCar.car_detail.year}</p>
                                    </article>
                                    <article className="flex flex-col items-center justify-center">
                                        <TbAutomaticGearbox />
                                        <p>{dataCar.car_detail.transmission}</p>
                                    </article>
                                    <article className="flex flex-col items-center justify-center">
                                        <FaGasPump />
                                        <p>{dataCar.car_detail.fuel_type}</p>
                                    </article>
                                    <article className="flex flex-col items-center justify-center">
                                        <LuGauge />
                                        <p>{dataCar.car_detail.mileage}</p>
                                    </article>
                                </article>
                            </div>
                            <div className="space-y-1">
                                <h6 className="text-base font-semibold text-gray-600">Description</h6>
                                <p className="text-base text-gray-600">{dataCar.car_detail.description}</p>
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div className="relative w-full h-full">
                            <div className="w-full h-full">
                                <figure className="flex items-center justify-center w-full h-full bg-gray-800 rounded-xl">
                                    <img src={`${config.BASEURLIMAGE}${imagePreview.url}`} alt="" className="w-full h-full object-cover rounded-lg" />
                                </figure>
                            </div>
                            <div className="absolute top-4 right-4 flex items-center gap-4">
                                <TooltipAction text="Close">
                                    <Button onClick={() => setImagePreview({id: "", url: ""})} className=" text-white cursor-pointer text-2xl"><PiSelectionBackgroundLight /></Button>
                                </TooltipAction>
                                <Button onClick={() => handleDeleteImage(imagePreview.id)} className="text-xs cursor-pointer bg-red-500">Delete Image</Button>
                                <Button onClick={() => handleUpdateCarImagePrimary(imagePreview.id)} className="text-white text-xs bg-green-500 cursor-pointer"><RiImageCircleAiLine /> Set thumbnail</Button>
                            </div>
                        </div>
                    )}
            </div>
            <div className="w-full grid grid-cols-5 gap-4">
                <Carousel opts={{loop: true, align: "start"}} plugins={[Autoplay({delay: 2000, stopOnInteraction: false})]} className={clsx(dataCar.images.length > 0 ? "col-span-4" : "col-span-5")}>
                    <CarouselContent >
                        {dataCar.images.length !== 0 ? dataCar.images.map(image => (
                            <CarouselItem key={image._id} className="basis-1/3 cursor-pointer h-48" onClick={() => setImagePreview({url: image.image_url, id: image._id})}>
                                <Card className="h-full p-0">
                                    <CardContent className="p-0">
                                        <img src={`${config.BASEURLIMAGE}${image.image_url}`} alt={image.createdAt} className="w-full h-48 object-cover rounded-xl" />
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
                )}
            </div>
        </div>
    )
}