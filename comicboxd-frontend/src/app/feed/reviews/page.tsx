"use client";

import StarRating from "@/src/components/StarRating";
import { reviewService } from "@/src/services/ReviewService";
import { Review } from "@/src/types";
import Image from "next/image";

import { useEffect, useState } from "react";
import EditReviewDialog from "@/src/components/User/EditReviewDialog";
import DeleteReviewDialog from "@/src/components/User/DeleteReviewDialog";
import { toast } from "react-toastify";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadReviews() {
    try {
      const response = await reviewService.getReviewsByUser();
      setReviews(response);
    } catch (error) {
      toast.error("Erro ao carregar reviews");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  if (loading) {
    return <p className="text-gray-300 p-6">Carregando reviews...</p>;
  }

  return (
    <div className="text-gray-300">
      <h3 className="mt-6  font-semibold border-b-[0.4] border-slate-300 text-lg ">
        Reviews
      </h3>
      <div>
        <ul>
          {reviews.map((review) => (
            <li
              className="flex items-start gap-4 mt-4 p-4 border-b border-slate-300"
              key={review.id}
            >
              <div className="relative w-[100px] h-[150px] rounded-lg shrink-0">
                <Image
                  src={review.coverUrl}
                  alt="HQ cover"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <h3 className="text-2xl font-bold text-white">
                  {review.comicName}
                </h3>
                <span>
                  <StarRating rating={review.rating}></StarRating>
                </span>
                <p className="text-md">{review.comment}</p>
              </div>
              <div className="self-start gap-2 flex">
                <EditReviewDialog review={review} onSuccess={loadReviews} />
                <DeleteReviewDialog
                  reviewId={review.id}
                  onSuccess={loadReviews}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
