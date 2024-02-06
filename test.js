const WhatsApp = require('whatsapp');
require('dotenv').config({
    path: './.env.local'
});


console.log('Hello World');

const FROM_PHONE_NUMBER_ID = '150173314856345'
const accessToken = 'EAADzRgxNofoBO9kydASDwxgEkHP1EdvgqKVhvP0tRYNOQSyfE94VuZCZAk2sQK6btsB7w2hToe2aVD1UT2pk4OeAeZBNr112p6r4aplLfb5EYMO1K7K9R6LqHuQZAyoLZBjq1GRClJjXBVcFvvsFUkEJvwrDOSOXkKudmV671ZAIidtt0eop52ZCQQvEy9N6pwRd3PbuhN72kQfcTQZD';
const url = `https://graph.facebook.com/v18.0/${FROM_PHONE_NUMBER_ID}/messages`;

// const headers = {
//     'Authorization': `Bearer ${accessToken}`,
//     'Content-Type': 'application/json',
// };

// const payload = {
//     'messaging_product': 'whatsapp',
//     'recipient_type': 'individual',
//     'to': '2348153115864',
//     "type": "text",
//     "text": {
//         "body": "Hello, World!"
//     }
// };

// fetch(url, {
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify(payload),
// })
//     .then(response => response.text())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));


const SENDER_NUMBER = '15550837562';
const recipient_number = '2348153115864';


// Your test sender phone number
const wa = new WhatsApp(  SENDER_NUMBER  );

// Enter the recipient phone number

async function send_message() {
    try {
        const sent_text_message = wa.messages.text({ "body": "Hello world" }, recipient_number);

        await sent_text_message.then((res) => {
            console.log(res.rawResponse());
            console.log('Message sent successfully');
        });
    }
    catch (e) {
        console.log(JSON.stringify(e));
    }
}

send_message();