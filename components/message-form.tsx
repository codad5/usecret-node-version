"use client"
import { CustomResponse, MessageSentResponseData } from "@/utils/types/response"
import axios from "axios"
import { useState } from "react"
import {UsersModel} from "@/utils/types/Models"

export default function MessageForm({user} : { user : UsersModel}) {
    const [message, setMessage] = useState('')
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
            
        }catch(err){
            console.log(err)
        }
    }
    return (
        <>
        <span>Drop a message for {user.username}</span>
        <form action={`/api/send-message`} method="POST" className="text-black" encType="multipart/form-data" onSubmit={handleSubmit}>
            <textarea maxLength={200} name="message" id="message" className="text-black" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            <button type="submit" className="text-red">Send</button>
        </form>
        </>
    )
}