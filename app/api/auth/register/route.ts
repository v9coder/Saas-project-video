import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
    try {
        const {email, passsword} = await request.json();

        if(!email || !passsword){
            return NextResponse.json(
                {error : "Email and password are required!!!"},
                {status : 400}
            )
        }

        //check existing user 
        await connectToDatabase()
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json(
                {error : "User already exist"},
                {status : 400}
            )
        }

        //create new user
        User.create({email, passsword});

        return NextResponse.json(
                {error : "User created successfully"},
                {status : 200}
            )

    } catch (error) {
        console.error("Registration failed")
        return NextResponse.json(
                {error : "REgistration failed"},
                {status : 400}
            )
    }
}