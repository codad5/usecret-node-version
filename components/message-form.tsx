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
            {
                notificationMessage?.message? 
                <Notification message={notificationMessage.message} type={notificationMessage.type} />
                : null
            }
        <div className="p-4 max-w-md z-10">
            <h3>Drop a message for <span className="font-bold">{user.username}</span></h3>
            <form action={`/api/send-message`} method="POST" className="text-black" encType="multipart/form-data" onSubmit={handleSubmit}>
                <textarea maxLength={200} name="message" id="message" className="text-black" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <button type="submit" className="text-green bg-white">Send</button>
            </form>
        </div>
        </div>
    )
}