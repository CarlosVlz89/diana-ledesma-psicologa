/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tu nueva paleta "Arcilla & Salvia"
        brand: {
          terra: '#C88D7A',    // Arcilla/Terracota Suave
          sage: '#9EB3A3',     // Verde Salvia/Musgo
          cream: '#F9F7F2',    // Crema Orgánico (Fondo)
          dark: '#2F3437',     // Carboncillo Profundo (Texto)
          glass: 'rgba(255, 255, 255, 0.4)', // Base para el efecto vidrio
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'], // Te recomiendo esta fuente para la elegancia
        sans: ['Lato', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}