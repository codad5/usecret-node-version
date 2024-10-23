import WhatsApp from 'whatsapp';

const {WA_PHONE_NUMBER_ID} = process.env;


// Your test sender phone number
const wa = new WhatsApp( parseInt(WA_PHONE_NUMBER_ID ?? '') );

// Enter the recipient phone number

export async function send_message(recipient_number: number|string, message: string) {
    // make sure recipient number is a valid number of type number 
    recipient_number = Number(recipient_number);
    const sent_text_message = wa.messages.text({ body: message }, recipient_number);

    await sent_text_message.then((res) => {
        // console.log(res.rawResponse());
        console.log('Message sent successfully to ' + recipient_number);
    });
    return true
}

