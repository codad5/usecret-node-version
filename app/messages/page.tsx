
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



export default async function Home() {
	const session = await getServerSession(authOptions)
	if(!session) return redirect("/api/auth/signin")
	const check_user = await userModel.findOne<UsersModel>({email:(session?.user?.email ?? '')as string})
	if(!check_user?.username && session?.user?.email){
		redirect('/complete-profile') 
	}
	const messages = await Message.find<MessageModel>({username: session.user?.name}).sort({ date: -1 });
	return (
		<div className="overflow-x-hidden min-h-screen">
			<header className="sticky text-center w-screen p-4 top-5  before:absolute before:h-[300px] before:w-[480px]  before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px]  after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40">
				<h1 className="font-bold text-2xl text-center pt-3">
				Usecrets
				</h1>
			</header>
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
				<Dialog message="Connect Whatsapp" open={false}  >
					<section className='w-full p-4'>
						<div className='w-full grid place-items-center p-1'>
							<span className='text-md font-bold'>Connect Whatsapp</span>
						</div>
						<div className='w-full grid place-items-center p-4 pt-1'>
							<form className='w-4/5 p-2 max-w-screen-md'>
							<label htmlFor="whatsapp-no" className='w-full text-base text-sky-900 font-semibold'></label>
							<input type="tel" name="whatsapp-no" placeholder='WhatsApp No' id="whatsapp-no" className='mb-3 outline-none bg-transparent border border-zinc-500 p-2 w-full' />
							<button name="sign-in-with-google" type="button" className='bg-green-600 px-2 py-1 text-xl rounded-md text-center w-full'>
								Connect
							</button>
							</form>
						</div>
					</section> 
				</Dialog>
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
 