"use client"
import { CustomResponse, MessageSentResponseData } from "@/utils/types/response"
import axios from "axios"
import { useState } from "react"
import {UsersModel} from "@/utils/types/Models"
import Notification, {NotificationType} from '@/components/notification'
import Button from "./buttons"
import Dialog from "./dialog"

export default function MessageForm({user} : { user : UsersModel}) {
    const [message, setMessage] = useState('')
    const [wordCount, setWordCount] = useState(0)
    const wordLimit = 200
    const countColor = wordCount >= wordLimit ? 'text-red-600' : wordCount > wordLimit - 20 ? 'text-yellow-600' : 'text-gray-600'
    const [messageSent, setMessageSent] = useState(false)
    const [notificationMessage, setNotofication] = useState<{
        message ?: string,
        type: NotificationType
    }>(
        {
            type: 'success'
        }
    )
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement> & {target: {message: {value: string}}}) => {
        setMessageSent(false)
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
            setTimeout(() => {
                setMessageSent(true)
            }, 1000)
            
        }catch(err){
            console.log(err)
            setNotofication(prev => ({
                ...prev,
                message: (err as Error).message,
                type: 'error'
            }))

        }
    }
    const handleTextChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
        setWordCount(e.target.value.length)
    }
    return (
        <div className="w-full grid place-items-center">
        <Notification message={notificationMessage.message} type={notificationMessage.type} />
        <div className="p-4 max-w-md w-4/5 md:w-full z-10 inline-block">
            <h3>Tell <span className="font-bold">{user.username}</span> what you think about them</h3>
            <form action={`/api/send-message`} method="POST" className="text-black w-full pt-2" encType="multipart/form-data" onSubmit={handleSubmit}>
                <textarea maxLength={200} name="message" id="message" className="text-black w-full h-40 p-2 dark:bg-gray-800 dark:text-white" placeholder="Your message" value={message} onChange={handleTextChange}></textarea>
                <div className="w-full text-right p-2">
                    <span className={`${countColor}`}>{wordCount}/200</span>
                </div>
                <div className="w-full grid p-4 place-items-center">
                    <Button type="submit" purpose="success">Send</Button>
                    {
                        messageSent ? <Dialog message="Create your own link" open={true}>
                            <div className="w-full p-4">
                                <h1 className="text-xl font-bold text-center">Your message has been sent</h1>
                                <div className="w-full p-4">
                                    <Button type="button" purpose="success" onClick={() => window.location.href = `/messages`}>Create your own link</Button>
                                    <Button type="button" purpose="normal" onClick={() => setMessageSent(false)}>Send another message</Button>
                                </div>
                            </div>
                        </Dialog> : null
                    }
                </div>
                
            </form>
            
        </div>
        </div>
    )
}