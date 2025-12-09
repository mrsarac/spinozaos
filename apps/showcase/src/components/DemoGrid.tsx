'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DemoCard } from './DemoCard';
import { CategoryTabs } from './CategoryTabs';
import { getDemosByCategory } from '@/lib/demos';

export function DemoGrid() {
  const [activeCategory, setActiveCategory] = useState('all');
  const demos = getDemosByCategory(activeCategory);

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Demo Gallery
          </h2>
          <p className="text-neutral-400">
            Explore SpinozaOS components in real-world scenarios
          </p>
        </div>

        {/* Category tabs */}
        <div className="mb-8">
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Demo grid */}
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

        {/* Empty state */}
        {demos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-500">No demos in this category yet</p>
          </div>
        )}
      </div>
    </section>
  );
}
