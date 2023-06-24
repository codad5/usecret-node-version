
import MessageForm from "@/components/message-form"
import User from "@/utils/Models/User"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDb from "@/utils/mongoose"
import {redirect} from "next/navigation"

import { getServerSession } from "next-auth"

export default async function TextMe({ params }: { params: { id: string } }){
    await connectDb()
    const session = await getServerSession(authOptions)
	if(session?.user?.name == params.id) return redirect("/messages")
    const user = await User.findOne({username:params.id})
    
    return(
        <>
        <div className="overflow-x-hidden min-h-[90vh]">
			<header className="sticky text-center w-screen p-4 top-5  before:absolute before:h-[300px] before:w-[480px]  before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px]  after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40">
				<h1 className="font-bold text-2xl text-center pt-3">
				Usecrets
				</h1>
			</header>
			<main className='w-full'>
                <div className="w-full p-4">
                {
                    user ? (
                        <div className=" w-full p-4">
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