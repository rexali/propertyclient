import { Eye, Mail, MailsIcon, Trash } from "lucide-react"
import { BASE_URL_LOCAL } from "../../../../constants/constants"
import { useAuth } from "../../../../context/AuthContext"
import { toast } from "sonner";
import { removeFromCartAPI } from "../../../pages/api/removeFromCartAPI";

export const CartsList = ({ carts = [], setReload, onNavigate }: { carts: any, setReload: any, onNavigate: any }) => {
    const { user, admin } = useAuth();

    const removePropertyFromCart = async (cartId: number, userId: number) => {

        let res = await removeFromCartAPI({ cartId, userId });
        if (res) {
            setReload((prev: any) => prev + 1);
            toast('Property removed from wish list');
        } else {
            toast('Property removal failed');
        }
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="w-full table-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Property
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            availability
                        </th>
                        <th colSpan={3} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {carts?.map((cart: any, i: any) => (
                        <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={cart?.Property?.images?.length ? BASE_URL_LOCAL + "/uploads/" + cart?.Property?.images[0] : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                                        alt={cart?.Property?.title}
                                        width={10}
                                        height={10}
                                        style={{ margin: 2, display: "inline-block" }}
                                        crossOrigin=""
                                    />
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{cart?.Property?.title}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {cart?.Property?.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {cart?.Property?.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {cart?.Property?.status}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex space-x-3">
                                    {user?.role === 'user' && (<button
                                        title="Remove cart"
                                        onClick={() => removePropertyFromCart(cart?.id, user?.userId as unknown as number)}
                                        className="text-red-600 hover:text-red-900">
                                        <Trash className="h-4 w-4" />
                                    </button>)}
                                    <button
                                        title="View cart"
                                        onClick={() => onNavigate('/properties/' + cart?.Property?.id, { state: cart?.Property?.id })}
                                        className="text-blue-600 hover:text-blue-900">
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    {admin?.role === 'admin' && (<button className="text-red-600 hover:text-red-900">
                                        <a href={'mailto:' + cart?.Property?.agent?.email} title="Email cart owner or agent">
                                            <MailsIcon className="h-4 w-4" />
                                        </a>
                                    </button>)}
                                    {(user?.role === 'provider') && (<button className="text-red-600 hover:text-red-900">
                                        <a href={'mailto:' + cart?.User?.username} title="Email the user that saved this cart">
                                            <Mail className="h-4 w-4" />
                                        </a>
                                    </button>)}
                                    {(admin?.role === 'admin') && (<button className="text-red-600 hover:text-red-900">
                                        <a href={'mailto:' + cart?.User?.username} title="Email the user that saved this cart">
                                            <Mail className="h-4 w-4" />
                                        </a>
                                    </button>)}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {carts?.length === 0 && <div className="text-gray-500 p-6 text-center">No favourite cart found.</div>}
        </div>)
}