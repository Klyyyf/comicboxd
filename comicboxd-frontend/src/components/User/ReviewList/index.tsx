import { Review } from "@/src/types";
import Image from "next/image";
import ReviewCard from "../ReviewCard";

type ReviewListProps = {
  reviews: Review[];
};

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className=" w-180  text-slate-300 mt-10 p-4 text-[15px]  flex flex-col">
      <h1 className="text-3xl font-extrabold border-b border-b-slate-400/50">
        Reviews
      </h1>
      {reviews.map((review) => (
        <ReviewCard
          username={review.username}
          rating={review.rating}
          comment={review.comment}
          key={review.id}
        />
      ))}
    </div>
  );
}
