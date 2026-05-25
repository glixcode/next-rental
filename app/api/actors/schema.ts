import {z} from "zod";

const actorSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    birthDate: z.string().optional(),
    photoUrl: z.string().optional()
})

export default actorSchema