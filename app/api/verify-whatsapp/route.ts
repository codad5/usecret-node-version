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
import { send_message } from "@/utils/whatsapp-client";
import redisClient from "@/utils/redis";

export const POST = async (req: Request) => {
    try {
        connectDb()
        const session = await getServerSession(authOptions)
        if (!session) throw new Error("Something went wrong, try again later")
        const check_user = await userModel.findOne<UsersModel>({ email: session?.user?.email })
        if (!check_user) throw new Error("Invalid user")
        const { phone } = await req.json()
        if (!phone) throw new Error("Invalid phone number")

        // check if phone number is already in use
        const phone_user = await userModel.findOne<UsersModel>({ phone })
        if (phone_user) throw new Error("Phone number already in use")
        const otp = generateOTP()
        await redisClient.set(`${phone}|otp`, otp)
        // let otpHash = await hashPassword(`${phone}|${otp}`)
        // update the above user with the phone number and otp 
        const user = check_user
        // const user = await userModel.findOneAndUpdate<UsersModel>({ email: session?.user?.email }, {  otp: otpHash }, { new: true })
        // if (!user) throw new Error("Error updating user")
        console.log("Added phone number and otp", otp)
        const sent_message = await send_message(phone, `Your OTP is ${otp}`)
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
        console.log((e as Error).message, "error completing w verify")
        return NextResponse.json<ErrorResponse>({
            message: ("something went wrong"), 
            error: (e as Error).message,
            success: false
        })
    }
}