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
    try {
        //let data = await request.json()
        let taskDelete = await Task.findByIdAndDelete(params.idTasks , {
            new:true
        })
        
        if(!taskDelete) return NextResponse.json({
            message:"tarea no encontrada"
        },{
            status:404
        })

        return NextResponse.json(taskDelete)
        
    } catch (error) {
        return NextResponse.json({
            message:error.message
        },{
            status:400
        })
    }
}

export async function PUT(request, {params}){
    try {
        let data = await request.json()
        let taskUpdate = await Task.findByIdAndUpdate(params.idTasks , data, {
            new:true
        })
    
        return NextResponse.json(taskUpdate)
        
    } catch (error) {
        return NextResponse.json({
            message:error.message
        },{
            status:400
        })
    }
}