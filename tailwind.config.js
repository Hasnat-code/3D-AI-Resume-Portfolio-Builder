export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        cyan: { DEFAULT: '#00f5ff', dark: '#00c8d4' },
        violet: { DEFAULT: '#a855f7', dark: '#7c3aed' },
        surface: { DEFAULT: '#060d18', card: 'rgba(0,245,255,0.04)' },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}