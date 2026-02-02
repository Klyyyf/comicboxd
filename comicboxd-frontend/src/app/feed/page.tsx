"use client";

import LatestNew from "@/src/components/LatestNews";
import LatestNews from "@/src/components/LatestNews";
import UserComicsCarousel from "@/src/components/User/UserComicsList";
import UserLastReviews from "@/src/components/User/UserLastReviews";
import { comicService } from "@/src/services/comicService";
import { reviewService } from "@/src/services/ReviewService";
import { Comic, Review } from "@/src/types";
import { useEffect, useState } from "react";

export default function FeedPage() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingComics, setLoadingComics] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const comicsData = await comicService.getAll();
        setComics(comicsData);
      } catch (err) {
        console.error("Erro ao carregar HQs", err);
      } finally {
        setLoadingComics(false);
      }

      try {
        const reviewsData = await reviewService.getReviewsByUser();
        setReviews(reviewsData);
      } catch (err) {
        console.error("Erro ao carregar reviews", err);
      } finally {
        setLoadingReviews(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {loadingComics ? (
        <div className="text-center p-10">Carregando HQs...</div>
      ) : (
        <>
          <UserComicsCarousel comics={comics} />

          {loadingReviews ? (
            <div className="text-center p-6 text-gray-400">
              Carregando reviews...
            </div>
          ) : (
            <UserLastReviews reviews={reviews} />
          )}
        </>
      )}
    </div>
  );
}
