"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies";
import { CiSearch } from "react-icons/ci";

export default function Header() {
    const [isLogged, setIsLogged] = useState(false);
    const router = useRouter();

    const menuItem = "cursor-pointer hover:text-gray-100 transition";

    // Verifica se tem token ao carregar a página
    useEffect(() => {
        const { "comicboxd.token": token } = parseCookies();
        setIsLogged(!!token);
    }, []);

    // Função para deslogar
    function handleLogout() {
        destroyCookie(null, "comicboxd.token"); // Apaga o cookie
        setIsLogged(false); // Atualiza o estado visual
        router.push("/"); // Manda pra home
        router.refresh(); // Atualiza a página para garantir que tudo limpou
    }

    return (
        <nav className="flex gap-8 p-2 items-center justify-around relative z-10">
            {/* Logo */}
            <Link href="/">
                <div className="relative h-25 w-50 cursor-pointer">
                    <Image
                        src="/images/comic.png"
                        alt="Logo"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </Link>

            {/* Menu de Navegação */}
            <ul className="flex gap-4 font-semibold tracking-widest uppercase text-gray-300">

                {/* LINKS COMUNS (Aparecem sempre) */}
                <li className={menuItem}>
                    <Link href="/comics">HQS</Link>
                </li>
                <li className={menuItem}>
                    <Link href="/lists">LISTAS</Link>
                </li>

                {/* LOGADO vs DESLOGADO */}
                {isLogged ? (
                    <>
                        <li className={menuItem}>
                            <Link href="/profile">
                                PERFIL
                            </Link>
                        </li>
                        <li className={menuItem}>
                            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 uppercase font-semibold tracking-widest">
                                SAIR
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className={menuItem}>
                            <Link href="/login">LOGIN</Link>
                        </li>
                        <li className={menuItem}>
                            <Link href="/register">CADASTRO</Link>
                        </li>
                    </>
                )}
            </ul>

            {/* Barra de Pesquisa */}
            <div className="relative">
                <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                    type="text"
                    className="bg-gray-200 rounded-lg pl-9 pr-3 py-1 text-sm text-slate-700 focus:outline-none"
                />
            </div>
        </nav>
    );
}