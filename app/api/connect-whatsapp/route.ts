import { ConnectWhatsAppResponseData, ErrorResponse, SuccessResponse } from "@/utils/types/response"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route";
import userModel from "@/utils/Models/User";
import connectDb from "@/utils/mongoose";
import { UsersModel } from "@/utils/types/Models";
import redisClient from "@/utils/redis";

export const POST = async (req: Request) => {
    try {
        connectDb()
        const session = await getServerSession(authOptions)
        if (!session) throw new Error("Something went wrong, try again later")
        const check_user = await userModel.findOne<UsersModel>({ email: session?.user?.email })
        if (!check_user) throw new Error("Invalid user")
        const { phone, code } = await req.json()
        if (!phone) throw new Error("Invalid phone number")
        const r_code = await redisClient.get(`${phone}|otp`)
        if (!r_code) throw new Error("No code found")
        if (r_code != code) throw new Error("Invalid code")
        // let otpHash = await hashPassword(`${phone}|${otp}`)
        // update the above user with the phone number and otp 
        const user = await userModel.findOneAndUpdate<UsersModel>({ email: session?.user?.email }, {  phone: phone }, { new: true })
        if (!user) throw new Error("Error updating user")
        console.log("Added phone number", phone)
        return NextResponse.json<SuccessResponse<ConnectWhatsAppResponseData>>({
            success: true,
            message: "WhatsApp connected",
            data: {
                username: user.username,
                phone: phone,
                email: user.email || "",
                connected: true
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