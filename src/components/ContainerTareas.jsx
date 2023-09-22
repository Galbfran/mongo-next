"use client"
import { useEffect, useState } from "react"
import TaskCard from "./TaskCard"
import axios from "axios"
const ContainerTareas = () =>{
    let [tareas , setTareas] = useState([])
    useEffect(()=>{
      const loadTasks = async () => {
        try {
          const response = await axios.get("/api/tasks");
          setTareas(response.data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
      loadTasks()
    },[tareas])

    return(
        <div className="grid grid-cols-3 gap-2">
        {
          tareas.map(task => <TaskCard key={task._id} task={task}/>)
        }
        </div>
    )
}

export default ContainerTareas