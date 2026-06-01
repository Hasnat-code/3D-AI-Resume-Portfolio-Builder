export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Work Sans"','sans-serif'],
        body: ['"Work Sans"','sans-serif'],
        mono: ['"Space Mono"','monospace'],
      },
      colors: {
        cyan: { DEFAULT:'#00f5ff', dark:'#00c8d4' },
        violet: { DEFAULT:'#a855f7', dark:'#7c3aed' },
        bg: { primary:'#020408', secondary:'#060d18', card:'rgba(0,245,255,0.03)' },
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
