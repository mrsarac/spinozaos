'use client';

import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251,191,36,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251,191,36,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial gradient */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Version badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-block mb-6"
        >
          <span className="px-3 py-1.5 text-xs font-mono bg-spinoza-yellow/10 text-spinoza-yellow rounded-full border border-spinoza-yellow/30">
            v1.0.0 Released
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight"
        >
          <span className="text-spinoza-yellow">Spinoza</span>OS
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-neutral-400 mb-2 font-light"
        >
          Design System for the Age of Superintelligence
        </motion.p>

        {/* Philosophy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-neutral-500 italic font-serif mb-8"
        >
          "More Geometrico"
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-48 h-px mx-auto bg-gradient-to-r from-transparent via-spinoza-yellow/50 to-transparent mb-8"
        />

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="https://github.com/mrsarac/spinozaos"
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-6 py-3 bg-spinoza-yellow text-void font-medium rounded-lg
              hover:bg-spinoza-gold transition-colors
              shadow-lg shadow-spinoza-yellow/20
            "
          >
            Get Started
          </a>
          <a
            href="https://www.npmjs.com/org/spinozaos"
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-6 py-3 bg-void-lighter text-white font-medium rounded-lg
              border border-white/10 hover:border-spinoza-yellow/30
              hover:bg-void-light transition-colors
            "
          >
            View on NPM
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center gap-8 mt-12 text-center"
        >
          <Stat value="25" label="Components" />
          <Stat value="564" label="Tests" />
          <Stat value="4" label="Packages" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-neutral-500 text-sm flex flex-col items-center gap-2"
        >
          <span>Scroll to explore</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-spinoza-yellow/50"
          >
            <path
              d="M10 3v14m0 0l-5-5m5 5l5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-spinoza-yellow font-mono">{value}</div>
      <div className="text-xs text-neutral-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}
