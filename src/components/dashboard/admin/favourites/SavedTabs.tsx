import { useState, useEffect } from "react";
import { getSavedPropertiesAPI } from "../../api/user/getSavedPropertiesAPI";
import Pagination from "../../../common/Pagination";
import { SavedProperties } from "./SavedProperties";

const SavedTab = ({ onNavigate }: { onNavigate: any }) => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    (async () => {
      let data = await getSavedPropertiesAPI(currentPage);
      setTotalPages(data?.propertyCount)
      setData(data?.favourites)
    })()

  }, [currentPage])

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved properties </h2>
      {data?.length === 0 && <div className="text-gray-500 p-6 text-center">No saved property found.</div>}
      <SavedProperties properties={data} onNavigate={onNavigate} />
      <div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
      </div>
    </div>
  );
}

export default SavedTab
