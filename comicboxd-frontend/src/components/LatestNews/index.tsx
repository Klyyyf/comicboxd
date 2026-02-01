import Image from "next/image";

type Notice = {
  title: string;
  content: string;
  imageUrl: string;
};

const notices: Notice[] = [
  {
    title: "Novas HQs exploram versões alternativas de heróis clássicos",
    content:
      "Nos últimos anos, editoras de quadrinhos têm apostado cada vez mais em histórias alternativas de heróis consagrados. Essas narrativas exploram realidades paralelas, futuros distópicos e versões mais humanas dos personagens, permitindo aos leitores enxergar figuras icônicas como Batman, Homem-Aranha e Superman sob novas perspectivas.",
    imageUrl: "/images/noticia1.jpeg",
  },
  {
    title: "Graphic novels ganham mais espaço fora do público tradicional",
    content:
      "As graphic novels continuam conquistando leitores que antes não consumiam quadrinhos regularmente. Com temas que abordam política, história, identidade e questões sociais, esse formato tem sido cada vez mais utilizado em escolas, universidades e clubes de leitura.",
    imageUrl: "/images/notice2.jpg",
  },
];
export default function LatestNew() {
  return (
    <div>
      <div className="flex justify-between mt-15">
        <h1 className="text-3xl text-gray-300 font-bold mb-8 pl-4 border-l-4 border-yellow-600 ">
          Ultimas notícias
        </h1>
        <div className="hover:text-slate-400 cursor-pointer">Ver mais</div>
      </div>

      {notices.map((notice, index) => (
        <div
          key={index}
          className="w-full h-50 flex mb-10 py-2 rounded-lg overflow-hidden"
        >
          {/* Imagem */}
          <div className="w-1/3 h-full">
            <div className="relative w-full h-full">
              <Image
                src={notice.imageUrl}
                alt="noticia"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Texto */}
          <div className="h-full flex-1 px-8 bg-[#2c3440] overflow-hidden flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-gray-300 hover:text-slate-400 cursor-pointer">
              {notice.title}
            </h1>

            <p className="text-[13px] font-semibold py-2 text-gray-100 ">
              {notice.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
