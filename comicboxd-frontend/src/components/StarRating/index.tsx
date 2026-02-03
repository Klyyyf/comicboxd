interface StarRatingProps {
  rating: number;
  editable?: boolean;
  onChange?: (value: number) => void;
}

export default function StarRating({
  rating,
  editable = false,
  onChange,
}: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!editable}
          onClick={() => editable && onChange?.(star)}
          className={`text-xl ${
            star <= rating ? "text-yellow-400" : "text-gray-500"
          } ${editable ? "cursor-pointer" : "cursor-default"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
