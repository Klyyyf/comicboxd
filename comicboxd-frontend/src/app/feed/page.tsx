"use client";

import LatestNew from "@/src/components/LatestNews";
import UserComicsCarousel from "@/src/components/User/UserComicsList";
// import UserLastReviews from "@/src/components/User/UserLastReviews"; // Removido por enquanto
import StarRating from "@/src/components/StarRating"; // Verifique se o caminho está certo
import { comicService } from "@/src/services/comicService";
import { reviewService } from "@/src/services/ReviewService";
import { Comic, Review } from "@/src/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { UserPlus } from "lucide-react";

export default function FeedPage() {
    const [comics, setComics] = useState<Comic[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loadingComics, setLoadingComics] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false); // Novo estado para feed vazio

    useEffect(() => {
        const loadData = async () => {
            // 1. Carregar HQs (Mantido igual)
            try {
                const comicsData = await comicService.getAll();
                setComics(comicsData);
            } catch (err) {
                toast.error("Erro ao carregar HQs");
            } finally {
                setLoadingComics(false);
            }

            // 2. Carregar o FEED (Mudança aqui)
            try {
                // Trocamos getReviewsByUser() por getFeed(0)
                const feedData = await reviewService.getFeed(0);

                // O Spring retorna um objeto Page, o conteúdo está em .content
                if (feedData.content && feedData.content.length > 0) {
                    setReviews(feedData.content);
                } else {
                    setIsEmpty(true);
                }
            } catch (err) {
                console.error(err);
                toast.error("Erro ao carregar o feed");
            } finally {
                setLoadingReviews(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className="container mx-auto py-10 px-4">
            {/* 1. Carrossel de HQs (Mantido) */}
            {loadingComics ? (
                <div className="text-center p-10">Carregando HQs...</div>
            ) : (
                <UserComicsCarousel comics={comics} />
            )}

            {/* 2. Área do Feed (Review Timeline) */}
            <div className="mt-12 mb-12">
                <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                    Atividade Recente
                </h3>

                {loadingReviews ? (
                    <div className="text-center p-6 text-gray-400">Carregando feed...</div>
                ) : isEmpty ? (
                    // Estado Vazio (Se não seguir ninguém)
                    <div className="flex flex-col items-center justify-center py-16 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
                        <UserPlus size={48} className="text-purple-500 mb-4" />
                        <h4 className="text-xl font-bold text-white">Seu feed está silencioso</h4>
                        <p className="text-gray-400 mt-2 text-center max-w-md">
                            Siga outros usuários para ver as reviews deles aqui.
                        </p>
                    </div>
                ) : (
                    // Lista de Reviews do Feed
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="flex gap-4 p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-purple-500/30 transition-all"
                            >
                                {/* Capa da HQ */}
                                <div className="relative w-[80px] h-[120px] shrink-0 rounded overflow-hidden shadow-lg">
                                    <Image
                                        src={review.coverUrl || "/placeholder.jpg"}
                                        alt="Capa"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Conteúdo do Review */}
                                <div className="flex flex-col flex-1 min-w-0">
                                    {/* Cabeçalho com Link do Perfil */}
                                    <div className="flex items-center gap-2 mb-1">
                                        <Link
                                            href={`/feed/profile/${review.userId}`}
                                            className="text-sm font-bold text-purple-400 hover:text-purple-300 hover:underline"
                                        >
                                            {review.username}
                                        </Link>
                                        <span className="text-xs text-gray-500">• avaliou</span>
                                    </div>

                                    <h4 className="text-lg font-bold text-white leading-tight">
                                        {review.comicName}
                                    </h4>

                                    <div className="my-1">
                                        <StarRating rating={review.rating} />
                                    </div>

                                    <p className="text-gray-300 text-sm mt-2 bg-black/20 p-3 rounded-lg">
                                        "{review.comment}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}