"use client";

import { useEffect, useState } from "react";

import api from "../../services/api";
import Container from "../../components/Container";
import Header from "../../components/Header";
import CreateComicDialog from "../../components/Admin/CreateComicDialog";

// Interface
interface Comic {
    id: number;
    title: string;
    category: string;
    description: string;
}

export default function AdminPage() {
    const [comics, setComics] = useState<Comic[]>([]);
    const [loading, setLoading] = useState(true);

    // Função para carregar HQs
    async function loadComics() {
        try {
            setLoading(true);
            const response = await api.get("/comics?size=50");
            setComics(response.data.content);
        } catch (error) {
            console.error("Erro ao carregar HQs", error);
        } finally {
            setLoading(false);
        }
    }

    // Carrega ao abrir a tela
    useEffect(() => {
        loadComics();
    }, []);

    // Função de Deletar
    async function handleDelete(id: number) {
        if (confirm("Tem certeza que deseja excluir esta HQ?")) {
            try {
                await api.delete(`/comics/${id}`);
                alert("HQ deletada com sucesso!");
                loadComics(); // Atualiza a lista
            } catch (error) {
                console.error("Erro ao deletar", error);
                alert("Erro ao deletar. Verifique se existem autores vinculados.");
            }
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Container>
                <Header />

                <main className="py-10">
                    <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-green-500">Painel Administrativo</h1>
                            <p className="text-gray-400 mt-1">Gerencie o catálogo de HQs</p>
                        </div>

                        {/* Botão de cadastro conectado com a função de recarregar */}
                        <CreateComicDialog onSuccess={loadComics} />
                    </div>

                    {loading ? (
                        <div className="text-center p-10 text-gray-500">Carregando...</div>
                    ) : (
                        <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden shadow-xl">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-800 text-gray-400 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Título</th>
                                    <th className="px-6 py-4">Categoria</th>
                                    <th className="px-6 py-4 text-center">Ações</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800 text-sm">
                                {comics.map((comic) => (
                                    <tr key={comic.id} className="hover:bg-slate-800/50 transition">
                                        <td className="px-6 py-4 text-gray-400">#{comic.id}</td>
                                        <td className="px-6 py-4 font-medium">{comic.title}</td>
                                        <td className="px-6 py-4">
                        <span className="bg-slate-700 text-green-400 text-xs px-2 py-1 rounded-full border border-slate-600">
                          {comic.category}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleDelete(comic.id)}
                                                className="text-red-400 hover:text-red-300 hover:underline transition"
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            {comics.length === 0 && (
                                <div className="p-10 text-center text-gray-500">
                                    Nenhuma HQ encontrada.
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </Container>
        </div>
    );
}