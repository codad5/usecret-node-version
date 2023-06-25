"use client"
import {useState} from 'react'
import {successNotification} from '@/components/notification'
export const CopyClipboard =({content, children} : {content:string, children?:React.ReactNode}) => {
    const [copied, setCopied] = useState(false)
    console.log(content)
    return (
        <>
            <button className="p-2 m-2 text-xl font-bold text-white bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" onClick={() => {
                navigator.clipboard.writeText(content)
                setCopied(true)
            }}>
                {children || "Copy to clipboard"}
            </button>
            {
                copied ? successNotification("Copied to clipboard") : null
            }
        </>
    )
}


export const CopyMessageLink = ({messageId} : any) => {
    return <>
        <CopyClipboard content={`${window.location.origin}/text/${messageId}`}>Copy message link</CopyClipboard>
    </>
}
