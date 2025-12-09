'use client';

import { motion } from 'framer-motion';
import { Github, Book, Package } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-spinoza-yellow/10 border border-spinoza-yellow/30 flex items-center justify-center">
            <span className="text-spinoza-yellow font-serif text-sm font-bold">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white group-hover:text-spinoza-yellow transition-colors">
              SpinozaOS
            </span>
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
              Showcase
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/" active>Gallery</NavLink>
          <NavLink href="/components">Components</NavLink>
          <NavLink href="/tokens">Tokens</NavLink>
          <NavLink href="/motion">Motion</NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://docs-spinozaos.mustafasarac.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            title="Documentation"
          >
            <Book className="w-5 h-5" />
          </a>
          <a
            href="https://www.npmjs.com/org/spinozaos"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            title="NPM"
          >
            <Package className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/mrsarac/spinozaos"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <span className="ml-2 px-2 py-1 text-xs font-mono bg-spinoza-yellow/10 text-spinoza-yellow rounded border border-spinoza-yellow/30">
            v1.0.0
          </span>
        </div>
      </div>
    </motion.header>
  );
}

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        px-3 py-2 text-sm rounded-lg transition-colors
        ${active
          ? 'text-spinoza-yellow bg-spinoza-yellow/10'
          : 'text-neutral-400 hover:text-white hover:bg-white/5'
        }
      `}
    >
      {children}
    </Link>
  );
}
