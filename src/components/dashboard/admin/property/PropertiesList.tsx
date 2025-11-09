import { useState } from 'react';
import { Delete, Eye, Pencil } from 'lucide-react';
import PropertyEdit from './PropertyEdit';
import { toast } from 'sonner';
import { removePropertyAPI } from '../../api/admin/property/removePropertyAPI';
// import { Property } from '../../../../types';
import { useProperty } from '../../../../context/PropertyContext';
import { getPropertiesAPI } from '../../api/admin/property/getPropertiesAPI';

type PropertyTabProps = {
    // initialProperty: Property[];
    onNavigate: (page: string, data?: any) => void
};

export function PropertiesList({ onNavigate }: PropertyTabProps) {

    let { properties, setProperties} = useProperty()
    const [edit, setEdit] = useState(false);
    const [propertyId, setPropertyId] = useState<any>();


    const handleEditProperty = (propertyId: number | undefined, edit: boolean) => {
        setPropertyId(propertyId);
        setEdit(edit)
    }

    const handleRemoveProperty = async (id: number | undefined) => {
        if (window.confirm("Want to delete this property?")) {
            let result = await removePropertyAPI(id as number);
            if (result) {
                let data = await getPropertiesAPI()
                setProperties(data.properties);
                toast("Property removed successfully");
            } else {
                toast("Property removal failed");
            }
        }
    }

    if (edit) {
        return <PropertyEdit propertyId={propertyId} setOpen={setEdit} />
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="text-left">Title</th>
                        <th className="text-left">Price</th>
                        <th className="text-left">Location</th>
                        <th className="text-left">Status</th>
                        <th className="text-center" colSpan={3}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>{properties?.length === 0 && "No properties found"}</tr>
                    {
                        properties?.map((property: any, i: any) => (
                            <tr key={i}>
                                <td className="border px-4 py-2"><strong>{property?.title}</strong></td>
                                <td className="border px-4 py-2">{property?.price}</td>
                                <td className="border px-4 py-2">{property?.location}</td>
                                <td className="border px-4 py-2">{property?.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button onClick={() => onNavigate('property-details', property?.id)} className="text-blue-600 hover:text-blue-900">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <Pencil className="h-4 w-4" onClick={() => handleEditProperty(property?.id, true)} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <Delete className="h-4 w-4" onClick={() => handleRemoveProperty(property?.id)} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}