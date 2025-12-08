import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['packages/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['packages/*/src/**/*.{ts,tsx}'],
      exclude: [
        'packages/*/src/**/*.stories.{ts,tsx}',
        'packages/*/src/**/*.test.{ts,tsx}',
        'packages/*/src/index.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@spinozaos/tokens': resolve(__dirname, 'packages/tokens/src/index.ts'),
      '@spinozaos/motion': resolve(__dirname, 'packages/motion/src/index.ts'),
      '@spinozaos/react': resolve(__dirname, 'packages/react/src/index.ts'),
    },
  },
});
