import {z} from "zod";

const genreSchema = z.object({
    genreName: z.string().min(3),
})

export default genreSchema