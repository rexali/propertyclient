import { Edit, Eye, Mail, MessageCircle, PlusSquareIcon, Reply, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import Pagination from "../../../common/Pagination";
import MessageAdd from "../../admin/messages/MessageAdd";
import MessageEdit from "../../admin/messages/MessageEdit";
import { removeMessageAPI } from "../../api/admin/messages/removeMessageAPI";
import { getUserMessagesAPI } from "../../api/user/getUserMessages";
import { toast } from "sonner";
import { getUserProviderMessagesAPI } from "../../api/user/getUserProviderMessagesAPI";
import { Link} from "react-router-dom";

export const MessagesTab = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [messageId, setMessageId] = useState<any>();
  const { user, admin } = useAuth();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [reload, setReload] = useState(0);
  const [recipientId, setRecipientId] = useState<any>();
  const itemsPerPage = 10;


  useEffect(() => {
    (async () => {
      if (user?.role === 'provider') {
        const { messages } = await getUserProviderMessagesAPI(user?.userId as string, currentPage);
        setTotalPages(Math.ceil(messages?.messageCount / itemsPerPage));
        setMessages(messages?.messages);
        
      } else {
        const { messages } = await getUserMessagesAPI(user?.userId as string, currentPage);
        setTotalPages(Math.ceil(messages?.messageCount / itemsPerPage));
        setMessages(messages?.messages);
      }

    })();
  }, [reload, user?.userId, currentPage]);


  async function handleRemoveMessage(id: any) {
    const confirm = window.confirm("Want to remove this?");
    if (confirm) {
      let result = await removeMessageAPI(id);
      if (result) {
        toast('Success! Removed')
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex justify-between">Messages  <span onClick={() => setOpenAdd(true)}> <PlusSquareIcon /></span> </h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {messages?.length === 0 && (
            <li className="p-6 text-center text-gray-500">No messages found.</li>
          )}
          {messages?.slice().sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((msg: any,i:any) => {
            return (
              <li key={i} className={`flex items-start px-6 py-4 mb-1 ${msg.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                <div className="flex-shrink-0 mt-1">
                  <MessageCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">{msg.subject}</span>
                    <span className="text-xs text-gray-400">{msg.createdAt instanceof Date ? msg.createdAt.toLocaleDateString() : new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 mt-1 text-sm">{msg.content} </p>
                  <br />
                  <div className="flex justify-between items-centerm">
                    {msg?.Property?.id && <Link title="View property" type="button" to={'/properties/' + msg?.Property?.id}><Eye /></Link>}
                    {msg?.User?.id && <button title="Reply" type="button" onClick={() => { setRecipientId(msg.User.id); setOpenAdd(true); }}><Reply /> Reply</button>}
                    {msg?.User?.username && <Link title="Reply" type="button" to={'mailto:' + msg.User.username}><Mail /></Link>}
                    {admin?.role === 'admin' && <button type="button" onClick={() => handleRemoveMessage(msg.id)}><Trash /></button>}
                    {admin?.role === 'admin' && <button type="button" onClick={() => handleEditMessage(true, msg.id)}><Edit /></button>}
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