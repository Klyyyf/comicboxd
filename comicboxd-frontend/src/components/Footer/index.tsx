import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Container from "../Container";

export default function Footer() {
  return (
    <footer className="bg-[#0f1317] border-t border-slate-700/40 mt-auto">
      <Container>
        {/* Conteúdo principal do footer */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-around px-4 gap-6 md:gap-8">
          {/* Logo + nome do projeto */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="relative h-10 w-32">
              <Image
                src="/images/comic.png"
                alt="ComicBoxd"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-gray-500">
              Sua biblioteca de quadrinhos
            </p>
          </div>

          {/* Desenvolvedores */}
          <div className="text-center md:text-left text-sm text-gray-400">
            <p className="font-semibold text-gray-300 mb-1.5">
              Desenvolvido por
            </p>
            <p className="text-gray-400">Joaremio Neto</p>
            <p className="text-gray-400">Klyfthon Paulo</p>
          </div>

          {/* Redes sociais */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-sm font-semibold text-gray-300">Siga-nos</p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-slate-700/30 mt-6 pt-4">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} ComicBoxd. Todos os direitos
            reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
