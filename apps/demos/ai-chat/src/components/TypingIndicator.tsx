'use client';

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3"
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center bg-void-lighter border border-white/10 text-spinoza-yellow">
        <Bot className="w-4 h-4" />
      </div>

      {/* Typing bubble */}
      <div className="px-4 py-3 rounded-2xl bg-void-lighter border border-white/5">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-spinoza-yellow typing-dot" />
          <span className="w-2 h-2 rounded-full bg-spinoza-yellow typing-dot" />
          <span className="w-2 h-2 rounded-full bg-spinoza-yellow typing-dot" />
        </div>
      </div>
    </motion.div>
  );
}
