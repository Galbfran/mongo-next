import {NextResponse} from "next/server"

export function GET(request, {params}){
    return NextResponse.json({
        message:`obteniendo tarea ${params.idTasks}`
    })
}

export function DELETE(request, {params}){
    return NextResponse.json({
        message:`borrando tarea ${params.idTasks}`
    })
}

export function PUT(request, {params}){
    return NextResponse.json({
        message:`modificando tarea ${params.idTasks}`
    })
}