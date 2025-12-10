import type { Config } from 'tailwindcss';
import spinozaPreset from '@spinozaos/tailwind';

const config: Config = {
  presets: [spinozaPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../../packages/react/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
