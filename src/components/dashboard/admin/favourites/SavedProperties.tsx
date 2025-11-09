import { Eye, Phone } from "lucide-react"
import { BASE_URL_LOCAL } from "../../../../constants/constants"

export const SavedProperties = ({ properties = [], onNavigate }: { properties: any, onNavigate: any }) => {


    return (<div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {properties?.map((property: any, i: any) => (
                    <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src={property?.Property?.images?.length ? BASE_URL_LOCAL + "/uploads/" + property?.Property?.images[0] : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                                    alt={property?.Property?.title}
                                    width={10}
                                    height={10}
                                    style={{ margin: 2, display: "inline-block" }}
                                    crossOrigin=""
                                />
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{property?.Property?.title}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {property?.Property?.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {property?.Property?.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {property?.Property?.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex space-x-2">
                                <button onClick={() => onNavigate('property-details', property?.Property?.id)} className="text-blue-600 hover:text-blue-900">
                                        <Eye className="h-4 w-4" />
                                </button> &nbsp;&nbsp;&nbsp;
                                <button className="text-red-600 hover:text-red-900">
                                    <a href={'tel:+234'+property?.Property?.agent?.phone}>
                                        <Phone className="h-4 w-4" />
                                    </a>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {properties?.length === 0 && <div className="text-gray-500 p-6 text-center">No favourite property found.</div>}
    </div>)
}