"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies";
import { CiSearch } from "react-icons/ci";

export default function Header() {
  const router = useRouter();

  const menuItem = "cursor-pointer hover:text-gray-100 transition";

  return (
    <nav className="flex gap-8 p-2 items-center justify-around relative z-10">
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

      <ul className="flex gap-4 font-semibold tracking-widest uppercase text-gray-300">
        <li className={menuItem}>
          <Link href="/login">LOGIN</Link>
        </li>

        <li className={menuItem}>
          <Link href="/register">REGISTRO</Link>
        </li>
      </ul>

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
