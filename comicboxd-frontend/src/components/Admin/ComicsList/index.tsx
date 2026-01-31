"use client";

import { Comic } from "@/src/types";

interface Props {
  comics: Comic[];
  loading: boolean;
  onDelete: (id: number) => void;
}

export default function ComicsList({ comics, loading, onDelete }: Props) {
  if (loading) {
    return (
      <div className="text-center p-10 text-gray-500">
        Carregando catálogo...
      </div>
    );
  }

  if (comics.length === 0) {
    return (
      <div className="bg-slate-900 rounded-lg border border-slate-800 p-10 text-center text-gray-500 shadow-xl">
        Nenhuma HQ encontrada.
      </div>
    );
  }

  return (
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
                  onClick={() => onDelete(comic.id)}
                  className="text-red-400 hover:text-red-300 hover:underline transition"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
