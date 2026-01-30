"use client";

import { useState } from "react";
import api from "@/src/services/api";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";

interface Props {
    onSuccess: () => void;
}

export default function CreateComicDialog({ onSuccess }: Props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        releaseDate: "",
        coverUrl: "",
        authors: "", // Agora vamos tratar isso como NOMES, não IDs
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // PREPARAR O PAYLOAD
            const payload = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                releaseDate: formData.releaseDate,
                coverUrl: formData.coverUrl,

                // MUDANÇA AQUI: Enviamos nomes (Strings) em vez de IDs (Numbers)
                authorNames: formData.authors
                    .split(",")                 // Quebra na vírgula
                    .map((name) => name.trim()) // Remove espaços extras
                    .filter((name) => name !== "") // Remove vazios
            };

            // Envia para o Backend
            await api.post("/comics", payload);

            alert("HQ Cadastrada com sucesso!");

            setOpen(false);
            setFormData({
                title: "",
                description: "",
                category: "",
                releaseDate: "",
                coverUrl: "",
                authors: "",
            });

            onSuccess();

        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar. Verifique o console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
                    <PlusCircle size={20} />
                    Nova HQ
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-slate-900 text-white border-slate-700">
                <DialogHeader>
                    <DialogTitle>Cadastrar Nova HQ</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Preencha os dados da HQ. Autores novos serão criados automaticamente.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4">

                    <div className="grid gap-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="bg-slate-800 border-slate-700"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="category">Categoria</Label>
                            <Input
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="bg-slate-800 border-slate-700"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="releaseDate">Publicação</Label>
                            <Input
                                id="releaseDate"
                                name="releaseDate"
                                type="date"
                                value={formData.releaseDate}
                                onChange={handleInputChange}
                                className="bg-slate-800 border-slate-700"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        {/* Atualizei o Label e o Placeholder para ficar claro */}
                        <Label htmlFor="authors">Nomes dos Autores (separados por vírgula)</Label>
                        <Input
                            id="authors"
                            name="authors"
                            value={formData.authors}
                            onChange={handleInputChange}
                            className="bg-slate-800 border-slate-700"
                            placeholder="Ex: Neil Gaiman, Alan Moore"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="bg-slate-800 border-slate-700 min-h-[100px]"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="coverUrl">URL da Capa</Label>
                        <Input
                            id="coverUrl"
                            name="coverUrl"
                            value={formData.coverUrl}
                            onChange={handleInputChange}
                            className="bg-slate-800 border-slate-700"
                            placeholder="http://..."
                        />
                    </div>

                    <DialogFooter className="mt-4">
                        <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
                            {loading ? "Salvando..." : "Cadastrar HQ"}
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    );
}