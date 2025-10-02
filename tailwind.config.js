/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cegal: {
          primary: '#00A3E0',    // Cegal blue
          secondary: '#0077B6',  // Darker blue
          accent: '#00D4AA',     // Teal accent
          green: '#00FF97',      // Bright green for headings
          dark: '#1A1A1A',       // Dark gray
          darker: '#16212C',     // Main background
          light: '#F8FAFC',      // Light background
          gray: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cegal': '0 4px 20px rgba(0, 163, 224, 0.1)',
        'cegal-lg': '0 10px 40px rgba(0, 163, 224, 0.15)',
      },
      backgroundImage: {
        'gradient-cegal': 'linear-gradient(135deg, #00A3E0 0%, #0077B6 100%)',
        'gradient-accent': 'linear-gradient(135deg, #00D4AA 0%, #00A3E0 100%)',
      }
    },
  },
  plugins: [],
};
