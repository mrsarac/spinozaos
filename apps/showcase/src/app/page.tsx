import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { DemoGrid } from '@/components/DemoGrid';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <DemoGrid />

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-neutral-500 text-sm">
            <span className="text-spinoza-yellow font-serif">SpinozaOS</span>
            {' '}
            <span className="italic">"More Geometrico"</span>
          </p>
          <p className="text-neutral-600 text-xs mt-2">
            Made with intention by{' '}
            <a
              href="https://mustafasarac.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-spinoza-yellow transition-colors"
            >
              Mustafa Sarac
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
