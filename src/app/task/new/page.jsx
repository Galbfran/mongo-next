"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormPage = () => {
    const router = useRouter()
    const [ newTask , setNewTask ] = useState({
        title:"",
        description:""
    })

    const handlerChange = (e) =>{
        setNewTask({...newTask , [e.target.name]: e.target.value})
    }

    const handlerSubmit =async (e) =>{
        try {
            e.preventDefault()
            const res= await fetch("/api/tasks",{
                method:"POST",
                body: JSON.stringify(newTask)
            })
            const data = await res.json()
            console.log(data)
            router.push("/")
            
        } catch (error) {
            console.log(error.message)
        }
    }

    return(
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <form onSubmit={handlerSubmit} >
                <h2 className="font-bold text-3xl">Create Tarea:</h2>
                <input 
                    type="text" 
                    name="title"  
                    placeholder="Titulo" 
                    className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
                    onChange={handlerChange}/>
                <textarea 
                    name="description" 
                    placeholder="Descipcion" 
                    className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4" 
                    row={3}
                    onChange={handlerChange}>
                </textarea>
                <button 
                    className="bg-green-600 hover:bg-green-700 text-white font-mono px-4 py-2 rounded-lg">
                        Guardar
                </button>
            </form>
        </div>
    )
} 

export default FormPage;