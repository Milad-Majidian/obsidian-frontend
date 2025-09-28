
import { Header } from "@/features/layout/Header";
import { Slider } from "@/features/home/components/Slider";
import HeroShowcase from "./components/HeroShowcase";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
            <Slider />
            <HeroShowcase/>
      </main>
    </>
  );
}
