import * as whatsAppClient from "@green-api/whatsapp-api-client";

const restAPI = whatsAppClient.restAPI({
  idInstance: process.env.ID_INSTANCE,
  apiTokenInstance: process.env.API_TOKEN_INSTANCE,
});

export const sendWhatsappText = async (phone: string, message: string, quoteId?: string) => {
  const response = await restAPI.message.sendMessage(
    `${phone}@c.us`,
    quoteId,
    message,
  );
  return response;
};