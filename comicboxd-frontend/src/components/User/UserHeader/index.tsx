import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

export default function UserHeader() {
  const menuItem = "cursor-pointer hover:text-gray-100 transition";
  return (
    <nav className="flex gap-8 p-2 items-center justify-around relative z-10 bg-[#0f1317] ">
      <div className="relative h-25  w-50 ">
        <Image
          src="/images/comic.png"
          alt="Logo"
          fill
          className="object-cover"
        />
      </div>
      <ul className="flex gap-4 font-semibold tracking-widest uppercase text-gray-300 hover:text-gray-100 transition cursor-pointer">
        <ul className="flex gap-4 font-semibold tracking-widest uppercase text-gray-300">
          <li className={menuItem}>
            <Link href="/login">HQS</Link>
          </li>
          <li className={menuItem}>
            <Link href="/register">REVIEWS</Link>
          </li>
            <li className={menuItem}>
                <Link href="/profile">PERFIL</Link>
            </li>
        </ul>
      </ul>
    </nav>
  );
}
