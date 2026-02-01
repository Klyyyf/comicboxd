"use client";

import { Review } from "@/src/types";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useCallback } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import StarRating from "../../StarRating";

type UserLastReviewsProps = {
  reviews: Review[];
};

export default function UserLastReviews({ reviews }: UserLastReviewsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  if (reviews.length === 0) {
    return <div className="text-gray-500">Nenhuma HQ encontrada.</div>;
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      <h1 className="text-3xl text-gray-300 font-bold mb-8 pl-4 border-l-4 border-yellow-600 mt-15">
        Suas ultimas reviews
      </h1>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-6 py-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 pl-6"
            >
              <div className="flex flex-col h-full group">
                <Link
                  href={`/feed/hq/${review.id}`}
                  className="block overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative aspect-[2/3] w-full bg-gray-800">
                    <img
                      src={review.coverUrl}
                      alt={review.comicName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                  </div>
                </Link>

                <div className="pt-3">
                  <h3 className="font-bold text-base text-gray-300 truncate">
                    {review.comicName}
                  </h3>

                  <StarRating rating={review.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-12 z-10 text-gray-500 hover:text-gray-200"
      >
        <MdNavigateBefore size={40} />
      </button>

      <button
        onClick={scrollNext}
        className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-12 z-10 text-gray-500 hover:text-gray-200"
      >
        <MdNavigateNext size={40} />
      </button>
    </div>
  );
}
