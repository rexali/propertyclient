import { Edit, Eye, Star, Trash } from "lucide-react";
import ReviewEdit from "./ReviewEdit";
import { useState } from "react";
import { Link } from "react-router-dom";
import { removeReviewAPI } from "../../api/admin/reviews/removeReviewAPI";
import { toast } from "sonner";
import { useAuth } from "../../../../context/AuthContext";

type Review = {
  id: number;
  PropertyId: number;
  UserId: number;
  User?: any;
  content: string;
  rating: number;
  createdAt: Date;
};

interface ReviewListProps {
  reviews: Review[];
  setReload: any
}


export const ReviewList = ({ reviews, setReload }: ReviewListProps) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [reviewId, setReviewId] = useState<any>();
  const { admin } = useAuth();



  async function handleRemoveReview(id: any) {
    const confirm = window.confirm("Want to remove this review really?");
    if (confirm) {
      let result = await removeReviewAPI(id);
      if (result) {
        toast("success");
        setReload((prev: any) => prev + 1)
      }
    }
  }

  function handleEditReview(arg: boolean, id: any) {
    setOpenEdit(arg);
    setReviewId(id)
  }

  if (openEdit) {
    return <ReviewEdit setOpenEdit={setOpenEdit} reviewId={reviewId} setReload={setReload} />
  }

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {reviews?.length === 0 && (
            <li className="p-6 text-center text-gray-500">No reviews found.</li>
          )}
          {reviews
            ?.slice()
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((review, i) => (
              <li key={i + review.PropertyId} className="flex items-start px-6 py-4">
                <div className="flex-shrink-0 mt-1">
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center space-x-2">
                    <Link to={'mailto:' + review?.User?.username} title="Email the reviewer"><span className="font-semibold text-gray-800">{review?.User?.Profile?.name?.split(' ') ?? 'Anonymous'}</span></Link>
                    <span className="text-xs text-gray-500">{new Date(review?.createdAt)?.toLocaleDateString()}</span>
                  </div>
                  {review?.rating &&
                    (<div className="flex items-center mb-1">
                      {[...Array(review?.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review?.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill={i < review?.rating ? "#facc15" : "none"}
                        />
                      ))}
                    </div>)
                  }
                  <p className="text-gray-700 mt-1 text-sm">{review?.content ?? "Hi"}</p>
                </div>
                <div className="flex justify-between items-center space-x-4">
                  {admin?.role === 'admin' && <button type="button" title="Delete property" onClick={() => handleRemoveReview(review.id)}><Trash /></button>}
                  {admin?.role === 'admin' && <button type="button" title="Edit property" onClick={() => handleEditReview(true, review.id)}><Edit /></button>}
                  <Link to={'/properties/' + review.PropertyId} title="View propery"><Eye /></Link>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}