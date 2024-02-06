import Providers from '@/components/Providers'
import AuthPage from '@/components/auth-page'
import { getServerSession } from 'next-auth'
import { Splash } from 'next/font/google'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import userModel from "@/utils/Models/User";
import CompleteProfile from '@/components/complete-profile'
import Header from '@/components/header'


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
      <Header />
      <main className='w-full'>
         {/* get user name after first google auth signin */}
         <CompleteProfile />
      </main>
    </div>
  )
}
