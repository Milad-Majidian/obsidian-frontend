
import { Header } from "@/features/layout/Header";
import { Slider } from "@/features/home/components/Slider";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Slider />
      <main className="max-w-7xl mx-auto py-16">
        <h2 className="text-2xl font-bold">Welcome to our shop</h2>
        {/* Other content */}
      </main>
    </div>
  );
}
