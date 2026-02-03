"use client";

import { useState, useEffect } from "react";
import { Review } from "@/src/types";
import { reviewService } from "@/src/services/ReviewService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import StarRating from "@/src/components/StarRating";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

interface Props {
  review: Review;
  onSuccess: () => void;
}

export default function EditReviewDialog({ review, onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await reviewService.update(review.id.toString(), {
        rating,
        comment,
      });

      setOpen(false);
      onSuccess();
    } catch (error) {
      toast.error("Erro ao atualizar review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="hover:text-white transition cursor-pointer"
          aria-label="Editar review"
        >
          <FaEdit />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] bg-slate-900 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle>Editar review</DialogTitle>
          <DialogDescription className="text-slate-400">
            Atualize sua avaliação e comentário.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-300">Nota</label>
            <StarRating rating={rating} editable onChange={setRating} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-300">Comentário</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 font-bold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar alterações"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
