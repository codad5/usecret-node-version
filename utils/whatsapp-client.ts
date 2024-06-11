import WhatsApp from 'whatsapp';

const FROM_PHONE_NUMBER_ID = '150173314856345'

const SENDER_NUMBER = 15550837562;
// const recipient_number = 2348153115864;


// Your test sender phone number
const wa = new WhatsApp(  SENDER_NUMBER  );

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
