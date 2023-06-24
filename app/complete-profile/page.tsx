import Providers from '@/components/Providers'
import AuthPage from '@/components/auth-page'
import { getServerSession } from 'next-auth'
import { Splash } from 'next/font/google'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import userModel from "@/utils/Models/User";
import CompleteProfile from '@/components/complete-profile'


export default async function Home() {
  const session = await getServerSession(authOptions)
	if(!session) return redirect("/api/auth/signin")
	const check_user = await userModel.findOne({username:(session?.user?.name ?? '')as string})
	console.log("check user", check_user, session?.user)
	if(check_user?.username){
		redirect('/messages') 
	}
  return (
    <div className="overflow-x-hidden min-h-[90vh]">
      <header className="sticky text-center w-screen p-4 top-5  before:absolute before:h-[300px] before:w-[480px]  before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px]  after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40">
        <h1 className="font-bold text-2xl text-center pt-3">
          Usecrets
        </h1>
      </header>
      <main className='w-full'>
         {/* get user name after first google auth signin */}
         <CompleteProfile />
      </main>
    </div>
  )
}
