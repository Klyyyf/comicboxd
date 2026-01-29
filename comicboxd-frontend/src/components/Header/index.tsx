import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

export default function Header() {
  const menuItem = "cursor-pointer hover:text-gray-100 transition";
  return (
    <nav className="flex gap-8 p-2 items-center justify-around relative z-10">
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
            <Link href="/login">SIGN IN</Link>
          </li>
          <li className={menuItem}>
            <Link href="/register">CREATE ACCOUNT</Link>
          </li>
          <li className={menuItem}>HQS</li>
          <li className={menuItem}>LISTS</li>
        </ul>
      </ul>

      <div className="relative">
        <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
        <input
          type="text"
          className="bg-gray-400 rounded-lg pl-9 pr-3 py-1 text-sm text-slate-700 focus:outline-none"
        />
      </div>
    </nav>
  );
}
