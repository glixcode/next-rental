import prisma from '@/prisma/client'
import {userLoginSchema} from './schema'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function GET(request: Request){
    return NextResponse.json({name: "John Doe"})
}

export async function POST(request: Request){
    const body = await request.json()
    const username:string = body.username as string

    const validation = userLoginSchema.safeParse(body)

    if(!validation.success)
        return NextResponse.json({success: false}, {status: 400})

    const user = await prisma.users.findUnique({
        where: {
            username: username
        }
    })
    
    if(!user)
        return NextResponse.json({success: false}, {status: 404})

    const password:string = body.password as string
    const passwordCorrect = await bcrypt.compare(password , user.password as string)

    if(!passwordCorrect)
        return NextResponse.json({success: false, message: "Password incorrect"}, {status: 401})
  
    return NextResponse.json({success: true},{status: 200})
}
