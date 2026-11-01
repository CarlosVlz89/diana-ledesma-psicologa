import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FAF3E0',          // Crema de Té base envolvente
          surface: '#FFFDF9',     // Marfil iluminado para tarjetas
          card: '#FFFFFF',        // Blanco puro de contraste para modales
          text: '#35322F',        // Carbón vegetal de alta legibilidad
          muted: '#5F5C58',       // Carbón secundario accesible (7.2:1)
          accent: '#BC8A5F',      // Marrón arcilla decorativo
          terracotta: '#854B24',  // Terracota profundo para CTAs y enlaces (6.3:1)
          sage: '#828E82',        // Salvia base neutro
          'sage-dark': '#4D584D', // Salvia bosque profundo para badges
          'sage-light': '#E9ECE9',// Salvia suave para píldoras
          glass: 'rgba(255, 253, 249, 0.78)', // Vidrio cálido translúcido
        }
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(53, 50, 47, 0.05), 0 1px 4px -1px rgba(53, 50, 47, 0.03)',
        'soft-md': '0 12px 24px -6px rgba(53, 50, 47, 0.08), 0 4px 8px -2px rgba(53, 50, 47, 0.04)',
        'soft-lg': '0 24px 48px -12px rgba(53, 50, 47, 0.12), 0 8px 16px -4px rgba(53, 50, 47, 0.06)',
        'glow-accent': '0 0 25px -5px rgba(188, 138, 95, 0.3)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        }
      }
    },
  },
  plugins: [
    typography,
  ],
}
