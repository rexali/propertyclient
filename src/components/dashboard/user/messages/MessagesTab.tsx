import { Edit, MessageCircle, Plus, Trash } from "lucide-react";
import { useEffect,useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import Pagination from "../../../common/Pagination";
import MessageAdd from "../../admin/messages/MessageAdd";
import MessageEdit from "../../admin/messages/MessageEdit";
import { removeMessageAPI } from "../../api/admin/messages/removeMessageAPI";
import { getAllUsersAPI } from "../../api/admin/profile/getAllUsersAPI";
import { getUserMessagesAPI } from "../../api/user/getUserMessages";

var users: any;
(async () => {
  let result = await getAllUsersAPI();
  users = result.users;
})()

export const MessagesTab = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [messageId, setMessageId] = useState<any>();
  const { user } = useAuth() as any;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const { messages } = await getUserMessagesAPI(user?.userId, currentPage);
      setTotalPages(messages.messageCount);
      setMessages(messages.messages);
    })();
  }, [user?.userId, currentPage]);


  async function handleRemoveMessage(id: any) {
    const confirm = window.confirm("Want to remove this?");
    if (confirm) {
      let result = await removeMessageAPI(id);
      if (result) {
        alert("success")
      }
    }
  }

  function handleEditMessage(arg0: boolean, id: any) {
    setOpenEdit(arg0);
    setMessageId(id)
  }

  if (openAdd) {
    return <MessageAdd setOpenAdd={setOpenAdd} />
  }


  if (openEdit) {
    return <MessageEdit setOpenEdit={setOpenEdit} messageId={messageId} />
  }


  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex justify-between">Messages  <span onClick={() => setOpenAdd(true)}> <Plus /></span> </h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {messages?.length === 0 && (
            <li className="p-6 text-center text-gray-500">No messages found.</li>
          )}
          {messages?.slice().sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((msg: any) => {
            const sender = users.find((u: any) => u.id === msg.senderId);
            const receiver = users.find((u: any) => u.id === msg.recipientId);
            return (
              <li key={msg.id} className={`flex items-start px-6 py-4 ${msg.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                <div className="flex-shrink-0 mt-1">
                  <MessageCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">{msg.subject}</span>
                    <span className="text-xs text-gray-400">{msg.createdAt instanceof Date ? msg.createdAt.toLocaleDateString() : new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 mt-1 text-sm">{msg.content}</p>
                  <div className="mt-2 text-xs text-gray-500">From: {sender?.name || sender?.fullName || msg.senderId} | To: {receiver?.name || receiver?.fullName || msg.receiverId}</div>
                  <br /><div className="flex justify-between items-center">
                    <button type="button" onClick={() => handleRemoveMessage(msg.id)}><Trash /></button>
                    <button type="button" onClick={() => handleEditMessage(true, msg.id)}><Edit /></button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
      </div>
    </div>
  );
}