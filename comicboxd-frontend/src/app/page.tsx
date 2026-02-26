import Container from "../components/Container";
import HomeHero from "../components/HomeHero";
import LatestNew from "../components/LatestNews";
import HomeFeatures from "../components/HomeFeatures";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <Container>
        <HomeFeatures />
        <LatestNew />
      </Container>
    </div>
  );
}
