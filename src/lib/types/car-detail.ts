export type FUEL_TYPE = "bensin"| "solar"| "listrik"| "hybrid"

export type TRANSMISSION = "manual" | "automatic"

export interface CarDetail {
    _id: string
    car_id: string
    year: number;
    transmission: TRANSMISSION;
    fuel_type: FUEL_TYPE;
    plate_number: string;
    mileage: number;
    color: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    __v: number;
}