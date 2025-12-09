import type { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'SpinozaOS Showcase | Design System Gallery',
  description: 'Interactive showcase of SpinozaOS design system components. Dark-first, motion-first UI components for the age of superintelligence.',
  keywords: ['design system', 'react', 'components', 'dark mode', 'ui library'],
  authors: [{ name: 'Mustafa Sarac' }],
  openGraph: {
    title: 'SpinozaOS Showcase',
    description: 'Design System for the Age of Superintelligence',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="bg-void min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
