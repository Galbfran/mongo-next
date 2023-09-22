"use client"
import { useState , useEffect } from "react";
import { useRouter , useParams } from "next/navigation";
import axios from "axios";


const FormPage = () => {
    const router = useRouter();
    const params = useParams()
    const getTask = async() =>{
        const data = await axios.get(`/api/tasks/${params.id}`)
        return data.data
    }

    const [task , setTask] = useState({})

    const [ newTask , setNewTask ] = useState({
        title:"",
        description:""
    })

    const handlerChange = (e) =>{
        setNewTask({...newTask , [e.target.name]: e.target.value})
    }

    const createTask =async (e) =>{
        try {
            const res= await fetch("/api/tasks",{
                method:"POST",
                body: JSON.stringify(newTask)
            })
            const data = await res.json()
            router.push("/")
            router.refresh()
        } catch (error) {
            console.log(error.message)
        }
    }

    const updateData = (obj) =>{
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && typeof obj[key] === 'string' && obj[key].trim() === '') {
              delete obj[key];
            }
          }
          return obj
    }

    const updateTask = async() =>{
        try {
            const res = await axios.put(`/api/tasks/${params.id}` , updateData(newTask))
            router.push("/")
            router.refresh()
        } catch (error) {
            console.log(error.message)
        }
    }

    const handlerSubmit =async (e) =>{
        e.preventDefault()
        if(!params.id){
            await createTask(e);
        }else{
            await updateTask()
        }
    }

    const handlerDelete =async () =>{
        if(window.confirm("Desea eliminar la tarea")){
            try {
                const res = await axios.delete(`/api/tasks/${params.id}`);
                router.push("/");
                router.refresh();
                
            } catch (error) {
                console.log(error)
            }
        }
        
    }
    useEffect(() => {
        const fetchData = async () => {
            if (params.id) {
            const taskData = await getTask();
            setTask(taskData);
            }
        };
        fetchData();
    }, []);


    return(
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center ">
            <form onSubmit={handlerSubmit} className="bg-gray-800 p-4 rounded-md " >
                <header className="flex justify-between ">
                    <h2 className="font-bold text-3xl">
                        {
                            !params.id ? "Crear Tarea" : "Editar Tarea"
                        }
                    </h2>
                    {params.id && <button 
                        type="button"
                        onClick={handlerDelete}
                        className="bg-red-500 px-3 py-1 rounded-md"
                    >Eliminar</button>}

                </header>
                <div >
                    {
                        params.id && <h2 className="font-bold text-3xl">Titulo: {task.title}</h2>
                    }
                    {
                        params.id && <h2 className="font-bold ">Descripcion: {task.description}</h2>
                    }
                </div>
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
                    className="bg-green-600 hover:bg-green-700 text-white font-mono px-4 py-2 rounded-lg"
                    type="submit">
                         {
                            !params.id ? "Guardar" : "Editar"
                        }
                </button>
            </form>
        </div>
    )
} 

export default FormPage;