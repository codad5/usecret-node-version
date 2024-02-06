"use client"
import { useSession } from "next-auth/react";
import Dialog from "./dialog";
import Notification, { NotificationType } from "./notification";
import { useState } from "react";
import axios from "axios";
import { ConnectWhatsAppResponseData, CustomResponse, PreConnectWhatsAppResponseData } from "@/utils/types/response";

export default function ConnectWhatsapp() {
    const user = useSession()
    const [notification, setNotification] = useState<{ message: string, type: NotificationType } | null>(null)
    const [codeSent, setCodeSent] = useState<boolean>(false)
    const [lastPhone, setLastPhone] = useState<string>("")
    console.log("userr from connect whatsapp", user)

    const connectWhatsapp = async (e: React.FormEvent<HTMLFormElement>) => {
        setNotification(null)
        e.preventDefault()
        setNotification({ message: "Connecting whatsapp", type: "info" })
        console.log(e.target, "form submitted")
        const number = (e.target as HTMLFormElement).whatsappNo.value
        const code = (e.target as HTMLFormElement)?.verificationCode?.value ?? ""
        console.log("number", number)
        return !codeSent ? await sendVerificationCode(number) : await saveWhatsappNumber(number, code)
    }

    const sendVerificationCode = async(number:string) => {
        console.log("sending verification code")
        const {data} = await axios.post<CustomResponse<PreConnectWhatsAppResponseData>>("/api/verify-whatsapp", { phone: number });
        if (!data.success) {
            console.log("error sending verification code", data.message)
            setCodeSent(false)
            setNotification({ message: "Error sending verification code", type: "error" })
        }
        console.log(`verification code sent to ${number}`)
        setCodeSent(true)
        setLastPhone(number)
        setNotification({ message: "Verification code sent", type: "success" })
    }

    const saveWhatsappNumber = async (number:string, code:string) => {
        console.log("sending verification code")
        const {data} = await axios.post<CustomResponse<ConnectWhatsAppResponseData>>("/api/connect-whatsapp", { phone: number , code });
        if (!data.success) {
            console.log("error verifying whatsapp number", data.message)
            setCodeSent(false)
            setNotification({ message: data.message, type: "error" })
        }
        console.log(`Whatsapp number verified`)
        setCodeSent(true)
        setNotification({ message: "Whatsapp number verified", type: "success" })
        window.location.reload()
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
                        <label htmlFor="whatsappNo" className='w-full text-base text-sky-900 font-semibold'></label>
                        <input type="tel" name="whatsappNo" placeholder='WhatsApp No' id="whatsappNo" className='mb-3 outline-none bg-transparent border border-zinc-500 p-2 w-full' onChange={(e) => {
                                if (lastPhone !== e.target.value) {
                                    setCodeSent(false)
                                } else {
                                    setCodeSent(true)
                                }
                        }} />
                        <label htmlFor="verificationCode" className='w-full text-base text-sky-900 font-semibold'></label>
                        {codeSent && <input type="text" name="verificationCode" placeholder='Verification Code' id="verificationCode" className='mb-3 outline-none bg-transparent border border-zinc-500 p-2 w-full' />}
                        <button name="sign-in-with-google" type="submit" className='bg-green-600 px-2 py-1 text-xl rounded-md text-center w-full'>
                            {codeSent ? "Connect" : "Send Verification Code"}
                        </button>
                        </form>
                    </div>
                </section> 
            </Dialog>
        </>
    )
}