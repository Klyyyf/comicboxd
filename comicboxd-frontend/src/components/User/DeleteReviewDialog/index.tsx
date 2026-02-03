"use client";

import { useState } from "react";
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

import { Trash2, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

interface Props {
  reviewId: number;
  onSuccess: () => void;
}

export default function DeleteReviewDialog({ reviewId, onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    try {
      await reviewService.delete(reviewId.toString());
      setOpen(false);
      onSuccess();
    } catch (error) {
      toast.error("Erro ao excluir review");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="  hover:text-white transition cursor-pointer">
          <Trash2 size={18} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] bg-slate-900 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle>Excluir review</DialogTitle>
          <DialogDescription className="text-slate-400">
            Tem certeza que deseja excluir esta review?
            <br />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
            className="text-slate-900"
          >
            Cancelar
          </Button>

          <Button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Excluindo...
              </>
            ) : (
              "Excluir"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
