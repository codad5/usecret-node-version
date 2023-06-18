import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import userModel from "./Models/User";



// check if a user exist in the database if it does check if password match if it does not create a new user and return true
export const signUpuser = async (username: string, password?: string, email?: string) => {
    const user = await userExist(username);
    if(!user) return await createUser(username, password, email);
    if(password && !matchPassword(password, user.password) && user.password) return false;
    return true;

}

export const createUser = async (username: string, password?: string, email ?: string) => {
    try{
        const user = new userModel({
            username : username,
            password: await hashPassword(password ?? ''),
            email: email
        })
        return await user.save()
    }catch(err) {
        console.log(err);
        return false
    }
}


export const userExist = async (username: string) => {
    return await userModel.findOne({ username: username });
}

export const matchPassword = async (password: string, hash : string) => {
    return password == hash
}

export const hashPassword = async (password: string) => {
    return password
}
