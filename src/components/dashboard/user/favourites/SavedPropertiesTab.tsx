import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import Pagination from "../../../common/Pagination";
import { SavedProperties } from "../../admin/favourites/SavedProperties";
import { getUserSavedPropertiesAPI } from "../../api/user/getUserSavedPropertiesAPI";
import { getProviderUserSavedPropertiesAPI } from "../../api/user/getProviderUserSavedPropertiesAPI";

// List of all favorite rooms for all users (no duplicates)
const SavedPropertiesTab = ({ onNavigate }: { onNavigate: any }) => {
  const [data, setData] = useState<any>([]);
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [reload, setReload] = useState(1);


  useEffect(() => {
    (async () => {
      if (user?.role === 'provider' && user?.userId) {
        let data = await getProviderUserSavedPropertiesAPI(user?.userId, currentPage);        
        setTotalPages(data?.favouriteCount)
        setData(data?.favourites)
      } else {
        let data = await getUserSavedPropertiesAPI(user?.userId as unknown as number, currentPage);
        setTotalPages(data?.propertyCount)
        setData(data?.favourites)
      }
    })();
  }, [user?.userId, currentPage,reload])

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Properties</h2>
      <SavedProperties properties={data} onNavigate={onNavigate} setReload={setReload} />
      <div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
      </div>
    </div>
  );
}

export default SavedPropertiesTab

