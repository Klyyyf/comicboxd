"use client";

import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { usePathname } from "next/navigation";
import Header from "./Header";
import UserHeader from "./User/UserHeader";

export default function MainNavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname(); // Monitora a mudança de URL

    useEffect(() => {
        // Toda vez que a rota mudar ou a página carregar, checamos o token
        const cookies = parseCookies();

        // Se o token existe, está logado
        if (cookies["comicboxd.token"]) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [pathname]); // O [pathname] garante que ele reavalie ao navegar

    if (pathname === "/") {
        return null;
    }

    // Retorna o header correto baseado no estado
    return isLoggedIn ? <UserHeader /> : <Header />;
}