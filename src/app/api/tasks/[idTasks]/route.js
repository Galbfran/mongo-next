import {NextResponse} from "next/server"
import {connectDB} from "../../../../utils/mongoose"
import Task from '../../../../models/Task'

export async function GET(request, {params}){
    try {
        await connectDB()
        const task = await Task.findById(params.idTasks)
        if(!task) return NextResponse.json({
            message:"tarea no encontrada"
        },{
            status:404
        })
        return NextResponse.json(task)
        
    } catch (error) {
        return NextResponse.json({
            message:error.message
        },{
            status:400
        })
    }
}

export async function DELETE(request, {params}){
    return NextResponse.json({
        message:`borrando tarea ${params.idTasks}`
    })
}

export async function PUT(request, {params}){
    


    return NextResponse.json({
        message:`modificando tarea ${params.idTasks}`
    })
}