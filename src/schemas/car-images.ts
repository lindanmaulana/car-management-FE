import { z, type ZodType } from "zod";

const imageSchema: ZodType = z.instanceof(File).refine(file => !!file, "File harus di isi")
.refine((file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type), "Hanya file JPEG, JPG, atau PNG yang di perbolehkan")
.refine((file) => file.size <= 2 * 1024 * 1024, "Ukuran file maksimal 2MB")

export class CarImageSchema {
    static readonly UPLOAD: ZodType = z.object({
        image: imageSchema
    })

    static readonly UPDATE: ZodType = z.object({
        car_id: z.string().optional()
    })
}

export type TypeCarImageUpload = {
    image: File
}

export type TypeCarImageUploadSchema = z.infer<typeof CarImageSchema.UPLOAD>
export type TypeCarImageUpdateSchema = z.infer<typeof CarImageSchema.UPDATE>