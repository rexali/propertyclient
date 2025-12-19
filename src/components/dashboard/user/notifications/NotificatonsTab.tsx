import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import Pagination from "../../../common/Pagination";
import { getNotificationsAPI } from "../../api/admin/notifications/getNotificationsAPI";

export const NotificationsTab = () => {
  const [notifications, setNotifications] = useState<any>([]);
  const { user } = useAuth() as any;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);


  useEffect(() => {

    (async () => {
      const { notifications, notificationCount} = await getNotificationsAPI(currentPage);
      setTotalPages(notificationCount)
      setNotifications(notifications);
    })();

  }, [user.userId,currentPage]);


  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex justify-between">Notifications</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {notifications?.length === 0 && (
            <li className="p-6 text-center text-gray-500">No notifications found.</li>
          )}
          {notifications?.slice().sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((notification: any) => (
            <li key={notification.id} className={`flex items-start px-6 py-4 mb-3 ${notification?.read ? 'bg-gray-50' : 'bg-yellow-50'}`}>
              <div className="flex-shrink-0 mt-1">
                <Bell className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">{notification?.title}</span>
                  <span className="text-xs text-gray-400">{notification?.createdAt instanceof Date ? notification.createdAt.toLocaleDateString() : new Date(notification.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 mt-1 text-sm">{notification?.message}</p><br />
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