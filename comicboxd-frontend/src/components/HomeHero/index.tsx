import Header from "../Header";
import HomeContent from "../HomeContent";

export default function HomeHero() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-home.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/75" />
      <Header />
      <HomeContent />
    </div>
  );
}
