import { z } from "zod";

const UserSchema = z.object({
    firstName: z.string().min(2,{message:"First name should be atleast 2 characters long"}),
    lastName: z.string().min(2,{message:"Last name should be atleast 2 characters long"}).optional(),
    email: z.string().email({message:"enter a valid email address"}),
    gender: z.enum(['Male', 'Female', 'Others'])
})

export type UserType = z.infer<typeof UserSchema>;
