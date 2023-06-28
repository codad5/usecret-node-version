"use client"
import {useState} from 'react'
import {successNotification} from '@/components/notification'
import { CopyClipboardButton } from './buttons'


export const CopyMessageLink = ({messageId} : any) => {
    return <>
        <CopyClipboardButton content={`${window && window.location.origin}/text/${messageId}`}>Copy message link</CopyClipboardButton>
    </>
}