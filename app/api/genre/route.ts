import { NextResponse } from "next/server";
import {IGenre} from "@/types/movie";
import prisma from "@/prisma/client"
import  genreSchema from "./schema"

export async function GET(request: Request){
    const categories = await prisma.genre.findMany()
    return NextResponse.json(categories)
}


export async function POST(request: Request){
    const body:IGenre = await request.json();
    const validation = genreSchema.safeParse(body)

    if(!validation.success)
        return NextResponse.json({error: validation.error}, {status: 400})

    // CHECK IF CATEGORY ALREADY EXISTS
    const existingGenre = await prisma.genre.findFirst({
        where: {
            genreName: body.genreName
        }
    })

    if(existingGenre)
        return NextResponse.json({error: "Category already exists"}, {status: 409})
    
    const createdGenre = await prisma.genre.create({
        data:{
            genreName: body.genreName
        }
    })

    if(!createdGenre)
        return NextResponse.json({error: "Category not created"}, {status: 500})
    
    return NextResponse.json(createdGenre)
}