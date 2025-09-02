import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        atlas: {
          bg: '#0B1016',
          card: '#111827',
          accent: '#36D399',
          ring: '#22d3ee'
        }
      },
      boxShadow: {
        'glow': '0 0 0 3px rgba(34, 211, 238, 0.35)',
      },
      borderRadius: {
        'xl2': '1.25rem'
      }
    },
  },
  plugins: []
}
