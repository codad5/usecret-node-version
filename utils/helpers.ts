
export function generateOTP(length: number = 6) {
    let otp = ""
    for (let i = 0; i < length; i++) {
        otp += `${Math.floor(Math.random() * 10)}`
    }
    return otp
}
export const get_whatsapp_secret_message_text = (message: string, user: string) => {
    return `👀💌 Hey ${user}, here’s your secret message:

> ${message}

Unlock more at https://usecret.xyz 🔑`
}
