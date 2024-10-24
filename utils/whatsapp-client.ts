import WhatsApp from 'whatsapp';

const {WA_PHONE_NUMBER_ID} = process.env;


// Your test sender phone number
const wa = new WhatsApp( parseInt(WA_PHONE_NUMBER_ID ?? '') );

// Enter the recipient phone number

export async function send_message(recipient_number: number|string, message: string) {
    // make sure recipient number is a valid number of type number 
    recipient_number = Number(recipient_number);
    const sent_text_message = await wa.messages.text({
        body: message, 
        preview_url: true
     }, recipient_number);
    console.log(sent_text_message.responseBodyToJSON());
    console.log(`Message sent to ${recipient_number}`);
    return true
}

