import User from "@/utils/Models/User"
import { CustomResponse, ErrorResponse, MessageSentResponseData, checkUsernameAvailabilityResponseData } from "@/utils/types/response"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url);
        const params = new URLSearchParams(url.search);
        const username = params.get("username")?.trim()
        if(!username) throw new Error("No username given")
        if(username.length < 4) throw new Error("username too short")
        const avability = await User.findOne({ username }) ? false : true
        return NextResponse.json<CustomResponse<checkUsernameAvailabilityResponseData>>({
            success: true,
            message: avability ? "username available" : "username not available",
            data: { available: avability }
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