import React, { useState } from "react";
import { Forward, MessageCircle } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import { addMessageAPI } from "../../api/admin/messages/addMessageAPI";
import { getAllUsersAPI } from "../../api/admin/profile/getAllUsersAPI";


interface MessageForm {
    subject: string;
    content: string;
    recipientId: string;
    senderId: string
}

const initialForm: MessageForm = {
    subject: "",
    content: "",
    recipientId: "",
    senderId: ""
};

const MessageAdd = ({ setOpenAdd }: { setOpenAdd: Function }) => {
    const [form, setForm] = useState<MessageForm>(initialForm);
    const [status, setStatus] = useState<string | null>(null);
    const [users,setUsers]=useState<Array<any>>([]);
    const { user } = useAuth() as any;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Sending message...");
        // TODO: Integrate with API or state management
        console.log({ ...form, senderId: user?.userId });

        let result = await addMessageAPI({ ...form, senderId: user?.userId });
        if (result) {
            setStatus("Message sent!");
            setForm(initialForm);
            setOpenAdd(false)
        }

    };

    React.useEffect(() => {
        (async () => {
            let result = await getAllUsersAPI();
            setUsers(result.users);
        })()
    }, [user?.userId])

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow space-y-6"
        >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center flex items-center justify-between gap-2">
                Add Message
                <MessageCircle className="h-7 w-7 text-blue-500" />
                <span onClick={() => setOpenAdd(false)}><Forward /></span>
            </h2>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div> 
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <select
                    name="recipientId"
                    value={form.recipientId}
                    onChange={handleChange}
                    // className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option defaultValue={form.recipientId} disabled>Select recipient</option>
                    {user.role === "admin" ?
                        users?.filter((u: any) => u.role !== 'admin').map((usr: any) => (
                            (<option key={usr.id} value={usr.id}>
                                {usr.username || usr.id}
                            </option>)
                        ))
                        :
                        users?.filter((u: any) => u.role === 'admin').map((usr: any) => 
                            (<option key={usr.id} value={usr.id}>
                                {usr.username || usr.id}
                            </option>)
                        )
                    }
                </select>
            </div>
            <div className="flex items-end space-x-4">
                {status && (
                    <div className={status === "Message sent!" ? "text-green-500" : "text-blue-500"}>{status}</div>
                )}
                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
                >
                    Send Message
                </button>
            </div>
        </form>
    );
};

export default MessageAdd;
