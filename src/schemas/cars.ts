import { z, type ZodType } from "zod";

const transmission = {AUTOMATIC: "automatic", MANUAL: "manual"}
const fuel_type = {BENSIN: "bensin", HYBRID: "hybrid", LISTRIK: "listrik", SOLAR: "solar"}

export class CarSchema {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1),
        brand_id: z.string().min(1),
        model: z.string().min(1),
        price: z.string().min(1),

        year: z.string(),
        transmission: z.enum([transmission.MANUAL, transmission.AUTOMATIC]),
        fuel_type: z.enum([fuel_type.BENSIN, fuel_type.HYBRID, fuel_type.LISTRIK, fuel_type.SOLAR]),
        plate_number: z.string().min(6),
        mileage: z.preprocess((val) => Number(val), z.number().positive()),
        color: z.string().min(1),
        description: z.string().min(1)
    })

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).optional(),
        brand_id: z.string().min(1).optional(),
        model: z.string().min(1).optional(),
        status: z.enum(["available", "rented", "sold"]).optional(),
        price: z.string().min(1).optional(),
    })
}

export type typeCarCreateSchema = z.infer<typeof CarSchema.CREATE>
export type typeCarUpdateSchema = z.infer<typeof CarSchema.UPDATE>