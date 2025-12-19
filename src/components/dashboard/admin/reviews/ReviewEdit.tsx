import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../../../../context/AuthContext';
import { getReviewAPI } from '../../api/admin/reviews/getReviewAPI';
import { Forward } from 'lucide-react';
import { updateReviewAPI } from '../../api/admin/reviews/updateReviewAPI';

interface Review {
    content: string;
    rating: string;
}

const initialReview: Review = {
    content: "",
    rating: '',
};

export default function ReviewEdit({ reviewId, setOpenEdit, setReload }: { reviewId: string, setOpenEdit: any, setReload: any }) {
    const [review, setReview] = useState<any>({ ...initialReview });
    const [status, setStatus] = useState<string | null>(null);
    const { isAuthenticated } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setReview((prev: any) => {

            return {
                ...prev,
                [name]: type === 'number' ? Number(value) : value
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Sending...");
        console.log({ ...review, PropertyId: reviewId });
        try {
            if (!isAuthenticated) {
                toast("Please login first")
                return;
            }
            let result = await updateReviewAPI(reviewId, {
                ...review
            });

            if (result) {
                setStatus("Review updated!");
                setReview(initialReview);
                toast("Review updated!");
                setOpenEdit(false);
                setReload((prv: any) => prv + 1)
            } else {
                toast("Error! Review update failed!")
            }

        } catch (error) {
            toast("Error! Review not updated!");
            console.log(error);
        }
    };

    useEffect(() => {
        (async () => {
            const { review } = await getReviewAPI(reviewId);
            setReview(review)
        })();
    }, [reviewId]);

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto bg-white p-6 rounded-lg shadow space-y-6"
        >
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 flex justify-between">Edit Review <span><Forward onClick={() => setOpenEdit(false)} /> </span> </label>
                <textarea
                    name="content"
                    value={review.content}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <input
                    type='number'
                    name="rating"
                    value={review.rating}
                    onChange={handleChange}
                    min={1}
                    max={5}
                    className="w-20 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="flex items-end space-x-4">
                {status && (
                    <div className={status === "Review submitted!" ? 'text-green-500' : 'text-blue-500'}>
                        {status}
                    </div>
                )}
                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
                >
                    Update Review
                </button>
            </div>
        </form>
    );
}