import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import Pagination from "../../../common/Pagination";
import { SavedProperties } from "../../admin/favourites/SavedProperties";
import { getUserSavedPropertiesAPI } from "../../api/user/getUserSavedPropertiesAPI";

// List of all favorite rooms for all users (no duplicates)
const SavedPropertiesTab = ({onNavigate}:{onNavigate:any}) => {
  // Get all favorite room IDs from all users
  const [data, setData] = useState<any>([]);
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    (async () => {
      let data = await getUserSavedPropertiesAPI(user?.userId as unknown as number,currentPage);      
      setTotalPages(data?.propertyCount)
      setData(data?.favourites)
    })();
  }, [user?.userId,currentPage])

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Properties</h2>
      {data?.length === 0 && <div className="text-gray-500 p-6 text-center">No favourite property found.</div>}
      <SavedProperties properties={data} onNavigate={onNavigate} />
      <div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
      </div>
    </div>
  );
}

export default SavedPropertiesTab

