import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import userModel from "./Models/User";
import bcrypt from "bcrypt";



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
            username : username.toLowerCase(),
            password: await hashPassword(password ?? ''),
            email: email
        })
        return await user.save()
    }catch(err) {
        console.log(`error from create user${err}`);
        return false
    }
}


export const userExist = async (username: string) => {
    return await userModel.findOne({ username: username });
}

export const matchPassword = async (password: string, hash: string) => {
    console.log("match password", password, hash)
    return await bcrypt.compare(password, hash);
}

export const hashPassword = async (password: string) => {
    // use bcrypt to hash password
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
