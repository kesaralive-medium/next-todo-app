"use client"
import {CheckIcon, TrashIcon, Cross2Icon} from "@radix-ui/react-icons";

import TodoForm from "@/components/todo/TodoForm";
import {useEffect, useState} from "react";
import {getTodos, deleteTodo, completeTodo, incompleteTodo} from "@/actions/todo";
import TodoEditForm from "@/components/todo/TodoEditForm";


export default function Home() {
    const [todos, setTodos] = useState<any>(null)
    useEffect(() => {
        const getData = async () => {
            const data = await getTodos()
            setTodos(data)
        }
        getData()
    }, []);

    const handleCreateTodo = async () => {
        const data = await getTodos()
        setTodos(data)
    }

    const incompletedTodos = (todo: any) => {
        if (!todo.completed) {
            return todo
        }
    }

    const completedTodos = (todo: any) => {
        if (todo.completed) {
            return todo
        }
    }

    const deleteSelectedTodo = (id: string) => {
        deleteTodo(id).then(data => handleCreateTodo());
    }

    const completeSelectedTodo = (id: string) => {
        completeTodo(id).then(data => handleCreateTodo())
    }

    const incompleteSelectedTodo = (id: string) => {
        incompleteTodo(id).then(data => handleCreateTodo())
    }

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 bg-slate-50 space-y-2">
            <TodoForm onCreateTodo={handleCreateTodo}/>
            <div className="space-y-2">
                {
                    todos?.filter(incompletedTodos).map((todo: any, index: number) => (
                        <div
                            className="flex items-center justify-between px-5 py-3 bg-white shadow-md rounded-full"
                            key={index + 1}>
                            <p className="text-slate-500 truncate max-w-[190px] md:max-w-[500px] md:text-lg">{todo.title}</p>
                            <div className="space-x-2 flex items-center">

                                <div
                                    onClick={() => completeSelectedTodo(todo?._id)}
                                    className="w-8 h-8 flex cursor-pointer justify-center text-slate-200 hover:text-white items-center rounded-full bg-white border-2 border-slate-200 hover:border-green-400 hover:bg-green-400 transition">
                                    <CheckIcon className="w-6 h-6 "/>
                                </div>

                                <TodoEditForm onCreateTodo={handleCreateTodo} todoId={todo?._id}
                                              title={todo?.title} description={todo?.description}/>
                                <div
                                    onClick={() => deleteSelectedTodo(todo?._id)}
                                    className="w-8 h-8 flex cursor-pointer justify-center text-slate-200 hover:text-white items-center rounded-full bg-white border-2 border-slate-200 hover:border-red-400 hover:bg-red-400 transition">
                                    <TrashIcon className="w-6 h-6 "/>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300"/>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-2 my-10 text-sm text-gray-500"></span>
                </div>
            </div>
            <div className="space-y-2">
                {
                    todos?.filter(completedTodos).map((todo: any, index: number) => (
                        <div
                            className="flex items-center justify-between px-5 py-3 bg-white shadow-md rounded-full"
                            key={index + 1}>
                            <p className="text-slate-500 truncate max-w-[190px] md:max-w-[500px] md:text-lg line-through">{todo.title}</p>
                            <div className="space-x-2 flex items-center">

                                <div
                                    onClick={() => incompleteSelectedTodo(todo?._id)}
                                    className="w-8 h-8 flex cursor-pointer justify-center text-slate-200 hover:text-white items-center rounded-full bg-white border-2 border-slate-200 hover:border-orange-400 hover:bg-orange-400 transition">
                                    <Cross2Icon className="w-6 h-6 "/>
                                </div>

                                <TodoEditForm onCreateTodo={handleCreateTodo} todoId={todo?._id}
                                              title={todo?.title} description={todo?.description}/>

                                <div
                                    onClick={() => deleteSelectedTodo(todo?._id)}
                                    className="w-8 h-8 flex cursor-pointer justify-center text-slate-200 hover:text-white items-center rounded-full bg-white border-2 border-slate-200 hover:border-red-400 hover:bg-red-400 transition">
                                    <TrashIcon className="w-6 h-6 "/>
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>
        </main>
    );
}
