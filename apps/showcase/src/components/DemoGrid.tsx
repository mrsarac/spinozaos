'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid3X3, LayoutGrid, Sparkles } from 'lucide-react';
import { DemoCard } from './DemoCard';
import { CategoryTabs } from './CategoryTabs';
import { getDemosByCategory } from '@/lib/demos';

export function DemoGrid() {
  const [activeCategory, setActiveCategory] = useState('all');
  const demos = getDemosByCategory(activeCategory);

  return (
    <section className="relative py-20 px-6">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(251,191,36,0.5) 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section header with decorative elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-spinoza-yellow/10 border border-spinoza-yellow/30">
              <LayoutGrid className="w-5 h-5 text-spinoza-yellow" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-spinoza-yellow/30 to-transparent" />
          </div>

          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl font-serif font-semibold text-white mb-2">
                Demo <span className="text-spinoza-yellow">Gallery</span>
              </h2>
              <p className="text-neutral-400 max-w-xl">
                Interactive showcases demonstrating SpinozaOS components in production-ready scenarios
              </p>
            </div>

            {/* Demo count badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-spinoza-yellow" />
              <span className="text-sm font-mono text-neutral-300">
                {demos.length} <span className="text-neutral-500">demos</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Category tabs with glass container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-10 p-2 rounded-xl glass border border-white/5"
        >
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.div>

        {/* Demo grid with stagger animation */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {demos.map((demo, index) => (
              <DemoCard key={demo.id} demo={demo} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state with enhanced styling */}
        {demos.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl glass border border-white/5">
              <div className="p-4 rounded-xl bg-white/5">
                <Grid3X3 className="w-8 h-8 text-neutral-500" />
              </div>
              <div>
                <p className="text-neutral-400 font-medium mb-1">No demos in this category</p>
                <p className="text-sm text-neutral-600">Check back soon for new showcases</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom decorative gradient */}
        <div className="mt-16 flex justify-center">
          <div
            className="w-64 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.3) 30%, rgba(139,92,246,0.3) 70%, transparent)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
