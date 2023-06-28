"use client"
import { MessageModel } from "@/utils/types/Models";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Filter from 'bad-words'
import Button from "./buttons";

const dateOptions : Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

export default function Messages({messages} : {messages :{message:string, date:Date}[]}){
    const [msg, setMessages] = useState<{message:string, date:Date}[]>(messages)
    const [showBadWords, setShowBadWords] = useState<boolean>(window.localStorage.getItem("showBadWords") === "true" ? true : false)
    const filter = new Filter()
    const session = useSession({
        required:true
    })
    console.log(session?.data?.user)
    console.log("running fro message")
    useEffect(() => {
        // setMessages(messages)
    } , [])
    const toggleBadWords = () => {
        setShowBadWords(!showBadWords)
        window.localStorage.setItem("showBadWords", String(!showBadWords))
    }

    return (
        <>
            <div className="w-full py-2 max-w-screen-md">
                <Button purpose={
                    showBadWords ? "danger" : "success"
                } onClick={toggleBadWords}> Bad Words</Button>
            </div>
            <div className="w-full max-w-screen-md border border-white py-2 space-y-2">
            {msg?.map((v, key) => (
                <div key={key} className="w-full border-b-2">
                    <div className="w-full p-2">
                        {showBadWords ? filter.clean(v.message) : v.message}
                    </div>
                    <div className="w-full p-2">
                        <small className="text-sm italic font-extralight">
                            {v.date.toLocaleString(undefined , dateOptions)}
                        </small>
                    </div>
                </div>
            ))}
            </div>
        </>
    )
}