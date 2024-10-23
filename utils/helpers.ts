
export function generateOTP(length: number = 6) {
    let otp = ""
    for (let i = 0; i < length; i++) {
        otp += `${Math.floor(Math.random() * 10)}`
    }
    return otp
}



export const get_whatsapp_secret_message_text = (message : string, user: string) => {
    return `Hello *${user}*, your secret message is: ${message} \n\n From https://usecret.xyz`
}
