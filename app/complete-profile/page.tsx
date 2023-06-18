import Providers from '@/components/Providers'
import AuthPage from '@/components/auth-page'
import { Splash } from 'next/font/google'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="overflow-x-hidden min-h-[90vh]">
      <header className="sticky text-center w-screen p-4 top-5  before:absolute before:h-[300px] before:w-[480px]  before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px]  after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40">
        <h1 className="font-bold text-2xl text-center pt-3">
          Usecrets
        </h1>
      </header>
      <main className='w-full'>
         {/* get user name after first google auth signin */}
         <form className="flex flex-col items-center justify-center w-full h-full">
            <label className="text-xl font-bold text-center">Enter your Username</label>
            <input className="w-3/4 p-2 m-2 text-xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="text" placeholder="Your name" />
             <button className="w-3/4 p-2 m-2 text-xl font-bold text-white bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="submit">Submit</button>
        </form>
      </main>
    </div>
  )
}
