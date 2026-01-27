import React from 'react';

const Button = ({ children, onClick, variant = "primary", className = "", type="button" }) => {
  // Estilos base + animación de "hundirse" al clic
  const baseStyle = "group relative px-6 py-3 rounded-full font-medium transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 overflow-hidden shadow-md";
  
  const variants = {
    // Primary: Carboncillo elegante -> Hover: Terracota
    primary: "bg-brand-dark text-brand-cream hover:bg-brand-terra hover:shadow-brand-terra/30 hover:-translate-y-1",
    
    // Secondary: Salvia suave (transparente) -> Hover: Salvia más fuerte
    secondary: "bg-brand-sage/20 text-brand-dark hover:bg-brand-sage/40 hover:-translate-y-1 backdrop-blur-sm",
    
    // Outline: Borde Carboncillo -> Hover: Relleno Carboncillo
    outline: "border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-cream hover:-translate-y-1",
    
    // WhatsApp: Mantenemos el verde clásico de la app, pero un poco más sobrio si quieres, 
    // o lo dejamos estándar para que sea reconocible. Lo dejaré estándar por usabilidad.
    whatsapp: "bg-green-600 text-white hover:bg-green-700 shadow-green-500/30 hover:shadow-lg hover:-translate-y-1"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      <span className="relative z-10 flex items-center gap-2 font-serif tracking-wide">{children}</span>
    </button>
  );
};

export default Button;