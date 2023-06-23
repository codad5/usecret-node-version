"use client"
import { CustomResponse, MessageSentResponseData } from "@/utils/types/response"
import axios from "axios"
import { useState } from "react"
import {UsersModel} from "@/utils/types/Models"
import Notification, {NotificationType} from '@/components/notification'

export default function MessageForm({user} : { user : UsersModel}) {
    const [message, setMessage] = useState('')
    const [notificationMessage, setNotofication] = useState<{
        message ?: string,
        type: NotificationType
    }>(
        {
            type: 'success'
        }
    )
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement> & {target: {message: {value: string}}}) => {
        e.preventDefault()
        const data = {
            username: user.username,
            message: e.target.message.value   
        }
        try{
            console.log(data)
            const {data : res} : { data: CustomResponse<MessageSentResponseData>} = await axios.post('/api/send-message', data)
            console.log(res)
            if(!res.success) throw new Error(`${res.error}`)
            setMessage('')
            setNotofication(prev => ({
                ...prev,
                message: res.message,
                type: 'success'
            }))
            
        }catch(err){
            console.log(err)
            setNotofication(prev => ({
                ...prev,
                message: (err as Error).message,
                type: 'error'
            }))

        }
    }
    return (
        <div className="w-full grid place-items-center">
        <Notification message={notificationMessage.message} type={notificationMessage.type} />
        <div className="p-4 max-w-md w-4/5 z-10 inline-block">
            <h3>Drop a message for <span className="font-bold">{user.username}</span></h3>
            <form action={`/api/send-message`} method="POST" className="text-black w-full pt-2" encType="multipart/form-data" onSubmit={handleSubmit}>
                <textarea maxLength={200} name="message" id="message" className="text-black w-full h-40 p-2" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <div className="w-full grid p-4 place-items-center">
                    <button type="submit" className="text-green bg-white px-4 py-2">Send</button>
                </div>
            </form>
        </div>
        </div>
    )
}