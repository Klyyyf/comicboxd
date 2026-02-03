"use client";

import { Comic } from "@/src/types";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useCallback } from "react";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

type UserComicsCarouselProps = {
  comics: Comic[];
};

export default function UserComicsCarousel({
  comics,
}: UserComicsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (comics.length === 0) {
    return <div className="text-gray-500">Nenhuma HQ encontrada.</div>;
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      <h1 className="text-3xl text-gray-300 font-bold mb-8 pl-4 border-l-4 border-yellow-600">
        Destaques da Semana
      </h1>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-6 py-4">
          {" "}
          {comics.map((comic) => (
            <div
              key={comic.id}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 pl-6"
            >
              <div className="flex flex-col h-full group">
                <Link
                  href={`/feed/hq/${comic.id}`}
                  className="block overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative aspect-[2/3] w-full bg-gray-200">
                    {comic.coverUrl ? (
                      <img
                        src={comic.coverUrl}
                        alt={comic.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 bg-gray-800">
                        Sem Capa
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                </Link>

                <div className="pt-3 ">
                  <h3 className="font-bold text-base text-gray-300  leading-tight truncate">
                    {comic.title}
                  </h3>
                  <p className="text-xs font-semibold text-gray-400 uppercase mt-1">
                    {comic.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute top-1/2 -translate-y-1/2 z-10 
                   p-3 rounded-full shadow-lg  text-gray-500 backdrop-blur-sm transition-all
                   left-2 md:-left-12 lg:-left-16"
      >
        <MdNavigateBefore size={40} className="hover:text-gray-200" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute top-1/2 -translate-y-1/2 z-10 
                    rounded-full shadow-lg  text-gray-500 backdrop-blur-sm transition-all
                   right-2 md:-right-12 lg:-right-16 "
      >
        <MdNavigateNext size={40} className="hover:text-gray-200" />
      </button>
    </div>
  );
}
