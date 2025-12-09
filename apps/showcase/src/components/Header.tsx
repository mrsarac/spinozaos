'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Book, Package, Terminal, Activity } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${scrolled
          ? 'bg-void/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-white/5'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-spinoza-yellow/20 to-spinoza-gold/10 border border-spinoza-yellow/40 flex items-center justify-center overflow-hidden"
          >
            {/* Animated glow */}
            <div className="absolute inset-0 bg-spinoza-yellow/10 animate-pulse" />
            <span className="relative text-spinoza-yellow font-serif text-lg font-bold">S</span>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white group-hover:text-spinoza-yellow transition-colors tracking-wide">
              SPINOZA<span className="text-spinoza-yellow">OS</span>
            </span>
            <span className="text-[9px] text-neutral-500 uppercase tracking-[0.2em] font-mono">
              Design System
            </span>
          </div>
        </Link>

        {/* Center - Navigation with active indicator */}
        <nav className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/[0.03] border border-white/5">
          <NavLink href="/" active>Gallery</NavLink>
          <NavLink href="/components">Components</NavLink>
          <NavLink href="/tokens">Tokens</NavLink>
          <NavLink href="/motion">Motion</NavLink>
        </nav>

        {/* Right side - Status & Actions */}
        <div className="flex items-center gap-3">
          {/* Live status indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <Activity className="w-3 h-3 text-green-400 animate-pulse" />
            <span className="text-[10px] font-mono text-green-400 uppercase tracking-wider">Live</span>
            <span className="text-[10px] font-mono text-neutral-500">{currentTime}</span>
          </div>

          {/* Separator */}
          <div className="hidden lg:block w-px h-6 bg-white/10" />

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            <ActionButton
              href="https://docs-spinozaos.mustafasarac.com"
              icon={<Book className="w-4 h-4" />}
              label="Docs"
            />
            <ActionButton
              href="https://www.npmjs.com/org/spinozaos"
              icon={<Package className="w-4 h-4" />}
              label="NPM"
            />
            <ActionButton
              href="https://github.com/mrsarac/spinozaos"
              icon={<Github className="w-4 h-4" />}
              label="GitHub"
            />
          </div>

          {/* Version badge */}
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono bg-gradient-to-r from-spinoza-yellow/15 to-spinoza-gold/10 text-spinoza-yellow rounded-lg border border-spinoza-yellow/30 shadow-inner shadow-spinoza-yellow/5"
          >
            <Terminal className="w-3 h-3" />
            v1.0.0
          </motion.span>
        </div>
      </div>

      {/* Bottom gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{
          background: scrolled
            ? 'linear-gradient(90deg, transparent, rgba(251,191,36,0.3) 20%, rgba(20,184,166,0.3) 50%, rgba(139,92,246,0.3) 80%, transparent)'
            : 'transparent',
        }}
      />
    </motion.header>
  );
}

function ActionButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-2 text-neutral-400 hover:text-white rounded-lg transition-colors group"
      title={label}
    >
      <div className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors" />
      <span className="relative">{icon}</span>
    </motion.a>
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
