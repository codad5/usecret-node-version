
import {getServerSession} from "next-auth/next"
import {redirect} from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Message from "@/utils/Models/Message";
import { MessageModel, UsersModel } from "@/utils/types/Models";
import userModel from "@/utils/Models/User";
import {CopyMessageLink} from "@/components/copy-clipboard";
import Messages from "@/components/messages"; 
import Button from "@/components/buttons";
import Dialog from "@/components/dialog";

import { Metadata  } from 'next'
import ConnectWhatsapp from "@/components/connect-whatsapp";
import Header from "@/components/header";



export default async function Home() {
	const session = await getServerSession(authOptions)
	if(!session) return redirect("/api/auth/signin")
	const check_user = await userModel.findOne<UsersModel>({email:(session?.user?.email ?? '')as string})
	if(!check_user?.username && session?.user?.email){
		redirect('/complete-profile') 
	}
	const messages = await Message.find<MessageModel>({username: session.user?.name}).sort({ date: -1 });

	const connectWhatsapp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}
	return (
		<div className="overflow-x-hidden min-h-screen">
			<Header/>
			<main className='w-full'>
				<section className='w-full pt-10 p-4 text-center grid place-items-center'>
			<h3 className='text-3xl font-bold w-4/5'>
			GET FEEDBACKS FROM FRiENDS
			</h3>
		</section>
		<section className="w-full p-4 grid place-items-center">
			<h1 className="text-lg font-bold">Welcome back {session?.user?.name}</h1>
				<div className="w-full p-4 text-center z-50">
					<CopyMessageLink messageId={`${session?.user?.name}`} />
				<form action="/api/auth/signout" method="POST" className="inline-block">
					<Button type="submit" purpose="danger">Sign out</Button>
				</form>
			{
				!check_user?.phone ? 
				<ConnectWhatsapp />
				: null
			}
			</div>
		</section>
			<section className="w-full p-2">
				<h1 className="w-full p-3 sticky top-0 z text-center">Your Messages</h1>
				<div className="w-full p-3 grid place-items-center">
					{/* <div className="w-full max-w-screen-md border border-white py-2 space-y-2"> */}
						<Messages messages={messages.map(v => ({message:v.message, date:v.date}))}  />
					{/* </div> */}
				</div>
			</section>
			</main>
		</div>
	)
}
 