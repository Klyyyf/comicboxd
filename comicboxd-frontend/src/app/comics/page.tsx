"use client";

import { useEffect, useState } from "react";
import { ComicService, ComicDTO, Page } from "@/src/services/api";
import UserHeader from "../../components/User/UserHeader";
import Link from "next/link";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";

export default function HQsPage() {
    const [data, setData] = useState<Page<ComicDTO> | null>(null);
    const [loading, setLoading] = useState(true);

    // Estados de filtro, paginação e busca
    const [page, setPage] = useState(0);
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const [activeSearch, setActiveSearch] = useState("");

    // Função que busca no backend
    async function loadComics() {
        setLoading(true);
        try {
            // Chama o wrapper enviando página, categoria E a busca ativa
            const response = await ComicService.findAll(
                page,
                category || undefined,
                activeSearch || undefined
            );
            setData(response);
        } catch (error) {
            console.error("Erro ao buscar HQs", error);
        } finally {
            setLoading(false);
        }
    }

    // Recarrega sempre que mudar a página, a categoria ou confirmar uma busca
    useEffect(() => {
        loadComics();
    }, [page, category, activeSearch]);

    // Dispara a busca
    function handleSearch() {
        setActiveSearch(search);
        setPage(0);
        setCategory(""); // Limpa categoria ao buscar por nome para não conflitar
    }

    // Busca ao apertar Enter
    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    // Função para mudar categoria (limpa a busca)
    function handleCategoryChange(newCategory: string) {
        setCategory(newCategory);
        setPage(0);
        setActiveSearch(""); // Limpa a busca anterior
        setSearch("");       // Limpa o input visual
    }

    return (
        <div className="min-h-screen bg-[#0f1317] text-white">
            <UserHeader />

            <main className="max-w-7xl mx-auto px-4 py-8">

                {/* TOPO: Título, Busca e Filtros */}
                <div className="flex flex-col gap-6 mb-8">

                    {/* Linha Superior: Título + Barra de Pesquisa */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <h1 className="text-3xl font-bold uppercase tracking-wider text-yellow-400">
                            Catálogo de HQs
                        </h1>

                        {/* Barra de Pesquisa */}
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Pesquisar personagem, título..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full bg-gray-800 text-white pl-4 pr-10 py-2 rounded-full border border-gray-700 focus:border-yellow-400 focus:outline-none transition"
                            />
                            <button
                                onClick={handleSearch}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-yellow-400 text-black rounded-full hover:bg-yellow-300 transition"
                            >
                                <CiSearch size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Linha Inferior: Filtros de Categoria */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {["", "MARVEL", "DC", "MANGA", "INDIE"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-4 py-1 rounded-full text-xs font-bold uppercase whitespace-nowrap transition ${
                                    category === cat
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                }`}
                            >
                                {cat === "" ? "Todas" : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* LOADING STATE */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                    </div>
                ) : (
                    <>
                        {/* GRID DE HQS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {data?.content.map((comic) => (
                                <Link
                                    href={`/comics/${comic.id}`}
                                    key={comic.id}
                                    className="group relative flex flex-col gap-2"
                                >
                                    {/* Capa */}
                                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg transition-transform group-hover:scale-105 group-hover:shadow-xl border border-gray-800">
                                        {comic.coverUrl ? (
                                            <Image
                                                src={comic.coverUrl}
                                                alt={comic.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600 font-bold">
                                                {comic.title.substring(0, 2)}
                                            </div>
                                        )}

                                        {/* Badge da Categoria */}
                                        {comic.category && (
                                            <span className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">
                                                {comic.category}
                                            </span>
                                        )}
                                    </div>

                                    {/* Título e Autor */}
                                    <div>
                                        <h3 className="font-bold text-sm text-gray-100 truncate group-hover:text-yellow-400 transition">
                                            {comic.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 truncate">
                                            {comic.authorNames?.join(", ") || "Autor desconhecido"}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Empty State */}
                        {data?.content.length === 0 && (
                            <div className="text-center py-20 text-gray-500">
                                <p className="text-xl">Nenhuma HQ encontrada.</p>
                                {activeSearch && <p className="text-sm mt-2">Termo buscado: "{activeSearch}"</p>}
                            </div>
                        )}

                        {/* PAGINAÇÃO */}
                        {data && data.totalPages > 1 && (
                            <div className="flex justify-center mt-12 gap-4">
                                <button
                                    disabled={data.first}
                                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                                    className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50 hover:bg-gray-700 transition"
                                >
                                    Anterior
                                </button>

                                <span className="px-4 py-2 text-gray-400 font-mono">
                                    Página { (data.number || 0) + 1 } de { data.totalPages || 1 }
                                </span>

                                <button
                                    disabled={data.last}
                                    onClick={() => setPage((p) => p + 1)}
                                    className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50 hover:bg-gray-700 transition"
                                >
                                    Próxima
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}