
import { Header } from "@/features/layout/Header";
import { Slider } from "@/features/home/components/Slider";
import HeroShowcase from "./components/HeroShowcase";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Slider />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:p-8 mt-6">
            <HeroShowcase/>
      </main>
    </div>
  );
}
