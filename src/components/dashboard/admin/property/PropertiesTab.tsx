import { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { getPropertiesAPI } from '../../api/admin/property/getPropertiesAPI';
import Pagination from '../../../common/Pagination';
import PropertyAdd from './PropertyAdd';
import { PropertiesList } from './PropertiesList';
import { useProperty } from '../../../../context/PropertyContext';

export function PropertiesTab({ onNavigate }: { onNavigate: any }) {
    const [open, setOpen] = useState<Boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [refreshPage, setRefreshPage] = useState(0);
    let { setProperties } = useProperty()
    const handleSetKey = () => {
        setRefreshPage(prev => prev + 1);
    }

    const handleSetOpen = (val: boolean) => {
        setOpen(val);
        handleSetKey();
    }

    useEffect(() => {
        (async () => {
            let data = await getPropertiesAPI(currentPage);
            setTotalPages(data?.propertyCount ?? 2);
            setProperties(data?.properties);
        })();
    }, [currentPage, refreshPage])


    if (open) {
        return (
            <div>
                <h3>New Property</h3>
                <PropertyAdd setOpen={handleSetOpen} />
            </div>
        )
    }

    return (
        <div>
            <h2 className='flex justify-between'>Properties<span onClick={() => setOpen(true)}><PlusCircle /></span></h2>
            <PropertiesList onNavigate={onNavigate} />
            <div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
            </div>
        </div>
    );
}