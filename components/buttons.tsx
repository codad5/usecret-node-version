"use client"
import { useState } from "react"
import { successNotification } from "./notification"

export default function Button({ children, purpose , ...props }: { children: React.ReactNode, purpose : "danger" | "normal" | "success" | "warning"} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    
    const buttonColor = {
        "danger": "bg-red-600",
        "normal": "bg-blue-600",
        "success": "bg-green-600",
        "warning": "bg-yellow-600"
    }[purpose] || "bg-blue-600"

    return (
        <button className={`p-2 m-2 text-xl font-bold text-white ${buttonColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`} {...props} >
                {children}
            </button>
    )
}


export const CopyClipboardButton =({content, children} : {content:string, children?:React.ReactNode}) => {
    const [copied, setCopied] = useState(false)
    console.log(content)
    return (
        <>
            <Button onClick={() => {
                navigator.clipboard.writeText(content)
                setCopied(true)
            }}  purpose="success">
                {children || "Copy to clipboard"}
            </Button>
            {
                copied ? successNotification("Copied to clipboard") : null
            }
        </>
    )
}

