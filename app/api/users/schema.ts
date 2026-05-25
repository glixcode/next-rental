import {z} from "zod";

const userLoginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6)
})

export {
   userLoginSchema
}