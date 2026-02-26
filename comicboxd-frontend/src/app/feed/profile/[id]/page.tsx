"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User, UserPlus, UserCheck } from "lucide-react";
import { followService } from "../../../../services/followService";
import { userService } from "../../../../services/userService";

export default function PublicProfile() {
    const params = useParams();
    const userId = Number(params.id);
    const [user, setUser] = useState<any>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [stats, setStats] = useState({ followers: 0, following: 0 });
    const [loading, setLoading] = useState(true);

    // Carregar dados iniciais
    useEffect(() => {
        if (!userId) return;

        const loadData = async () => {
            try {
                // 1. Checar se sigo
                const following = await followService.checkIsFollowing(userId);
                setIsFollowing(following);

                // 2. Carregar stats
                const statistics = await followService.getStats(userId);
                setStats(statistics);

                const userData = await userService.getById(userId);
                setUser(userData);

            } catch (error) {
                console.error("Erro ao carregar perfil", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [userId]);

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                await followService.unfollow(userId);
                setIsFollowing(false);
                setStats(prev => ({ ...prev, followers: prev.followers - 1 }));
            } else {
                await followService.follow(userId);
                setIsFollowing(true);
                setStats(prev => ({ ...prev, followers: prev.followers + 1 }));
            }
        } catch (error) {
            alert("Erro ao realizar ação.");
        }
    };

    if (loading) return <div className="p-8 text-white">Carregando...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 text-white">
            {/* Cabeçalho do Perfil */}
            <div className="flex items-center justify-between bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-800">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-3xl font-bold">
                        {/* Placeholder de Avatar */}
                        <User size={40} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{user?.name || user?.username || "Usuário"}</h1>
                        <p className="text-zinc-400">Entusiasta de HQs</p>

                        <div className="flex gap-4 mt-2 text-sm text-zinc-300">
                            <span><b>{stats.followers}</b> Seguidores</span>
                            <span><b>{stats.following}</b> Seguindo</span>
                        </div>
                    </div>
                </div>

                {/* Botão de Ação */}
                <button
                    onClick={handleFollowToggle}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                        isFollowing
                            ? "bg-zinc-700 hover:bg-red-900/50 hover:text-red-200 text-zinc-300" // Estilo "Seguindo" (Hover vira Unfollow)
                            : "bg-purple-600 hover:bg-purple-700 text-white" // Estilo "Seguir"
                    }`}
                >
                    {isFollowing ? (
                        <>
                            <UserCheck size={20} /> Seguindo
                        </>
                    ) : (
                        <>
                            <UserPlus size={20} /> Seguir
                        </>
                    )}
                </button>
            </div>

            {/* Aqui entrar a lista de reviews desse usuário */}
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Reviews Recentes</h2>
                <p className="text-zinc-500">Lista de reviews virá aqui...</p>
            </div>
        </div>
    );
}