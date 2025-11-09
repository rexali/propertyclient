// src/pages/dashboard/admin/api/addMessageAPI.ts

import { config } from "../../../../../config/config.ts";
import { ResponseType } from "../../../../../types";

export interface AddMessagePayload {
    subject: string;
    content: string;
    recipientId: string;
    senderId: string
    fullName?: string
    phone?: string
    email?: string
    inquiryType?: string,
}

export async function addMessageAPI(payload: any) {
    try {
        const _csrf = window.localStorage.getItem('csrf') as string;

        const response = await fetch(config.BASE_URL_LOCAL + '/api/v1/messages', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": _csrf
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to send message');
        }

        let result = await response.json() as ResponseType;

        if (result.status === 'success') {
            return true
        }

        return false


    } catch (error: any) {
        console.warn(error);
    }
}
