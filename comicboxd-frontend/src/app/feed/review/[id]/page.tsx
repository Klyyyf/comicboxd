"use client";

import { reviewService } from "@/src/services/ReviewService";
import { Review } from "@/src/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewPage() {
  const { id } = useParams<{ id: string }>();

  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReview() {
      if (!id) return;

      try {
        const response = await reviewService.getReviewById(id);
        setReview(response);
      } catch (error) {
        console.error("Erro ao carregar review:", error);
      } finally {
        setLoading(false);
      }
    }

    loadReview();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-gray-400">Carregando review...</div>;
  }

  if (!review) {
    return <div className="p-10 text-gray-400">Review não encontrada.</div>;
  }

  return (
    <div className="flex gap-12 max-w-5xl mx-auto p-6">
      <div className="relative w-[270px] h-[400px] rounded-lg overflow-hidden bg-gray-800">
        <Image
          src={review.coverUrl}
          alt={review.comicName}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col gap-3 text-gray-300">
        <span className="text-sm text-gray-400">
          Review by <span className="font-semibold">{review.username}</span>
        </span>

        <h1 className="text-3xl font-bold">{review.comicName}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>⭐ {review.rating}/5</span>
          <span>{review.createAt}</span>
        </div>

        <p className="text-gray-200 leading-relaxed">{review.comment}</p>
      </div>
    </div>
  );
}
