import { Star, User as UserIcon } from "lucide-react";

interface ReviewCardProps {
  username: string;
  rating: number;
  comment: string;
  avatarUrl?: string;
}

export default function ReviewCard({
  username,
  rating,
  comment,
  avatarUrl,
}: ReviewCardProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-4 p-4 border-b border-slate-700/50 last:border-0 hover:bg-slate-800/20 transition-colors rounded-lg">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 overflow-hidden flex items-center justify-center">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={username}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserIcon size={20} className="text-slate-400" />
          )}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-slate-200 text-sm">
            {username || "Usuário Anônimo"}
          </h4>

          <div className="flex gap-0.5">
            {stars.map((star) => (
              <Star
                key={star}
                size={14}
                className={`${
                  star <= rating
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-slate-600"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed">{comment}</p>
      </div>
    </div>
  );
}
