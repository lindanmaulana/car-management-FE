import { z, ZodType } from "zod"

export class UserSchema {
   static readonly SIGNUP: ZodType = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
   })

   static readonly SIGNIN: ZodType = z.object({
    email: z.string().email(),
    password: z.string()
   })

   static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).optional(),
    password: z.string().min(8).optional(),
    confirmPassword: z.string().min(8).optional()
   })
}

export type typeUserSignup = z.infer<typeof UserSchema.SIGNUP>
export type typeUserSignin = z.infer<typeof UserSchema.SIGNIN>
export type typeUserUpdate = z.infer<typeof UserSchema.UPDATE>