type StarRatingProps = {
  rating: number;
  max?: number;
};

export default function StarRating({ rating, max = 5 }: StarRatingProps) {
  return (
    <div className="flex gap-1 mt-1">
      {Array.from({ length: max }).map((_, index) => (
        <span
          key={index}
          className={index < rating ? "text-yellow-400" : "text-gray-600"}
        >
          ★
        </span>
      ))}
    </div>
  );
}
