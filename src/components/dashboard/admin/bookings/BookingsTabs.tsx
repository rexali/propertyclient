import React, { Fragment, useState } from "react";
import Pagination from "../../../common/Pagination";
import { getAllBookingsAPI } from "../../api/admin/bookings/getAllBookingsAPI";
import { BASE_URL_LOCAL } from "../../../../constants/constants";
import { Eye, PlusSquare, Stamp, Trash, Wallet2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { confirmBookingAPI } from "../../api/admin/bookings/confirmBookingAPI";
import { toast } from "sonner";
import { cancelBookingAPI } from "../../api/admin/bookings/cancelBookingAPI";
import { useAuth } from "../../../../context/AuthContext";
import { getUserBookingsAPI } from "../../api/admin/bookings/getUserBookingsAPI";

export const BookingsTab = () => {
  const { user, admin } = useAuth();
  const [bookings, setBookings] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  /**
   * Check whether it is a week to expire or checkout
   * @param checkOut 
   * @returns 
   */
  const isExpiredStatus = (checkout: Date) => {
    let checkoutDay = new Date(checkout);

    let oneWeekBeforeCheckoutDay = new Date(checkout).getDate() - 7;

    checkoutDay.setDate(oneWeekBeforeCheckoutDay);

    let today = new Date().getTime();

    let daysBeforeCheckout = new Date(checkout).getDate() - new Date().getDate();

    if (today >= checkoutDay.getTime()) {

      return { status: true, daysBeforeCheckout };
    }

    return { status: false, daysBeforeCheckout };
  }

  React.useEffect(() => {
    (async () => {
      if (admin?.role === 'admin') {
        let data = await getAllBookingsAPI(currentPage);
        setTotalPages(data?.bookingCount)
        setTotalPages(Math.ceil(data?.bookingCount / itemsPerPage));
        setBookings(data?.bookings);
      } else if (user?.role === 'provider') {
        //  load provider booking
        let data = await getUserBookingsAPI(user?.userId, currentPage);
        setTotalPages(Math.ceil(data?.bookingCount / itemsPerPage));
        setBookings(data?.bookings);
      } else {
        // load user booking
        let data = await getUserBookingsAPI(user?.userId, currentPage);
        setTotalPages(Math.ceil(data?.bookingCount / itemsPerPage));
        setBookings(data?.bookings);
      }
    })();
  }, [currentPage])

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex justify-between">Bookings   <Link to={"/search"} target="_blank" className="flex "><PlusSquare /></Link></h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Check-In</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Check-Out</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total Price</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Booked On</th>
              <th colSpan={4} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings?.slice().sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((booking: any) => {
              return (
                <tr key={booking.id}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full mr-2"
                        src={BASE_URL_LOCAL + "/uploads/" + booking?.Property?.images[0] || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                        alt={booking.User?.name || booking?.User?.role}
                        crossOrigin="anonymous"
                      />
                      <span className="text-sm font-medium text-gray-900">{booking.User?.username || booking.User?.role}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{booking?.Room?.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{booking.checkIn instanceof Date ? booking.checkIn.toLocaleDateString() : new Date(booking.checkIn).toLocaleDateString()}</td>
                  <td className={`px-4 py-2 whitespace-nowrap text-sm text-gray-500`}>
                    {booking.checkOut instanceof Date ? booking.checkOut.toLocaleDateString() : new Date(booking.checkOut).toLocaleDateString()}
                    <sup className={`p-1 ${isExpiredStatus(booking.checkOut).status ? 'bg-red-900 text-white' : 'text-green-500'}`}>
                      <sup title="Days before expiry day">{isExpiredStatus(booking.checkOut).daysBeforeCheckout}</sup>
                    </sup>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-green-700">₦{booking?.totalPrice.toLocaleString()}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm capitalize">{booking?.status ?? 'pending'}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm capitalize">{booking?.paymentStatus}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{booking?.createdAt instanceof Date ? booking.createdAt.toLocaleDateString() : new Date(booking.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-4">
                      <button
                        onClick={async () => navigate({
                          pathname: "/properties/" + booking.Property.id,
                        })}
                        className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        disabled={booking.status.toLowerCase() === 'confirmed'}
                        onClick={async () => {
                          let yes = confirm('Want to cancel booking?');
                          if (yes) {
                            let result = await cancelBookingAPI(booking.id);
                            if (result.success) {
                              toast('Booking canceled')

                            } else {
                              toast('Cancel failed')
                            }
                          }
                        }
                        }
                        className="text-blue-600 hover:text-blue-900">
                        {booking.status.toLowerCase() === 'confirmed' && user?.role === 'user' ? 'confirmed' : <Fragment><Trash className="h-4 w-4" /> Cancel</Fragment>}
                      </button>
                      {user?.role === 'provider' || admin?.role === 'admin' && (<button
                        onClick={async () => {
                          let yes = confirm('Want to accept or confirm this booking?');
                          if (yes) {
                            let result = await confirmBookingAPI(booking.id, { status: 'confirmed' });
                            if (result.success) {
                              toast('Booking confirmed')

                            } else {
                              toast('Confirmation failed')
                            }
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Stamp className="h-4 w-4" />
                        Confirm
                      </button>)}
                      {admin?.role === 'admin' && (<button
                        onClick={async () => {
                          let yes = confirm('Want to refund this booking?');
                          if (yes) {
                            let result = await confirmBookingAPI(booking.id, { status: 'refunded' });
                            if (result.success) {
                              toast('Refunding process started')

                            } else {
                              toast('Refunding process failed')
                            }
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Wallet2 className="h-4 w-4" />
                        Refund
                      </button>)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {bookings?.length === 0 && (
          <div className="p-6 text-center text-gray-500">No booking transactions found.</div>
        )}
      </div>
      <div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
      </div>
    </div>
  );
}