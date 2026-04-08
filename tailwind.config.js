/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Lora', 'Georgia', 'serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        cream: '#F7F0E3',
        parchment: '#EDE0C8',
        dark: '#1C1917',
        muted: '#6B6458',
        blue: '#5BC8E8',
        purple: '#8B5CF6',
        green: '#4D7C5A',
        rose: '#C9605A',
        border: '#2D2D2D',
      },
    },
  },
  plugins: [],
}
