"use client";

import { useState } from "react";
import { Star } from "lucide-react";

// Importando componentes do Shadcn/UI
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { reviewService } from "@/src/services/ReviewService";
import { ReviewDTO } from "@/src/types"; // Ajuste o import se necessário

interface ReviewDialogProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  comicId: number;
  onSuccess: () => void;
}

export default function ReviewDialog({
  isOpen,
  onClose,
  comicId,
  onSuccess,
}: ReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  // Removi o state 'review' que não estava sendo usado

  async function handleSubmit() {
    if (rating === 0) {
      alert("Por favor, selecione uma nota de 1 a 5 estrelas.");
      return;
    }

    setLoading(true);
    try {
      await reviewService.create({
        comicId: comicId,
        rating,
        comment,
      });
      alert("Avaliação enviada com sucesso!");
      onSuccess();
      onClose(false);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar avaliação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* 1. Mudei o bg-white para bg-slate-900 (Fundo escuro)
          2. Adicionei border-slate-800 (Borda sutil)
      */}
      <DialogContent className="sm:max-w-[500px] bg-slate-900 border border-slate-800 shadow-2xl">
        <DialogHeader>
          {/* Título Branco */}
          <DialogTitle className="text-white text-xl">Avaliar HQ</DialogTitle>
          <DialogDescription className="text-slate-400">
            Dê uma nota e conte o que você achou desta história.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* --- ESTRELAS (Rating) --- */}
          <div className="flex flex-col items-center gap-2">
            <Label className="text-slate-400 font-semibold uppercase text-xs tracking-wider">
              Sua Nota
            </Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none p-1"
                >
                  <Star
                    size={32}
                    className={`transition-colors duration-200 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400" // Estrela Cheia
                        : "text-slate-700 fill-slate-900/50" // Estrela Vazia (Escura agora)
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="h-5 text-sm font-medium text-yellow-500 min-h-[20px]">
              {hoverRating > 0
                ? `${hoverRating} Estrelas`
                : rating > 0
                  ? `${rating} Estrelas`
                  : ""}
            </span>
          </div>

          {/* --- TEXTAREA (Comentário) --- */}
          <div className="grid gap-2">
            <Label htmlFor="comment" className="text-slate-300">
              Seu Comentário
            </Label>
            {/* Textarea Dark Mode:
                - bg-slate-950 (Fundo bem escuro)
                - border-slate-700 (Borda cinza escuro)
                - text-slate-100 (Texto claro)
            */}
            <Textarea
              id="comment"
              placeholder="Escreva sua opinião aqui..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-none h-32 bg-slate-950 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {/* Botão Cancelar Dark */}
          <Button
            variant="outline"
            onClick={() => onClose(false)}
            disabled={loading}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent"
          >
            Cancelar
          </Button>

          {/* Botão Salvar (Azul vibrante) */}
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold border-none"
          >
            {loading ? "Enviando..." : "Salvar Avaliação"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
