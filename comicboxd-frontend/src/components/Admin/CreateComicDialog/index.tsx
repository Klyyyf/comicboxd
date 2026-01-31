"use client";

import { useState } from "react";
import { comicService } from "@/src/services/comicService";
import { CreateComicDTO } from "@/src/types";

// UI Components do Dialog
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, Loader2 } from "lucide-react";
import { AdminInput, AdminTextarea } from "../Forms";

interface Props {
  onSuccess: () => void;
}

export default function CreateComicDialog({ onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialFormState = {
    title: "",
    description: "",
    category: "",
    releaseDate: "",
    coverUrl: "",
    authors: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  // Um handler genérico para Input e Textarea
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: CreateComicDTO = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        releaseDate: formData.releaseDate,
        coverUrl: formData.coverUrl,
        authorNames: formData.authors
          .split(",")
          .map((n) => n.trim())
          .filter((n) => n !== ""),
      };

      await comicService.create(payload);
      alert("HQ Cadastrada com sucesso!");

      setOpen(false);
      setFormData(initialFormState);
      onSuccess();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
          <PlusCircle size={20} /> Nova HQ
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] bg-slate-900 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle>Cadastrar Nova HQ</DialogTitle>
          <DialogDescription className="text-slate-400">
            Preencha os dados da HQ.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <AdminInput
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <AdminInput
              label="Categoria"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
            <AdminInput
              label="Publicação"
              name="releaseDate"
              type="date"
              value={formData.releaseDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <AdminInput
            label="Autores (separados por vírgula)"
            name="authors"
            value={formData.authors}
            onChange={handleInputChange}
            placeholder="Ex: Neil Gaiman, Alan Moore"
          />

          <AdminTextarea
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />

          <AdminInput
            label="URL da Capa"
            name="coverUrl"
            value={formData.coverUrl}
            onChange={handleInputChange}
            placeholder="http://..."
          />

          <DialogFooter className="mt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 font-bold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                </>
              ) : (
                "Cadastrar HQ"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
