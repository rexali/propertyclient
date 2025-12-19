import { useState, useEffect } from "react";
import Pagination from "../../../common/Pagination";
import { CartsList } from "./CartsList";
import { useAuth } from "../../../../context/AuthContext";
import { getProviderUsersPropertiesInCartsAPI } from "../../api/admin/carts/getProviderUsersPropertiesInCarts";
import { getAllUsersPropertiesInCartsAPI } from "../../api/admin/carts/getAllUsersPropertiesInCartsAPI";
import { getUserPropertiesInCartAPI } from "../../api/admin/carts/getUserPropertiesInCart";

const CartsTab = ({ onNavigate }: { onNavigate: any }) => {
    const [data, setData] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [reload, setReload] = useState<number>(1);
    const { user, admin } = useAuth();
    const itemsPerPage = 10;

    useEffect(() => {
        (async () => {
            if (user?.role === 'provider') {
                let data = await getProviderUsersPropertiesInCartsAPI(user?.userId as string, currentPage);
                setTotalPages(Math.ceil(data?.cartCount / itemsPerPage));
                setData(data?.carts)
            } else if (admin?.role === 'admin') {
                let data = await getAllUsersPropertiesInCartsAPI(currentPage);
                setTotalPages(Math.ceil(data?.cartCount / itemsPerPage));
                setData(data?.carts)
            } else if (user?.role === 'user') {
                let data = await getUserPropertiesInCartAPI(user?.userId as string, currentPage);
                setTotalPages(Math.ceil(data?.cartCount / itemsPerPage));
                setData(data?.carts)
            }
        })()

    }, [reload, currentPage])

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Carts of users </h2>
            {data?.length === 0 && <div className="text-gray-500 p-6 text-center">No item in cart found.</div>}
            <CartsList carts={data} onNavigate={onNavigate} setReload={setReload} />
            <div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
            </div>
        </div>
    );
}

export default CartsTab;
