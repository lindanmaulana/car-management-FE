import { TooltipAction } from "@/components/fragments/TooltipAction";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import config from "@/config";
import { useCarGetAll } from "@/lib/query/car/useCarGetAll";
import { ServiceCar } from "@/lib/services/cars";
import { UtilsErrorService } from "@/lib/utils/errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { LiaReadme } from "react-icons/lia";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { useLocalStorage } from "react-use";
import Swal from "sweetalert2";

export const CarItem = () => {
        const queryClient = useQueryClient()
        const navigate = useNavigate()
        const location = useLocation()
        const [searchParams] = useSearchParams()
    
        const [token] = useLocalStorage("token", "")
        const query = useCarGetAll({params: searchParams.toString()})
    
        const mutationDelete = useMutation({
            mutationKey: ["carDelete"],
            mutationFn: (id: string) => ServiceCar.delete(token!, id)
        })
    
        const handleDelete = (id: string) => {
            mutationDelete.mutate(id, {
                onSuccess: (data) => {
                    Swal.fire({
                        title: data.message,
                        icon: "success"
                    })
    
                    queryClient.invalidateQueries({queryKey: ["carGetAll"]})
                },
    
                onError: (err) => {
                    Swal.fire({
                        title: UtilsErrorService(err),
                        icon: "error"
                    })
                }
            })
        }
    
        const handleConfirmationDelete = (id: string) => {
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
                    handleDelete(id)
                }
            })
        }

        const handleToDetail = (id: string) => {
            navigate(`${location.pathname}/detail/${id}`)
        }
    
        if(query.isLoading) return <p>Loading...</p>
        if(query.isError) return <p>Error...</p>
    
        const dataCar = query.data.data
    
    return (
        <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-500">NO</TableHead>
                        <TableHead className="text-gray-500">Car Image</TableHead>
                        <TableHead className="text-gray-500">NAME</TableHead>
                        <TableHead className="text-gray-500">MODEL</TableHead>
                        <TableHead className="text-gray-500">BRAND</TableHead>
                        <TableHead className="text-gray-500">STATUS</TableHead>
                        <TableHead className="text-gray-500">PRICE</TableHead>
                        <TableHead className="text-gray-500">ACTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataCar.map((car, index: number) => {
                        const statusCar = clsx("text-sm font-semibold rounded-full text-center max-w-[70%] capitalize px-2 py-px", car.status === "available" ? "text-green-500 bg-green-200" : car.status === "rented" ? "text-gray-500 bg-gray-200" : "text-red-700 bg-red-200")
                        const thumbnail = car.images.find(image => image.is_primary == true)
                            
                        console.log({thumbnail})
                        return (
                        <TableRow key={car._id} className="text-lg">
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <figure className="size-20">
                                    <img src={thumbnail ? `${config.BASEURLIMAGE}${thumbnail.image_url}` : "/images/car-default.jpg"} alt={car.name} className="w-full h-full object-cover rounded" />
                                </figure>
                            </TableCell>
                            <TableCell>{car.name}</TableCell>
                            <TableCell>{car.model}</TableCell>
                            <TableCell>{car.brand_id.name}</TableCell>
                            <TableCell>
                                <p className={statusCar}>{car.status}</p>
                            </TableCell>
                            <TableCell>{car.price.toLocaleString("id-ID", {
                                currency: "IDR",
                                style: "currency",
                                maximumFractionDigits: 0
                            })}</TableCell>
                            <TableCell>
                                 <div className="flex items-center gap-4">
                                    <TooltipAction text="Detail">
                                        <button onClick={() => handleToDetail(car._id)} className="text-2xl cursor-pointer text-green-500">
                                            <LiaReadme />
                                        </button>
                                    </TooltipAction>
                                    <TooltipAction text="Update">
                                        <Link to={`${location.pathname}/update/${car._id}`} className="text-xl cursor-pointer text-blue-500">
                                             <FiEdit className="mt-px" />
                                        </Link>
                                    </TooltipAction>
                                    <TooltipAction text="Delete">
                                        <button onClick={() => handleConfirmationDelete(car._id)} className="text-xl cursor-pointer text-red-500">
                                            <GoTrash />
                                        </button>
                                    </TooltipAction>
                                 </div>
                            </TableCell>
                        </TableRow>
                    )})}
                </TableBody>
            </Table>
    )
}