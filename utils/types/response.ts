import { MessageModel } from "./Models";

export type MessageSentResponseData = {
  username: string;
}

export type GetMessagesResponseData = {
    messages : MessageModel[]
}

export type ResponseData = MessageSentResponseData | GetMessagesResponseData;

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
