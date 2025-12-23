export interface Message {
    id: number;
    senderId: number;
    recipientId: number;
    subject?: string;
    content: string;
    isRead: boolean;
    createdAt: string;
}

export const messages: Message[] = [
    {
        id: 801,
        senderId: 201,
        recipientId: 42,
        subject: 'Inquiry about Ocean View Villa',
        content: 'Hi, is the Ocean View Villa available next month? What is the best way to schedule a viewing?',
        isRead: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: 802,
        senderId: 42,
        recipientId: 201,
        subject: 'Re: Inquiry about Ocean View Villa',
        content: 'Hello Jordan, thanks for your interest — yes it is available. I can arrange a viewing next week.',
        isRead: false,
        createdAt: new Date().toISOString(),
    }
];



export function getMessages() {
    return messages;
}

export function getBookingById(id:any) {
    return messages.find(message=>message.id===id)
}