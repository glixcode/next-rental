import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import actorSchema from "./schema"
import {IActor} from "@/types/movie"

export async function GET(request: Request){
    const actors = await prisma.actor.findMany({
        orderBy: {
            firstName: "asc"
        }
    })
    return NextResponse.json(actors)
}

export async function POST(request: Request){
    const body:IActor = await request.json();
    const validation = actorSchema.safeParse(body)

    if(!validation.success)
        return NextResponse.json({error: validation.error}, {status: 400})

    const createdActor = await prisma.actor.create({
        data:{
            firstName: body.firstName,
            lastName: body.lastName,
            birthDate: body.birthDate ? new Date(body.birthDate) : null,
            photoUrl: body.photoUrl
        }
    })

    if(!createdActor)
        return NextResponse.json({error: "Actor not created"}, {status: 500})
    
    return NextResponse.json(createdActor)
}