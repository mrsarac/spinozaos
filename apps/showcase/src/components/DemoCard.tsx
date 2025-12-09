'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Lock, Radio, Eye } from 'lucide-react';
import type { Demo } from '@/lib/demos';

interface DemoCardProps {
  demo: Demo;
  index: number;
}

export function DemoCard({ demo, index }: DemoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isLive = demo.status === 'live';
  const isBeta = demo.status === 'beta';

  // Simulated live data
  const [viewCount] = useState(() => Math.floor(Math.random() * 500) + 100);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div
        className={`
          relative overflow-hidden rounded-xl
          bg-void-lighter/80 backdrop-blur-sm
          border border-white/5
          transition-all duration-500
          hover:border-spinoza-yellow/40
          hover:shadow-2xl hover:shadow-spinoza-yellow/10
          ${isLive ? 'cursor-pointer' : 'cursor-default'}
        `}
      >
        {/* Animated border gradient on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(251,191,36,0.1) 0%, transparent 50%, rgba(139,92,246,0.1) 100%)',
          }}
        />

        {/* Preview Area */}
        <div className="aspect-[16/10] relative overflow-hidden">
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(251,191,36,0.15) 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Scan line effect */}
          <motion.div
            animate={{
              y: isHovered ? ['0%', '100%'] : '0%',
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: 'linear',
            }}
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-spinoza-yellow/50 to-transparent opacity-50"
          />

          {/* Center icon/preview */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="w-16 h-16 rounded-xl bg-void/80 border border-white/10 flex items-center justify-center"
            >
              {isLive ? (
                <Sparkles className="w-7 h-7 text-spinoza-yellow" />
              ) : (
                <Lock className="w-6 h-6 text-neutral-500" />
              )}
            </motion.div>
          </div>

          {/* Top left - Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-void/80 text-neutral-400 rounded border border-white/10">
              {demo.category}
            </span>
          </div>

          {/* Top right - Status */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            {isLive && (
              <span className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-medium bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                <Radio className="w-3 h-3 animate-pulse" />
                LIVE
              </span>
            )}
            {isBeta && (
              <span className="px-2 py-1 text-[10px] font-medium bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                BETA
              </span>
            )}
            {!isLive && !isBeta && (
              <span className="px-2 py-1 text-[10px] font-medium bg-spinoza-yellow/20 text-spinoza-yellow rounded-full border border-spinoza-yellow/30">
                COMING SOON
              </span>
            )}
          </div>

          {/* Bottom - View count */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <Eye className="w-3 h-3 text-neutral-500" />
            <span className="text-[10px] font-mono text-neutral-500">{viewCount} views</span>
          </div>

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent flex items-end justify-center pb-8"
          >
            {isLive && (
              <span className="flex items-center gap-2 px-4 py-2 bg-spinoza-yellow text-void text-sm font-semibold rounded-lg shadow-lg shadow-spinoza-yellow/30">
                Launch Demo <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5 border-t border-white/5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-base font-semibold text-white group-hover:text-spinoza-yellow transition-colors">
              {demo.title}
            </h3>
          </div>

          <p className="text-sm text-neutral-400 mb-4 line-clamp-2 leading-relaxed">
            {demo.description}
          </p>

          {/* Component Tags */}
          <div className="flex flex-wrap gap-1.5">
            {demo.components.slice(0, 4).map((component) => (
              <span
                key={component}
                className="px-2 py-0.5 text-[10px] font-mono bg-void border border-white/5 rounded text-neutral-500 hover:text-spinoza-yellow hover:border-spinoza-yellow/30 transition-colors"
              >
                {component}
              </span>
            ))}
            {demo.components.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] text-neutral-600">
                +{demo.components.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
          style={{
            background: 'linear-gradient(90deg, #fbbf24 0%, #14b8a6 50%, #8b5cf6 100%)',
          }}
        />
      </div>
    </motion.article>
  );
}
