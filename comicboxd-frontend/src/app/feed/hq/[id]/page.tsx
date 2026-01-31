"use client";

import { comicService } from "@/src/services/comicService";
import { Comic, Review } from "@/src/types";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Heart, MessageSquarePlus, ChevronLeft } from "lucide-react";
import ReviewDialog from "@/src/components/User/ReviewDialog"; // <--- 1. IMPORT NOVO
import ReviewList from "@/src/components/User/ReviewList";
import { reviewService } from "@/src/services/ReviewService";

export default function ComicDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [comic, setComic] = useState<Comic | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  // 2. NOVO ESTADO PARA O MODAL
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const fetchReviews = useCallback(async () => {
    if (!id) return;
    try {
      // CORREÇÃO: Usar o método que busca POR HQ, não por ID da review
      const dataReviews = await reviewService.getReviewsByComic(id as string);
      setReviews(dataReviews);
    } catch (error) {
      console.error("Erro ao atualizar reviews", error);
    }
  }, [id]);

  useEffect(() => {
    async function loadData() {
      if (!id) return;

      try {
        setLoading(true);
        // Busca a HQ
        const dataComic = await comicService.getById(id as string);
        setComic(dataComic);

        // Busca as Reviews (usando a função que criamos acima)
        await fetchReviews();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        alert("HQ não encontrada!");
        router.push("/feed");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, router, fetchReviews]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!comic) return null;

  return (
    <div className="container mx-auto px-4 py-8 text-slate-300">
      {/* Botão Voltar */}
      <Link
        href="/feed"
        className="inline-flex items-center hover:text-blue-600 mb-6 font-medium transition-colors"
      >
        <ChevronLeft size={20} className="mr-1" />
        Voltar para o Feed
      </Link>

      <div className="flex flex-col md:flex-row gap-8 p-6 rounded-xl shadow-sm">
        {/* === LADO ESQUERDO: CAPA (POSTER) === */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
          <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-lg ">
            {comic.coverUrl ? (
              <img
                src={comic.coverUrl}
                alt={comic.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                Sem Capa
              </div>
            )}
          </div>
        </div>

        {/* === LADO DIREITO: INFORMAÇÕES E AÇÕES === */}
        <div className="flex-1 flex flex-col sm:flex-row gap-6">
          {/* COLUNA DE TEXTO */}
          <div className="flex-1 flex flex-col">
            <div className="mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-blue-900 text-blue-100">
                {comic.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 leading-tight text-white">
              {comic.title}
            </h1>

            <div className="prose max-w-none leading-relaxed mb-8 text-slate-300">
              <h3 className="text-lg font-bold mb-2 text-white">Sinopse</h3>
              <p>
                {comic.description ||
                  "Nenhuma descrição disponível para esta HQ."}
              </p>
            </div>

            <div className="mt-auto pt-6 grid grid-cols-2 gap-4 text-sm border-t border-slate-700">
              <div>
                <span className="block font-bold text-white">Lançamento</span>
                <span>
                  {comic.releaseDate
                    ? new Date(comic.releaseDate).toLocaleDateString("pt-BR")
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* COLUNA DE BOTÕES */}
          <div className="min-w-[160px] flex flex-row sm:flex-col gap-3 justify-start pt-2 border-t sm:border-t-0 border-slate-700 mt-4 sm:mt-0 pt-4 sm:pt-0">
            {/* Botão Like */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex-1 sm:flex-none group flex items-center justify-center sm:justify-start gap-3 p-3 rounded-lg transition-all border sm:border-transparent border-slate-700 hover:bg-slate-800 active:scale-95"
            >
              <div className="relative">
                <Heart
                  size={28}
                  className={`transition-all duration-200 ${
                    isLiked
                      ? "fill-red-500 text-red-500 scale-110"
                      : "text-gray-400 group-hover:text-red-500 group-hover:scale-110"
                  }`}
                />
              </div>
              <span
                className={`font-semibold ${isLiked ? "text-red-500" : "text-gray-500 group-hover:text-red-500"}`}
              >
                {isLiked ? "Curtido" : "Curtir"}
              </span>
            </button>

            {/* Botão Review */}
            <button
              // 3. AÇÃO DE ABRIR O MODAL
              onClick={() => setIsReviewOpen(true)}
              className="flex-1 sm:flex-none group flex items-center justify-center sm:justify-start gap-3 p-3 rounded-lg transition-all border sm:border-transparent border-slate-700 hover:bg-slate-800 active:scale-95"
            >
              <MessageSquarePlus
                size={28}
                className="text-gray-400 group-hover:text-blue-600 transition-transform duration-300 group-hover:-translate-y-1"
              />
              <span className="font-semibold text-gray-500 group-hover:text-blue-600">
                Avaliar
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. RENDERIZAÇÃO DO MODAL */}
      <ReviewDialog
        isOpen={isReviewOpen}
        onClose={setIsReviewOpen}
        comicId={comic.id}
        onSuccess={() => {
          console.log("Review criada! (Opcional: Recarregar dados)");
        }}
      />
      <ReviewList reviews={reviews} />
    </div>
  );
}
