import NextAuth, {AuthOptions} from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/utils/mongoose";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import userModel from "@/utils/Models/User";
import { createUser } from "@/utils/Auth";
import { redirect } from "next/navigation";

export const authOptions : AuthOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "login",
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
                        if(user.password === credentials?.password) return { id: user._id, name: user.username, email: user.email, phone: user.phone}
                        throw new Error("Password does not match, or username already taken")
                    }
                    // if user does not exist register the user
                    await createUser(credentials?.username as string, credentials?.password)
                    user = await userModel.findOne({ username: credentials?.username })
                    if(user) return { id: user._id, name: user.username, email: user.email, phone : user.phone}
                    return null
                }
                catch(err){
                    console.log(err);
                    throw new Error((err as Error).message);
                }

            }
        })
    ],
    callbacks: {
        async signIn({user, account, profile, email, credentials }) {
            console.log("sign in", account?.provider)
            return true
        },
        async session({session, token, user}) {
            const user_data = session?.user?.email ? await userModel.findOne({email:session?.user?.email}) : await userModel.findOne({username:session?.user?.name})
            session.user = user_data ? {...session.user,  name: user_data?.username, email: user_data?.email} : session?.user;
            (session as any) = { ...session, username : user_data?.username, email: user_data?.email, phone: user_data?.phone}
            return session
        }
    },

    pages: {
        newUser: '/complete-profile'
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }