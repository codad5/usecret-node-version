import User from "@/utils/Models/User"
import { CustomResponse, ErrorResponse, MessageSentResponseData, checkUsernameAvailabilityResponseData } from "@/utils/types/response"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route";
import connectDb from "@/utils/mongoose";



export const dynamic = 'force-dynamic'


export const GET = async (req: NextRequest) => {
    try {
        const username = req.nextUrl.searchParams?.get("username")
        if(!username) throw new Error("No username given")
        if(username.length < 4) throw new Error("username too short")
        await connectDb()
        const avability = await User.findOne({ username : username?.toLowerCase() }) ? false : true
        return NextResponse.json<CustomResponse<checkUsernameAvailabilityResponseData>>({
            success: true,
            message: avability ? "username available" : "username not available",
            data: { available: avability }
        })

        
        
    } catch (e) {
        console.log(e, "error checking username availability")
        return NextResponse.json<ErrorResponse>({
            message: ("something went wrong"), 
            error: (e as Error).message,
            success: false
        })
    }
}