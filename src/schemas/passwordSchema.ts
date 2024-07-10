import {z} from 'zod'

export const passwordSchema = z.object({
    password: z.string().min(8, {message: "Password must be atleast 8 characters"}),
    confirmPassword: z.string().min(8, {message: "Password must be atleast 8 characters"})
})
