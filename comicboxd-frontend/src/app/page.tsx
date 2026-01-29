import Header from "../components/Header";
import Container from "../components/Container";
import HomeContent from "../components/HomeContent";

export default function Home() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-home.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/75" />

      <Container>
        <Header />
        <HomeContent />
      </Container>
    </div>
  );
}
