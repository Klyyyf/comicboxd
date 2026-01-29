export default function HomeContent() {
  return (
    <div className="text-white relative font-bold flex flex-col items-center mt-30 gap-8">
      <div className="text-4xl text-center">
        <p>Organize sua vida nos quadrinhos.</p>
        <p>Descubra novas histórias.</p>
        <p>Compartilhe suas opiniões.</p>
      </div>
      <button className="bg-green-600 px-8 py-2 rounded-lg text-[20px] hover:bg-green-700 cursor-pointer">
        Começar agora
      </button>
    </div>
  );
}
