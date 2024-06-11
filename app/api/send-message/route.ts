import Message from "@/utils/Models/Message"
import { UsersModel } from "@/utils/types/Models"
import { CustomResponse, ErrorResponse, MessageSentResponseData } from "@/utils/types/response"
import { send_message } from "@/utils/whatsapp-client"
import { NextResponse } from "next/server"
import userModel from "@/utils/Models/User";

export const POST = async (req: Request) => {
    try {
        const data = await req.json()
        if (!data?.message || data?.message.length < 1) throw new Error("No message given")
        // get user details 
        const check_user = await userModel.findOne<UsersModel>({ username: data.username })
        if (!check_user) throw new Error("Invalid user")
        const addmessage = await new Message({ 
            username: data.username,
            message: data.message,
        }).save()
        if (check_user.phone) {
            const sent_message = await send_message(check_user.phone, data.message)
            if (!sent_message) console.log("Error sending message")
            console.log("sent message")
        }
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