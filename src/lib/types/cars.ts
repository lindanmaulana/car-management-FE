import type { CarDetail } from "./car-detail"
import type { CarImage } from "./car-images"

export interface Car {
    _id: string
    name: string
    brand_id: {
        _id: string,
        name: string
        country: string
    },
    images: CarImage[]
    car_detail: CarDetail,
    model: string
    status: string
    price: number
    thumbnail: string
    created_at: Date
    updated_at: Date
    __v: number
}