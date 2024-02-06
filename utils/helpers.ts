
export function generateOTP(length: number = 6) {
    let otp = ""
    for (let i = 0; i < length; i++) {
        otp += `${Math.floor(Math.random() * 10)}`
    }
    return otp
}