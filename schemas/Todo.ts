import {z} from "zod";

export const CreateTodo = z.object({
    title: z.string().min(3, {
        message: "Title must contain at least 3 characters."
    }).max(50, {
        message: "Title can only contain at most 50 characters."
    })
})
export const Todo = z.object({
    title: z.string().min(3, {
        message: "Title must contain at least 3 characters."
    }).max(50, {
        message: "Title can only contain at most 50 characters."
    }),
    description: z.string().max(200, {
        message: "Description can only contain at most 200 characters."
    })
})