"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../services/api";
import Container from "../../../components/Container";
import Header from "../../../components/Header";
import { User, Mail, LogOut, Edit2, Save, X } from "lucide-react";

interface UserProfile {
  id: number;
  nome: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Controle do modo edição

  // Estados para os campos do formulário
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const response = await api.get("/users/me");
      setUser(response.data);
      setEditName(response.data.nome);
      setEditEmail(response.data.email);
    } catch (error) {
      console.error("Erro ao carregar perfil", error);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      const response = await api.put("/users/me", {
        nome: editName,
        email: editEmail,
      });

      setUser(response.data);
      setIsEditing(false); // Sai do modo edição
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar", error);
      alert("Erro ao atualizar perfil. Tente novamente.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("comicboxd.token");
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="animate-pulse text-green-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Container>
        <main className="py-10 max-w-2xl mx-auto px-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden relative">
            {/* Botão de Editar (Topo Direita) */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-green-500 transition"
                title="Editar Perfil"
              >
                <Edit2 size={20} />
              </button>
            )}

            {/* Header do Card */}
            <div className="p-6 border-b border-slate-800 flex items-center gap-4 bg-slate-900/50">
              <div className="h-20 w-20 rounded-full bg-slate-800 border-2 border-green-500 flex items-center justify-center text-2xl font-bold text-green-500 select-none">
                {user?.nome?.substring(0, 2).toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  {isEditing ? "Editando Perfil..." : user?.nome}
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Membro do ComicBoxd
                </p>
              </div>
            </div>

            <div className="p-6 grid gap-6">
              {/* Campo: Nome */}
              <div className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-800">
                <div className="p-2 bg-green-500/10 rounded-full">
                  <User className="text-green-500" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                    Nome de Usuário
                  </p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:border-green-500 focus:outline-none"
                    />
                  ) : (
                    <p className="font-medium text-lg">{user?.nome}</p>
                  )}
                </div>
              </div>

              {/* Campo: Email */}
              <div className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-800">
                <div className="p-2 bg-green-500/10 rounded-full">
                  <Mail className="text-green-500" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                    Email
                  </p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:border-green-500 focus:outline-none"
                    />
                  ) : (
                    <p className="font-medium text-lg">{user?.email}</p>
                  )}
                </div>
              </div>

              {/* Botões de Ação (Salvar/Cancelar ou Logout) */}
              {isEditing ? (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                  >
                    <Save size={20} /> Salvar Alterações
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditName(user?.nome || "");
                      setEditEmail(user?.email || "");
                    }}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-medium"
                  >
                    <X size={20} /> Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-all duration-200 font-medium"
                >
                  <LogOut size={20} />
                  Sair da Conta
                </button>
              )}
            </div>
          </div>
        </main>
      </Container>
    </div>
  );
}
