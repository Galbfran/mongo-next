import { connectDB } from "../utils/mongoose"
import Task from "../models/Task"
import TaskCard from "../components/TaskCard"

const loadTasks =async() =>{
  await connectDB()
  const tasks = await Task.find();
  
  return tasks
}

export default async function Home() {
  const tareas = await loadTasks()
  return (
   <article>
    <div>
      <div className="grid grid-cols-3 gap-2">
        {
          tareas.map(task => <TaskCard key={task._id} task={task}/>)
        }
      </div>
    </div>
   </article>
  )
}
