"use client"
import { useSession } from "next-auth/react";
import Dialog from "./dialog";
import Notification, { NotificationType } from "./notification";
import { useState } from "react";

export default function ConnectWhatsapp() {
    const user = useSession()
    const [notification, setNotification] = useState<{message:string, type:NotificationType}|null>(null)
    console.log("userr from connect whatsapp", user)

    const connectWhatsapp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setNotification({message:"Connecting whatsapp", type:"info"})
    }

    return (
        <>
            <Notification {...notification} />
            <Dialog message="Connect Whatsapp" open={false}  >
                <section className='w-full p-4'>
                    <div className='w-full grid place-items-center p-1'>
                        <span className='text-md font-bold'>Connect Whatsapp</span>
                    </div>
                    <div className='w-full grid place-items-center p-4 pt-1'>
                        <form className='w-4/5 p-2 max-w-screen-md' onSubmit={connectWhatsapp}>
                        <label htmlFor="whatsapp-no" className='w-full text-base text-sky-900 font-semibold'></label>
                        <input type="tel" name="whatsapp-no" placeholder='WhatsApp No' id="whatsapp-no" className='mb-3 outline-none bg-transparent border border-zinc-500 p-2 w-full' />
                        <button name="sign-in-with-google" type="submit" className='bg-green-600 px-2 py-1 text-xl rounded-md text-center w-full'>
                            Connect
                        </button>
                        </form>
                    </div>
                </section> 
            </Dialog>
        </>
    )
}