import Message from "@/utils/Models/Message"
import { CustomResponse, ErrorResponse, MessageSentResponseData } from "@/utils/types/response"
import { send_message } from "@/utils/whatsapp-client"
import { NextResponse } from "next/server"
export const POST = async (req: Request) => {
    try {
        const data = await req.json()
        if(!data?.message || data?.message.length < 1) throw new Error("No message given")
        const addmessage = await new Message({ 
            username: data.username,
            message: data.message,
        }).save()
        await send_message(2348153115864, data.message)
        return NextResponse.json<CustomResponse<MessageSentResponseData>>({ success: true, message: "message sent", data: { username: addmessage.username }})
        
    } catch (e) {
        console.log(e, "error sending message")
        return NextResponse.json<ErrorResponse>({
            success: false,
            message: "something went wrong",
            error: (e as Error).message
        })
    }
}
export const GET = async (req: Request) => {
    try {
        const res = await req.body
         return NextResponse.json({ res })
        
    } catch (e) {
        console.log(e, "error sending message")
        return NextResponse.json({ message : ("something went wrong"), error: (e as Error).message})
    }
}