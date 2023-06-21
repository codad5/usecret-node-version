import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import connectDb from "@/utils/mongoose"
import { MessageModel } from "../types/Models";


// a schema for the user
const MessageSchema = new mongoose.Schema<MessageModel>({
    username: { type: String, required: true },
    message: { type: String, required: false , maxLength:250},
    date: { type: Date, default: Date.now },
})

export default mongoose.models?.Message || mongoose.model('Message', MessageSchema)

