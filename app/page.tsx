import Providers from '@/components/Providers'
import AuthPage from '@/components/auth-page'
import { Splash } from 'next/font/google'
import Image from 'next/image'
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Metadata  } from 'next'
import Header from '@/components/header'



export default async function Home() {
  const session = await getServerSession(authOptions)
	if(session) return redirect("/messages")
  return (
    <div className="overflow-x-hidden min-h-[90vh]">
      <Header />
      <main className='w-full'>
          <AuthPage />
      </main>
    </div>
  )
}
