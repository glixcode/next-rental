import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    {params}: {params: Promise<{id: string}>}
){
    const {id} = await params;
    const actor = await getActor(parseInt(id));

    if(!actor)
        return NextResponse.json({error: "Actor not found"}, {status: 404})

    const body = await request.json();
    const { firstName, lastName, birthDate, photoUrl } = body;

    const updatedActor = await prisma.actor.update({
        where: {
            id: parseInt(id)
        },
        data: {
            ...(firstName !== undefined && { firstName }),
            ...(lastName !== undefined && { lastName }),
            ...(birthDate !== undefined && { birthDate: birthDate ? new Date(birthDate) : null }),
            ...(photoUrl !== undefined && { photoUrl }),
        }
    })

    if(!updatedActor)
        return NextResponse.json({error: "Actor not updated"}, {status: 500})

    return NextResponse.json(updatedActor)
}

export async function DELETE(
    request: Request,
    {params}: {params: Promise<{id: string}>}
){
    const {id} = await params;
    const actor = await getActor(parseInt(id));

    if(!actor)
        return NextResponse.json({error: "Actor not found"}, {status: 404})

    const deletedActor = await prisma.actor.delete({
        where: {
            id: parseInt(id)
        }
    })

    if(!deletedActor)
        return NextResponse.json({error: "Actor not deleted"}, {status: 500})

    return NextResponse.json(deletedActor)
    
}

const getActor = async (id: number) =>  {
    return await prisma.actor.findUnique(
        {
            where: {
                id
            }
        }
    )
}
