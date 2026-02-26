// src/app/news/page.tsx
"use client";

import LatestNews from "@/src/components/LatestNews";
import Header from "@/src/components/Header";

export default function NewsPage() {
    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-8 border-b border-gray-700 pb-4">
                <h1 className="text-3xl font-bold text-white">Últimas Notícias</h1>
                <p className="text-gray-400 mt-2">
                    Fique por dentro das novidades do mundo dos quadrinhos.
                </p>
            </div>

            {/* O componente que já existia */}
            <LatestNews />
        </div>
    );
}