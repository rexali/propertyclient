import { Bell, Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import NotificationAdd from "./NotificationAdd";
import NotificationEdit from "./NotificationEdit";
import { getNotificationsAPI } from "../../api/admin/notifications/getNotificationsAPI";
import { removeNotificationAPI } from "../../api/admin/notifications/removeNotificationAPI";
import Pagination from "../../../common/Pagination";

export const NotificationsTab = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [notificationId, setNotificationId] = useState<any>()
  const [notifications, setNotifications] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [read, setRead] = useState<boolean>();
  const [reload, setReload] = useState(0);
  const itemsPerPage = 10;


  useEffect(() => {
    (async () => {
      const { notifications, read, notificationCount } = await getNotificationsAPI(currentPage);
      setRead(read);
      setTotalPages(Math.ceil(notificationCount / itemsPerPage));
      setNotifications(notifications);
    })();
  }, [reload, currentPage]);


  async function handleRemoveNotification(id: any) {
    const confirm = window.confirm("Want to remove this?");
    if (confirm) {
      let result = await removeNotificationAPI(id);
      if (result) {
        alert("success")
      }
    }
  }

  function handleEditNotification(arg0: boolean, id: any) {
    setOpenEdit(arg0);
    setNotificationId(id)
  }

  if (openAdd) {
    return <NotificationAdd setOpenAdd={setOpenAdd} setReload={setReload} />
  }


  if (openEdit) {
    return <NotificationEdit setOpenEdit={setOpenEdit} notificationId={notificationId} setReload={setReload} />
  }


  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex justify-between">Notifications<span onClick={() => setOpenAdd(true)}> <Plus /></span></h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {notifications?.length === 0 && (
            <li className="p-6 text-center text-gray-500">No notifications found.</li>
          )}
          {notifications.slice().sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((notification: any) => (
            <li key={notification.id} className={`flex items-start px-6 py-4 ${read ? 'bg-gray-50' : 'bg-yellow-50'}`}>
              <div className="flex-shrink-0 mt-1">
                <Bell className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">{notification.title}</span>
                  <span className="text-xs text-gray-400">{notification.createdAt instanceof Date ? notification.createdAt.toLocaleDateString() : new Date(notification.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 mt-1 text-sm">{notification.message}</p><br />
                <div className="flex justify-between items-center">
                  <button type="button" onClick={() => handleRemoveNotification(notification.id)}><Trash /></button>
                  <button type="button" onClick={() => handleEditNotification(true, notification.id)}><Edit /></button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
      </div>
    </div>
  );

}