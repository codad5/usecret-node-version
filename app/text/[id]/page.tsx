
import MessageForm from "@/components/message-form"
import User from "@/utils/Models/User"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDb from "@/utils/mongoose"
import {redirect} from "next/navigation"

import { getServerSession } from "next-auth"
import { ResolvingMetadata, Metadata } from "next";
import Header from "@/components/header";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        ...(await parent),
        title: `say something to ${params?.id}`,
        description : `Send anonymous messages to ${params?.id}`
    } as Metadata
}

export default async function TextMe({ params }: { params: { id: string } }){
    await connectDb()
    const session = await getServerSession(authOptions)
	if(session?.user?.name == params.id) return redirect("/messages")
    const user = await User.findOne({username:params.id})
    
    return(
        <>
        <div className="overflow-x-hidden min-h-[90vh]">
			<Header />
			<main className='w-full'>
                <div className="w-full p-4">
                {
                    user ? (
                        <div className=" w-full py-4">
                            <MessageForm user={{ username: user.username }} />
                        </div>
                    ) : ( 
                        <div className="flex flex-col items-center justify-center w-full h-full">
                            <h1 className="text-2xl font-bold text-center">User not found</h1>
                        </div>
                    )
                }
                </div>
            </main>
        </div>
        </>
    )
}