import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: Request) {
    const genre = await prisma.genre.findMany({
        orderBy: {
            genreName: "asc"
        }
    })
    return NextResponse.json(genre)
}

