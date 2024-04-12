"use client"

import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Todo} from "@/schemas/Todo";
import {updateTodo} from "@/actions/todo";

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

import {useToast} from "@/components/ui/use-toast";
import {ToastAction, ToastProps} from "@/components/ui/toast";

import {useState, useTransition} from "react";
import {FormError} from "@/components/todo/FormError";
import {FormSuccess} from "@/components/todo/FormSuccess";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Pencil2Icon} from "@radix-ui/react-icons";

interface TodoFormProps {
    onCreateTodo: any,
    todoId: string,
    title: string,
    description: string,
}

export default function TodoEditForm({onCreateTodo, todoId, title, description}: TodoFormProps) {
    const {toast} = useToast();
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof Todo>>({
        resolver: zodResolver(Todo),
        defaultValues: {
            title: title,
            description: description,
        }
    })

    const toastPop = (type: boolean) => {
        console.log("Inside toast pop")
        toast({
            variant: type ? 'default' : 'destructive',
            title: type ? 'Success' : 'Failed',
            description: type ? 'Your todo has been updated successfully.' : 'Todo update failure.',
        })
    }

    const onSubmit = (values: z.infer<typeof Todo>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            updateTodo(values, todoId)
                .then((data) => {
                    onCreateTodo();
                    console.log(data)
                    data?.error ? toastPop(false) : null
                    data?.success ? toastPop(true) : null
                })
        })
    }


    return (


        <AlertDialog>
            <AlertDialogTrigger>
                <div
                    className="w-8 h-8 flex justify-center p-1 text-slate-200 hover:text-white items-center rounded-full bg-white border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-400 transition">
                    <Pencil2Icon className="w-6 h-6 "/>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit Todo.</AlertDialogTitle>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-end">
                            <div className="space-y-4 w-full">
                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                placeholder="Enter your todo here..." {...field} />
                                        </FormControl>
                                        <FormMessage/>

                                    </FormItem>
                                )} name="title"/>
                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                placeholder="Enter your todo here..." {...field} />
                                        </FormControl>
                                        <FormMessage/>

                                    </FormItem>
                                )} name="description"/>
                            </div>
                            <FormError message={error}/>
                            <FormSuccess message={success}/>
                            <div className="flex items-center space-x-2">
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction type="submit" className="mt-2 sm:mt-0" disabled={isPending}>Save</AlertDialogAction>
                            </div>

                        </form>
                    </Form>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}
