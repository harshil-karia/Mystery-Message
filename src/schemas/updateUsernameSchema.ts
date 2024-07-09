import {z} from 'zod';
import { userNameValidation } from './signUpSchema';



export const updateUsernameSchema = z.object({
    oldUsername:z.string(),
    username: userNameValidation,
    password: z.string().min(8, {message: "Password must be atleast 8 characters"})
})