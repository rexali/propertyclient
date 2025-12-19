import { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { getPropertiesAPI } from '../../api/admin/property/getPropertiesAPI';
import Pagination from '../../../common/Pagination';
import PropertyAdd from './PropertyAdd';
import { PropertiesList } from './PropertiesList';
import { useProperty } from '../../../../context/PropertyContext';
import { useAuth } from '../../../../context/AuthContext';
import { getUserPropertiesAPI } from '../../api/admin/property/getUserPropertiesAPI';

export function PropertiesTab({ onNavigate }: { onNavigate: any }) {
    const [open, setOpen] = useState<Boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [refreshPage, setRefreshPage] = useState(0);
    let { setProperties } = useProperty();
    const { user, admin } = useAuth();
    const itemsPerPage = 10;


    const handleSetKey = () => {
        setRefreshPage(prev => prev + 1);
    }

    const handleSetOpen = (val: boolean) => {
        setOpen(val);
        handleSetKey();
    }

    useEffect(() => {
        (async () => {
            if (admin?.role === 'admin') {
                let data = await getPropertiesAPI(currentPage);
                setTotalPages(Math.ceil((data?.propertyCount ?? 1) / itemsPerPage));
                setProperties(data?.properties);
            } else if (user?.role === 'provider') {
                let data = await getUserPropertiesAPI(user?.userId, currentPage);
                setTotalPages(Math.ceil((data?.propertyCount ?? 1 )/ itemsPerPage));
                setProperties(data?.properties);
            }
        })();
    }, [currentPage, refreshPage])


    if (open) {
        return <PropertyAdd setOpen={handleSetOpen} />
    }

    return (
        <div>
            <h2 className='flex justify-between'>Properties <span onClick={() => setOpen(true)}><PlusCircle /></span></h2>
            <PropertiesList onNavigate={onNavigate} setReload={setRefreshPage} />
            <div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
            </div>
        </div>
    );
}