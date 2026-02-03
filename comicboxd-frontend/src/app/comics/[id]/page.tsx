"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Heart, MessageSquarePlus, ChevronLeft } from "lucide-react";

import {
  ComicService,
  ReviewService,
  ComicDTO,
  ReviewResponseDTO,
} from "../../../services/api";

import ReviewDialog from "@/src/components/User/ReviewDialog";
import ReviewList from "@/src/components/User/ReviewList";

export default function ComicDetailsPage() {
  const params = useParams();

  const id = params.id ? Number(params.id) : null;

  const router = useRouter();

  const [comic, setComic] = useState<ComicDTO | null>(null);
  const [reviews, setReviews] = useState<ReviewResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const fetchReviews = useCallback(async () => {
    if (!id) return;
    try {
      const dataReviews = await ReviewService.getByComicId(id);
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

        const [comicData, _] = await Promise.all([
          ComicService.findById(id),
          fetchReviews(),
        ]);

        setComic(comicData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, fetchReviews]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] bg-[#0f1317]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!comic)
    return (
      <div className="min-h-screen bg-[#0f1317] text-white flex justify-center items-center">
        <h1>HQ não encontrada.</h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f1317] text-slate-300">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/comics"
          className="inline-flex items-center hover:text-yellow-400 mb-6 font-medium transition-colors"
        >
          <ChevronLeft size={20} className="mr-1" />
          Voltar para o Catálogo
        </Link>

        <div className="flex flex-col md:flex-row gap-8 p-6 rounded-xl shadow-sm bg-gray-900/50 border border-gray-800">
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-lg border border-gray-800">
              {comic.coverUrl ? (
                <img
                  src={comic.coverUrl}
                  alt={comic.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium bg-gray-800">
                  Sem Capa
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col sm:flex-row gap-6">
            {/* COLUNA DE TEXTO */}
            <div className="flex-1 flex flex-col">
              <div className="mb-3">
                {comic.category && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-blue-900 text-blue-100">
                    {comic.category}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold mb-2 leading-tight text-white">
                {comic.title}
              </h1>

              <p className="text-sm text-gray-400 mb-4 font-bold uppercase">
                {comic.authorNames?.join(", ")}
              </p>

              <div className="prose max-w-none leading-relaxed mb-8 text-slate-300">
                <h3 className="text-lg font-bold mb-2 text-yellow-400 uppercase tracking-widest">
                  Sinopse
                </h3>
                <p>
                  {comic.description ||
                    "Nenhuma descrição disponível para esta HQ."}
                </p>
              </div>

              <div className="mt-auto pt-6 grid grid-cols-2 gap-4 text-sm border-t border-slate-700">
                <div>
                  <span className="block font-bold text-gray-500 uppercase">
                    Lançamento
                  </span>
                  <span className="text-white">
                    {comic.releaseDate
                      ? new Date(comic.releaseDate).toLocaleDateString("pt-BR")
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="min-w-[160px] flex flex-row sm:flex-col gap-3 justify-start pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-700 mt-4 sm:mt-0">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex-1 sm:flex-none group flex items-center justify-center sm:justify-start gap-3 p-3 rounded-lg transition-all border sm:border-transparent border-slate-700 hover:bg-slate-800 active:scale-95"
              >
                <Heart
                  size={28}
                  className={`transition-all duration-200 ${
                    isLiked
                      ? "fill-red-500 text-red-500 scale-110"
                      : "text-gray-400 group-hover:text-red-500 group-hover:scale-110"
                  }`}
                />
                <span
                  className={`font-semibold ${isLiked ? "text-red-500" : "text-gray-400 group-hover:text-red-500"}`}
                >
                  {isLiked ? "Curtido" : "Curtir"}
                </span>
              </button>

              <button
                onClick={() => setIsReviewOpen(true)}
                className="flex-1 sm:flex-none group flex items-center justify-center sm:justify-start gap-3 p-3 rounded-lg transition-all border sm:border-transparent border-slate-700 hover:bg-slate-800 active:scale-95"
              >
                <MessageSquarePlus
                  size={28}
                  className="text-gray-400 group-hover:text-yellow-400 transition-transform duration-300 group-hover:-translate-y-1"
                />
                <span className="font-semibold text-gray-400 group-hover:text-yellow-400">
                  Avaliar
                </span>
              </button>
            </div>
          </div>
        </div>

        {comic && (
          <>
            <ReviewDialog
              isOpen={isReviewOpen}
              onClose={setIsReviewOpen}
              comicId={comic.id}
              onSuccess={() => {
                fetchReviews();
                console.log("Review criada!");
              }}
            />
            <div className="mt-8">
              {comic && (
                <>
                  <ReviewDialog
                    isOpen={isReviewOpen}
                    onClose={setIsReviewOpen}
                    comicId={comic.id}
                    onSuccess={() => {
                      fetchReviews();
                      console.log("Review criada!");
                    }}
                  />

                  <div className="mt-8">
                    <ReviewList
                      reviews={reviews.map((review) => ({
                        ...review,

                        comicName: comic.title,
                        coverUrl: comic.coverUrl || "",

                        createdAt: review.createdAt || new Date().toISOString(),

                        username: review.username || "Usuário Anônimo",
                      }))}
                    />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
