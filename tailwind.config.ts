import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#fafaf7',
        surface: '#ffffff',
        'surface-2': '#f5f3ec',
        line: '#e8e3d4',
        'line-2': '#d8d2bf',
        text: '#1a1814',
        'text-2': '#4a4640',
        'text-3': '#7a7468',
        'text-4': '#a8a193',
        amber: '#b8893a',
        'amber-soft': '#fbf3df',
        rose: '#b06060',
        'rose-soft': '#fbe9e9',
        emerald: '#5a8a6a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
