"use client";

import { useEffect, useState } from "react";
import Container from "../../components/Container";
import Header from "../../components/Header";
import { comicService } from "@/src/services/comicService";
import { Comic } from "@/src/types";
import ComicsList from "@/src/components/Admin/ComicsList";
import CreateComicDialog from "@/src/components/Admin/CreateComicDialog";

export default function AdminPage() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadComics() {
    try {
      setLoading(true);
      const data = await comicService.getAll();
      setComics(data);
    } catch (error) {
      console.error("Erro ao carregar HQs", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComics();
  }, []);

  async function handleDelete(id: number) {
    if (confirm("Tem certeza que deseja excluir esta HQ?")) {
      try {
        await comicService.delete(id);
        setComics((prev) => prev.filter((comic) => comic.id !== id));
        alert("HQ deletada com sucesso!");
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
              <h1 className="text-3xl font-bold text-green-500">
                Painel Administrativo
              </h1>
              <p className="text-gray-400 mt-1">Gerencie o catálogo de HQs</p>
            </div>
            <CreateComicDialog onSuccess={loadComics} />
          </div>

          <ComicsList
            comics={comics}
            loading={loading}
            onDelete={handleDelete}
          />
        </main>
      </Container>
    </div>
  );
}
