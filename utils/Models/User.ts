import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import connectDb from "@/utils/mongoose"
import { UsersModel } from "@/utils/types/Models";


// a schema for the user
const UserSchema = new mongoose.Schema<UsersModel>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    phone : { type : String, required: false},
})

export default mongoose.models?.User || mongoose.model('User', UserSchema)

