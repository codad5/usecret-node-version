"use client"
import { useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { CustomResponse, checkUsernameAvailabilityResponseData } from '@/utils/types/response'
import Notification, { NotificationType } from '@/components/notification'
export default function CompleteProfile(){
    const [available, setAvailable] = useState<boolean|null>(null)
    const [notification, setNotification] = useState<{messsage:string, type:NotificationType}|null>(null)
    const  checkUserName = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        console.log(e.target.value)
        try{
            if(e.target.value.length < 3){
                setAvailable(null)
                return
            }
            const {data:res} = await axios.get<CustomResponse<checkUsernameAvailabilityResponseData>>("/api/check-username-availability", {params:{username:e.target.value}})
            console.log(res)
            if(!res.success) throw new Error("Error checking username availability")
            setAvailable(res.data.available)
        }catch(err){
            setAvailable(null)
            setNotification({messsage: (err as Error).message, type:"error"})
            console.log((err as Error).message)
        }
    }
    return (
        <div>
            <Notification {...notification} />
            <form className="flex flex-col items-center justify-center w-full h-full">
                <label className="text-xl font-bold text-center">Enter your Username</label>
                <input className="w-3/4 p-2 m-2 text-xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black" type="text" placeholder="Your name" onInput={checkUserName} />
                <div className="text-white">
                    {available === null ? <>
                        <p className="text-xl font-bold text-center text-gray-600">Checking username availability</p>
                    </> : available ? <p className="text-xl font-bold text-center text-green-600">Username available</p> : <p className="text-xl font-bold text-center text-red-600">Username not available</p>}
                </div>
                <button className="w-3/4 p-2 m-2 text-xl font-bold text-white bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="submit">Submit</button>
                
            </form>
        </div>
    )
}