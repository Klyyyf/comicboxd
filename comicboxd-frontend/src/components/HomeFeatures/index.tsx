import { FaHeart } from "react-icons/fa";
import { CiRead } from "react-icons/ci";
import { FaList } from "react-icons/fa";
import { MdReviews } from "react-icons/md";

export default function HomeFeatures() {
  return (
    <div className="w-full h-[300px] flex flex-col m-auto justify-center">
      <h1 className="mb-4 text-gray-300 font-bold">
        COMICBOXD PERMITE VOCÊ...
      </h1>
      <div className="flex gap-4 justify-around text-slate-50 font-semibold">
        <div className="bg-[#678] w-1/4 flex p-4 gap-4 text-sm justify-center items-center rounded-lg">
          <CiRead className="text-8xl" />
          Acompanhe todas as HQs que você já leu
        </div>
        <div className="bg-[#678]  w-1/4 flex p-4 gap-4 text-sm justify-center items-center rounded-lg">
          <FaHeart className="text-8xl" />
          Demonstre carinho pelas suas HQs, listas e reviews favoritas com um
          “like”
        </div>
        <div className="bg-[#678]  w-1/4 flex p-4 gap-4 text-sm justify-center items-center rounded-lg">
          <FaList className="text-8xl" />
          Escreva e compartilhe reviews, além de seguir amigos e outros leitores
          para ver o que eles estão lendo
        </div>
        <div className="bg-[#678] w-1/4 flex p-4 gap-4 text-sm justify-center items-center rounded-lg">
          <MdReviews className="text-8xl" />
          Avalie cada HQ em uma escala de cinco estrelas para registrar e
          compartilhar sua opinião
        </div>
      </div>
    </div>
  );
}
