import { useEffect, useState } from "react";
import Pagination from "../../../common/Pagination";
import { ReviewList } from "./ReviewList";
import { getReviewsAPI } from "../../api/admin/reviews/getReviewsAPI";
import { useAuth } from "../../../../context/AuthContext";
import { getUserReviewsAPI } from "../../api/admin/reviews/getUserReviewsAPI";


export const ReviewsTab = () => {
  const [reviews, setReviews] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [reload, setReload] = useState(0);
  const user = useAuth();
  const itemsPerPage=10

  useEffect(() => {
    (async () => {
      if (user.admin?.role === 'admin') {
        const { reviews } = await getReviewsAPI(currentPage);
        setTotalPages(Math.ceil(reviews?.reviewCount/itemsPerPage));
        setReviews(reviews?.reviews ?? []);
      } else if (user.user?.role === 'provider') {
        const { data } = await getUserReviewsAPI(user?.user?.userId, currentPage);
        setTotalPages(Math.ceil(reviews?.reviewCount/itemsPerPage));
        setReviews(data?.reviews ?? []);
      }
    })();
  }, [reload,currentPage]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex justify-between">Reviews</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ReviewList reviews={[...reviews]} setReload={setReload} />
      </div><br />
      <div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
      </div>
    </div>
  );
}