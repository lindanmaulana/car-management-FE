import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ServiceBrand } from "@/lib/services/brands";
import { UtilsErrorService } from "@/lib/utils/errors";
import type { typeBrandDeleteSchema } from "@/schemas/brands";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CgTrash } from "react-icons/cg";
import { TiWarningOutline } from "react-icons/ti";
import Swal from "sweetalert2";

interface BrandDeleteProps {
    token: string
    id: string
}
export const BrandDelete = ({token, id}: BrandDeleteProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationKey: ["brandDelete"],
        mutationFn: (data: typeBrandDeleteSchema) => ServiceBrand.delete(token, data)
    })

    const handleDelete = () => {
        setOpen(false)

        mutation.mutate({id}, {
            onSuccess: (data) => {
                Swal.fire({
                    title: data.message,
                    icon: "success"
                })

                queryClient.invalidateQueries({queryKey: ['brandGetAll']})
            },

            onError: (err) => {
                Swal.fire({
                    title: UtilsErrorService(err),
                    icon: "error"
                })
            }
        })
    }
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger className="text-xl text-red-500">
                <CgTrash />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle >
                        Delete Brand
                    </DialogTitle>
                </DialogHeader>
                    <div className="w-full flex flex-col items-center gap-3">
                        <h3 className="flex flex-col items-center gap-3 text-center font-normal max-w-[350px] leading-6">
                            <span className="bg-red-200 rounded-full p-4">
                                <TiWarningOutline className="text-3xl text-red-500" />
                            </span>
                                Are you sure you want to delete this brand?
                                All car in this brand will lose their Brand Categorization.
                        </h3>
                        <div className="flex items-center justify-center gap-3">
                            <Button variant={"ghost"} onClick={() => setOpen(false)}>Cancel</Button>
                            <Button variant={"destructive"} onClick={handleDelete}>Delete</Button>
                        </div>
                    </div>
            </DialogContent>
        </Dialog>
    )
}