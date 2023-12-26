import User from "@/utils/Models/User"
import { CustomResponse, ErrorResponse, MessageSentResponseData, PreConnectWhatsAppResponseData, SuccessResponse, checkUsernameAvailabilityResponseData, completeProfileResponseData } from "@/utils/types/response"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route";
import { createUser, hashPassword } from "@/utils/Auth";
import userModel from "@/utils/Models/User";
import connectDb from "@/utils/mongoose";
import { UsersModel } from "@/utils/types/Models";
import { generateOTP } from "@/utils/helpers";
import { sendWhatsappText } from "@/utils/whatsapp-client";

export const POST = async (req: Request) => {
    try {
        connectDb()
        const session = await getServerSession(authOptions)
        if (!session) throw new Error("Something went wrong, try again later")
        const check_user = await userModel.findOne<UsersModel>({ email: session?.user?.email })
        if (!check_user) throw new Error("Invalid user")
        const { phone } = await req.json()
        if (!phone) throw new Error("Invalid phone number")
        const otp = generateOTP()
        let otpHash = hashPassword(`${phone}|${otp}`)
        // update the above user with the phone number and otp 
        const user = await userModel.findOneAndUpdate<UsersModel>({ email: session?.user?.email }, {  otp: otpHash }, { new: true })
        if (!user) throw new Error("Error updating user")
        console.log("Added phone number and otp")
        const sent_message = await sendWhatsappText(phone, otp);
        if (!sent_message) throw new Error("Error sending message")
        console.log("sent message")
        return NextResponse.json<SuccessResponse<PreConnectWhatsAppResponseData>>({
            success: true,
            message: "OTP sent",
            data: {
                username: user.username,
                phone: phone,
                email: user.email
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