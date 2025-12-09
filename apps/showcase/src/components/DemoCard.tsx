'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { Demo } from '@/lib/demos';

interface DemoCardProps {
  demo: Demo;
  index: number;
}

export function DemoCard({ demo, index }: DemoCardProps) {
  const isLive = demo.status === 'live';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative"
    >
      <div
        className={`
          relative overflow-hidden rounded-xl
          bg-void-lighter border border-white/5
          transition-all duration-300
          hover:border-spinoza-yellow/30 hover:shadow-lg
          ${isLive ? 'cursor-pointer' : 'cursor-default'}
        `}
      >
        {/* Preview Area */}
        <div className="aspect-video bg-void-light relative overflow-hidden">
          {/* Placeholder grid pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(251,191,36,0.3) 1px, transparent 0)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`
                px-2 py-1 text-xs font-medium rounded-full
                ${isLive
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-spinoza-yellow/20 text-spinoza-yellow border border-spinoza-yellow/30'
                }
              `}
            >
              {demo.status === 'live' ? 'Live' : demo.status === 'beta' ? 'Beta' : 'Coming Soon'}
            </span>
          </div>

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent flex items-end justify-center pb-6"
          >
            {isLive && (
              <span className="flex items-center gap-2 text-spinoza-yellow font-medium">
                View Demo <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-spinoza-yellow transition-colors">
              {demo.title}
            </h3>
            <Sparkles className="w-4 h-4 text-spinoza-yellow/50" />
          </div>

          <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
            {demo.description}
          </p>

          {/* Component Tags */}
          <div className="flex flex-wrap gap-1.5">
            {demo.components.slice(0, 4).map((component) => (
              <span
                key={component}
                className="px-2 py-0.5 text-xs bg-void border border-white/10 rounded text-neutral-400"
              >
                {component}
              </span>
            ))}
            {demo.components.length > 4 && (
              <span className="px-2 py-0.5 text-xs text-neutral-500">
                +{demo.components.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Glow effect on hover */}
        <div
          className="
            absolute inset-0 opacity-0 group-hover:opacity-100
            transition-opacity duration-500 pointer-events-none
            bg-gradient-to-r from-spinoza-yellow/5 via-transparent to-spinoza-yellow/5
          "
        />
      </div>
    </motion.article>
  );
}
