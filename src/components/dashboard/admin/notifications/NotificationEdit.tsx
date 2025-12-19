import React, { useEffect, useState } from "react";
import { Forward} from "lucide-react";
import { updateNotificationAPI } from "../../api/admin/notifications/updateNotificationAPI";
import { getNotificationAPI } from "../../api/admin/notifications/getNotificationAPI";

interface NotificationForm {
    title: string;
    message: string;
}

const initialForm: NotificationForm = {
    title: "",
    message: "",
};

const NotificationEdit = ({ setOpenEdit, notificationId, setReload}: { setOpenEdit: Function, notificationId:number, setReload:any }) => {
    const [form, setForm] = useState<NotificationForm>(initialForm);
    const [status, setStatus] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Sending notification...");
        // TODO: Integrate with API or state management
        let result = await updateNotificationAPI(form, notificationId);
        if (result) {
            setStatus("Notification sent!");
            setForm(initialForm);
            setOpenEdit(false);
            setReload((prev:any)=>prev+1);
        }

    };

    useEffect(()=>{
        (async ()=>{
            let {notification} = await getNotificationAPI(notificationId);            
            setForm(notification)
        })()
    },[notificationId]);

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow space-y-6"
        >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center flex items-center justify-between gap-2">
                Edit Notification 
               <span onClick={() => setOpenEdit(false)}> <Forward /></span>
            </h2>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                    type="text"
                    name="title"
                    defaultValue={form?.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                    name="message"
                    defaultValue={form?.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="flex items-end space-x-4">
                {status && (
                    <div className={status === "Notification sent!" ? "text-green-500" : "text-blue-500"}>{status}</div>
                )}
                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
                >
                    Update Notification
                </button>
            </div>
        </form>
    );
};

export default NotificationEdit;
