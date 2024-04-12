"use client"

import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateTodo} from "@/schemas/Todo";
import {createTodo} from "@/actions/todo";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {useState, useTransition} from "react";
import {FormError} from "@/components/todo/FormError";
import {FormSuccess} from "@/components/todo/FormSuccess";

interface TodoFormProps {
    onCreateTodo: any
}

export default function TodoForm({onCreateTodo}: TodoFormProps) {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof CreateTodo>>({
        resolver: zodResolver(CreateTodo),
        defaultValues: {
            title: ""
        }
    })

    const onSubmit = (values: z.infer<typeof CreateTodo>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            createTodo(values)
                .then((data) => {
                    onCreateTodo();
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
    }


    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
                <FormField render={({field}) => (
                    <FormItem className="w-full mb-4">
                        <FormControl>
                            <Input className="border-0 px-5 py-4 h-12 md:text-lg bg-white rounded-md" disabled={isPending}
                                   placeholder="Enter your todo here..." {...field} />
                        </FormControl>
                        <FormMessage className="ml-2"/>
                        {/*<FormError message={error}/>*/}
                        {/*<FormSuccess message={success}/>*/}
                    </FormItem>
                )} name="title"/>
                <Button className="rounded-l-none hidden rounded-r-md" type="submit" disabled={isPending}>Add</Button>
            </form>
        </Form>
    );
}
