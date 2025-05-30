import { z, type ZodType } from "zod";

export class BrandSchema {
    static readonly CREATE: ZodType = z.object({
        name: z.string(),
        country: z.string()
    })

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).optional(),
        country: z.string().min(1).optional()
    })

    static readonly DELETE: ZodType = z.object({
        id: z.string()
    })
}

export type typeBrandCreateSchema = z.infer<typeof BrandSchema.CREATE>
export type typeBrandDeleteSchema = z.infer<typeof BrandSchema.DELETE>
export type typeBrandUpdateSchema = z.infer<typeof BrandSchema.UPDATE>