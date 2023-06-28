import User from "@/utils/Models/User"
import { CustomResponse, ErrorResponse, MessageSentResponseData, SuccessResponse, checkUsernameAvailabilityResponseData, completeProfileResponseData } from "@/utils/types/response"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route";
import { createUser } from "@/utils/Auth";
import connectDb from "@/utils/mongoose";

export const POST = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions)
        if(!session) throw new Error("Something went wrong, try again later")
        const res : {username:string} = await req.json()
        const username = res.username.toLowerCase()
        if(!username || username.length <= 3) throw new Error("Invalid username")
        await connectDb()
        if(await User.findOne({username})) throw new Error("username taken")
        const email = session?.user?.email
        if(!email) throw new Error("Invalid Email")
        const newUser = await createUser(username, undefined, email)
        if(!newUser) throw new Error("Error creating user")
        console.log("created user")
        return NextResponse.json<SuccessResponse<completeProfileResponseData>>({
            success: true,
            message: "THanks for using usecret",
            data: {
                username: username,
                email: email
            }
        })

        
        
    } catch (e) {
        console.log(e)
        return NextResponse.json<ErrorResponse>({
            message: ("something went wrong"), 
            error: (e as Error).message,
            success: false
        })
    }
}