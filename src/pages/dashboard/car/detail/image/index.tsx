import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ServiceCarImage } from "@/lib/services/car-images"
import { UtilsErrorService } from "@/lib/utils/errors"
import { CarImageSchema, type TypeCarImageUpload, type TypeCarImageUploadSchema } from "@/schemas/car-images"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { BiImageAdd } from "react-icons/bi"
import { useParams } from "react-router"
import { useLocalStorage } from "react-use"
import Swal from "sweetalert2"

export const PageDashboardCarImage = () => {
    const params = useParams<{id: string}>()
    const queryClient = useQueryClient()

    const [token] = useLocalStorage("token", "")
    const [preview, setPreview] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    const form = useForm<TypeCarImageUploadSchema>({
        resolver: zodResolver(CarImageSchema.UPLOAD)
    })

    const mutation = useMutation({
        mutationKey: ["carImageUpload"],
        mutationFn: (data: TypeCarImageUpload) => ServiceCarImage.upload(token!, params.id!, data.image)
    })

    const handleForm = form.handleSubmit((values: TypeCarImageUpload) => {
        setOpen(false)

        mutation.mutate(values, {
            onSuccess: (data) => {
                Swal.fire({
                    title: data.message,
                    icon: "success"
                })

                form.reset()
                setPreview("")
                queryClient.invalidateQueries({queryKey: ["carGetOne"]})
            },

            onError: (err) => {
                Swal.fire({
                    title: UtilsErrorService(err),
                    icon: "error"
                })
            }
        })
    })

    const handlePreview = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: File | null) => void) => {
        const file = e.target.files?.[0]

        if(file) {
            const url = URL.createObjectURL(file)
            setPreview(url)
            onChange(file)
        } else {
            onChange(null)
        }
    }

    const handleCancel = () => {
        setPreview("")
    }

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger className="col-span-1 w-full h-48 bg-green-500 flex items-center justify-center rounded-xl" asChild>
                <div>
                    <BiImageAdd className="text-4xl text-white" />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Image</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleForm} className="space-y-6">
                        <div>
                            <FormField
                              control={form.control}
                              name="image"
                              render={({field}) => (
                                <FormItem>
                                    <FormLabel className="border-2 border-gray-300 border-dashed rounded-lg flex flex-col items-center justify-center min-h-40 max-h-84 bg-gray-100 cursor-pointer">
                                        {preview ? (
                                             <img src={preview} alt="Image Preview" className="w-full h-full object-cover" />
                                        ): (
                                            <>
                                                <img src="/images/upload-file.png" alt="Upload File" className="w-20 h-20" />
                                                <div className="text-center">
                                                    <h4 className="font-normal text-sm">Drop your image here, or <span className="text-blue-500">Browse</span></h4>
                                                    <p className="text-xs font-normal text-black/40">Support AVIF, JPEG, JPG, PNG</p>
                                                </div>
                                            </>
                                        )}
                                    </FormLabel>
                                    <FormControl className="hidden">
                                        <Input type="file" onChange={(e) => handlePreview(e, field.onChange)} accept="image/*"  />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                              )}
                              />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            {preview && (<Button type="button" variant={"ghost"} onClick={handleCancel}>Reset</Button>)}
                            <Button type="submit">Upload</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}