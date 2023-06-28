"use client"
import { useState } from "react"
import Button from "./buttons"
export default function Dialog({children, message,  open = false, onClose} : {children:React.ReactNode, message: String, open?:boolean, onClose?:() => void}) {
    const [isOpen, setIsOpen] = useState(open)
    const close = () => {
        setIsOpen(false)
        onClose?.()
    }
    const openDialog = () => {
        console.log("open dialog")
        setIsOpen(true)
    }

    return (
        <>
            {
                isOpen ? 
                <div className="fixed z-50 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center text-black">
                    <div className="bg-white p-4 rounded-lg relative w-4/5 max-w-md">
                        <button onClick={close} className="absolute top-0 right-0 p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round"  strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {children}
                    </div>
                </div> : 
                <Button purpose="normal" onClick={openDialog} type="button">{message}</Button>
            }
        </>
    )
}