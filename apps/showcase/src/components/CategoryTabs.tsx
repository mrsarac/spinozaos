'use client';

import { motion } from 'framer-motion';
import { categories } from '@/lib/demos';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`
            relative px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap
            transition-colors duration-200
            ${activeCategory === category.id
              ? 'text-spinoza-yellow'
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }
          `}
        >
          {activeCategory === category.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-spinoza-yellow/10 border border-spinoza-yellow/30 rounded-lg"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{category.label}</span>
        </button>
      ))}
    </div>
  );
}
