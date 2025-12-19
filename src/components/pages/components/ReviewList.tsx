import { Star } from "lucide-react";

type Review = {
  id: number;
  PropertyId: number
  User?: any;
  content: string;
  rating: number;
  createdAt: Date;
};

interface ReviewListProps {
  reviews: Review[];
}


export const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <div className="">
      {/* <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2> */}
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
                    <span className="font-semibold text-gray-800">{review?.User?.Profile?.name ?? 'anonymous'}</span>
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
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}