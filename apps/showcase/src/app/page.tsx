import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { DemoGrid } from '@/components/DemoGrid';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <DemoGrid />
      <Footer />
    </main>
  );
}
