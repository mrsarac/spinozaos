'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, Package, Sparkles } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { LiveStats } from './LiveStats';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251,191,36,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251,191,36,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Radial glow - center */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 60%)',
          }}
        />

        {/* Secondary glow - purple */}
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 60%)',
          }}
        />

        {/* Scan lines effect */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Top badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <span className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-spinoza-yellow/10 text-spinoza-yellow rounded-full border border-spinoza-yellow/30">
            <Sparkles className="w-3 h-3" />
            v1.0.0 Released
          </span>
          <span className="px-3 py-1.5 text-xs font-mono bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/30">
            25 Components
          </span>
          <span className="px-3 py-1.5 text-xs font-mono bg-green-500/10 text-green-400 rounded-full border border-green-500/30">
            564 Tests Passing
          </span>
        </motion.div>

        {/* Main title with glitch */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <GlitchText
              text="SPINOZA"
              className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-spinoza-yellow"
              glitchIntensity="medium"
            />
            <span className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white">OS</span>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xl md:text-2xl text-neutral-300 mb-3 font-light"
        >
          Design System for the Age of Superintelligence
        </motion.p>

        {/* Philosophy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-neutral-500 italic font-serif mb-8"
        >
          "More Geometrico"
        </motion.p>

        {/* Decorative gradient line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-64 h-0.5 mx-auto mb-10 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, #fbbf24 30%, #14b8a6 50%, #8b5cf6 70%, transparent)',
          }}
        />

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <a
            href="https://github.com/mrsarac/spinozaos"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group flex items-center gap-2 px-6 py-3.5
              bg-spinoza-yellow text-void font-semibold rounded-lg
              hover:bg-spinoza-gold transition-all duration-300
              shadow-lg shadow-spinoza-yellow/20
              hover:shadow-spinoza-yellow/40 hover:scale-105
            "
          >
            <Github className="w-5 h-5" />
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="https://www.npmjs.com/org/spinozaos"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group flex items-center gap-2 px-6 py-3.5
              glass-elevated text-white font-semibold rounded-lg
              border border-white/10 hover:border-spinoza-yellow/30
              hover:bg-white/10 transition-all duration-300
            "
          >
            <Package className="w-5 h-5" />
            npm install
            <code className="text-sm font-mono text-spinoza-yellow">@spinozaos/react</code>
          </a>
        </motion.div>

        {/* Live stats */}
        <LiveStats />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-neutral-500"
        >
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-spinoza-yellow/50">
            <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
