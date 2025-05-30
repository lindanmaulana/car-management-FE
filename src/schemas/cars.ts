import { z, type ZodType } from "zod";

export class CarSchema {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1),
        brand_id: z.string().min(1),
        model: z.string().min(1),
        price: z.string().min(1),
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