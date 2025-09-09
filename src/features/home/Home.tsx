
import { Header } from "@/features/layout/Header";
import { Slider } from "@/features/home/components/Slider";
import HeroShowcase from "./components/HeroShowcase";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Slider />
      <main className="max-w-7xl mx-auto py-16">
            <HeroShowcase/>
      </main>
    </div>
  );
}
