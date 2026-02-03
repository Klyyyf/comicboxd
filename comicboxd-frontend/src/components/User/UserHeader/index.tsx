"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import { IoLogOutOutline, IoLogOutSharp } from "react-icons/io5";

export default function UserHeader() {
  const router = useRouter();
  const menuItem = "cursor-pointer hover:text-gray-100 transition";

  function handleLogout() {
    destroyCookie(null, "comicboxd.token");

    router.push("/");
    router.refresh();
  }

  return (
    <nav className="flex gap-8 p-2 items-center justify-around relative z-10 bg-[#0f1317]">
      <Link href="/feed">
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
          <Link href="/comics">HQS</Link>
        </li>

        <li className={menuItem}>
          <Link href="/feed/reviews">REVIEWS</Link>
        </li>

        <li className={menuItem}>
          <Link href="/feed/profile">PERFIL</Link>
        </li>

        <li className={menuItem}>
          <div
            className="flex items-center justify-center gap-2 cursor-pointer"
            onClick={handleLogout}
          >
            <IoLogOutOutline size={20} />
            <p>Sair</p>
          </div>
        </li>
      </ul>
    </nav>
  );
}
