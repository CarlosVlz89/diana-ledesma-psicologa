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
          bg: '#FAF3E0',       // Crema de Té (Fondo)
          text: '#35322F',     // Carbón Vegetal (Texto)
          accent: '#BC8A5F',   // Marrón Arcilla (Botones/Links)
          sage: '#828E82',     // Salvia (Detalles)
          glass: 'rgba(250, 243, 224, 0.6)', 
        }
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
  plugins: [],
}