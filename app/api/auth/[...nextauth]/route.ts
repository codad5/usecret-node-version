import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/utils/mongoose";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import userModel from "@/utils/Models/User";
import { createUser } from "@/utils/Auth";

export const authOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                console.log("authorization")
                await clientPromise()
                try{
                    // check if the user exist in the database
                    let user = await userModel.findOne({ username: credentials?.username })
                    if(user){
                        // if user exist check if password match
                        if(user.password === credentials?.password) return { id: user._id, name: user.username, email: user.email}
                        throw new Error("Password does not match, or username already taken")
                    }
                    // if user does not exist register the user
                    await createUser(credentials?.username as string, credentials?.password)
                    user = await userModel.findOne({ username: credentials?.username })
                    if(user) return { id: user._id, name: user.username, email: user.email}
                    return null
                }
                catch(err){
                    console.log(err);
                    throw new Error((err as Error).message);
                }

            }
        })
    ],
    callback: {
        async signIn({user, account, profile, email, credentials }) {
            console.log("sign in")
            console.log(user)
            console.log("account")
            console.log(account)
            console.log("profile")
            console.log(profile)
            console.log("email")
            console.log(email)
            console.log("credentials")
            console.log(credentials)
            return false
        },
        async session({session, token, user}) {
            console.log("session")
            console.log(session)
            console.log("token")
            console.log(token)
            console.log("user")
            console.log(user)
            return session
        }
    },

    pages: {
        newUser: '/complete-profile'
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }