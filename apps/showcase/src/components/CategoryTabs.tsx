'use client';

import { motion } from 'framer-motion';
import { categories } from '@/lib/demos';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-hide">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            relative px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap
            transition-all duration-200
            ${activeCategory === category.id
              ? 'text-void'
              : 'text-neutral-400 hover:text-white'
            }
          `}
        >
          {activeCategory === category.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-lg overflow-hidden"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-spinoza-yellow to-spinoza-gold" />
              {/* Shine effect */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
            </motion.div>
          )}
          {activeCategory !== category.id && (
            <div className="absolute inset-0 rounded-lg bg-white/0 hover:bg-white/5 transition-colors" />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {category.label}
            {activeCategory === category.id && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-1.5 h-1.5 rounded-full bg-void/50"
              />
            )}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
