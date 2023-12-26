import { MessageModel } from "./Models";

export type MessageSentResponseData = {
  username: string;
}

export type GetMessagesResponseData = {
    messages : MessageModel[]
}

export type checkUsernameAvailabilityResponseData = {
    available : boolean
}

export type completeProfileResponseData = {
  username:string,
  email:string,
  phone ?: string
}

export type PreConnectWhatsAppResponseData = completeProfileResponseData & {
  phone: string;
  email?: string;
}

export type ConnectWhatsAppResponseData = completeProfileResponseData & {
  phone: string;
  connected: boolean;
}

export type ResponseData = MessageSentResponseData | GetMessagesResponseData | checkUsernameAvailabilityResponseData | completeProfileResponseData | PreConnectWhatsAppResponseData | ConnectWhatsAppResponseData;

export type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
}

export type ErrorResponse = {
  success: false;
  message: string;
  error: string;
}

export type CustomResponse<T = ResponseData> = SuccessResponse<T> | ErrorResponse;
