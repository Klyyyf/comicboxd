"use client"; // Necessário pois usa useState e useEffect

import UserComicsCarousel from "@/src/components/User/UserComicsList";
import { comicService } from "@/src/services/comicService";
import { Comic } from "@/src/types";
import { useEffect, useState } from "react";

export default function FeedPage() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadComics() {
    try {
      const data = await comicService.getAll();
      setComics(Array.isArray(data) ? data : (data as any).content || []);
    } catch (error) {
      console.error("Error ao carregar as HQS", error);
    } finally {
      setLoading(false);
    }
  }
  -useEffect(() => {
    loadComics();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl  text-gray-300 font-bold mb-8 pl-4 border-l-4 border-yellow-600">
        Destaques da Semana
      </h1>

      {loading ? (
        <div className="text-center p-10">Carregando HQs...</div>
      ) : (
        <UserComicsCarousel comics={comics} />
      )}
    </div>
  );
}
