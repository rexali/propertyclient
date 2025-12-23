export interface Notification {
    id: number;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    isRead: boolean;
    createdAt: string;
}

export const notifications: Notification[] = [
    {
        id: 901,
        title: 'Booking Confirmed',
        message: 'Your booking for Seaside Studio has been confirmed.',
        type: 'success',
        isRead: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: 902,
        title: 'New Message',
        message: 'You have a new message from Luminous Estates.',
        type: 'info',
        isRead: false,
        createdAt: new Date().toISOString(),
    }
];


export function getNotifications() {
    return notifications;
}

export function getBookingById(id:any) {
    return notifications.find(notification=>notification.id===id)
}