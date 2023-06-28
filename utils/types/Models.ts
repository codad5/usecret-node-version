export type UsersModel = {
    username: string;
    password ?: string;
    email ?: string;
    phone ?: string;
}

export type MessageModel = {
    username: string,
    message: string,
    date: Date
}
