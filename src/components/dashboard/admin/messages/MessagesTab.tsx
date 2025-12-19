import { Edit, Eye, Mail, MessageCircle, PlusSquareIcon, Reply, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import MessageAdd from "./MessageAdd";
import MessageEdit from "./MessageEdit";
import { Link } from "react-router-dom";
import Pagination from "../../../common/Pagination";
import { getMessagesAPI } from "../../api/admin/messages/getMessagesAPI";
import { removeMessageAPI } from "../../api/admin/messages/removeMessageAPI";
import { toast } from "sonner";

export const MessagesTab = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [messageId, setMessageId] = useState<any>();
  const [recipientId, setRecipientId] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [reload, setReload] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    (async () => {
      const { messages } = await getMessagesAPI(currentPage);
      setTotalPages(Math.ceil(messages?.messageCount/itemsPerPage));
      setMessages(messages?.messages ?? []);
    })();
  }, [reload, currentPage]);


  async function handleRemoveMessage(id: any) {
    const confirm = window.confirm("Want to remove this message?");
    if (confirm) {
      let result = await removeMessageAPI(id);
      if (result) {
        toast('Success: Message deleted')
      }
    }
  }

  function handleEditMessage(arg0: boolean, id: any) {
    setOpenEdit(arg0);
    setMessageId(id)
  }

  if (openAdd) {
    return <MessageAdd setOpenAdd={setOpenAdd} setReload={setReload} recipientId={recipientId} />
  }


  if (openEdit) {
    return <MessageEdit setOpenEdit={setOpenEdit} messageId={messageId} setReload={setReload} />
  }


  return (
    <div>
      <h2 className="text-1xl font-bold text-gray-900 mb-6 flex justify-between">Messages <span onClick={() => setOpenAdd(true)}> <PlusSquareIcon /></span> </h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {messages?.length === 0 && (
            <li className="p-6 text-center text-gray-500">No messages found.</li>
          )}
          {messages?.slice().sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((msg: any) => {
            return (
              <li key={msg.id} className={`flex items-start px-6 py-4 mb-3 ${msg.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                <div className="flex-shrink-0 mt-1">
                  <MessageCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">{msg.subject}</span>
                    <span className="text-xs text-gray-400">{msg.createdAt instanceof Date ? msg.createdAt.toLocaleDateString() : new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 mt-1 text-sm">{msg.content}</p>
                  <br />
                  {/* <div className="mt-2 text-xs text-gray-500">From: {sender?.name || sender?.username || msg.senderId} | To: {receiver?.name || receiver?.username || msg.receiverId}</div><br /> */}
                  <div className="flex justify-between items-center">
                    {msg?.Property?.id && <Link title="View property" type="button" to={'/properties/' + msg?.Property?.id}><Eye /></Link>}
                    {msg?.User?.username && <Link title="Reply" type="button" to={'mailto:' + msg.User.username}><Mail /></Link>}
                    {msg?.User?.id && <button title="Reply" type="button" onClick={()=>{setRecipientId(msg.User.id); setOpenAdd(true);}}><Reply /></button>}
                    <button type="button" onClick={() => handleRemoveMessage(msg.id)}><Trash /></button>
                    <button type="button" onClick={() => handleEditMessage(true, msg.id)}><Edit /></button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div><br />
      <div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
      </div>
    </div>
  );
}