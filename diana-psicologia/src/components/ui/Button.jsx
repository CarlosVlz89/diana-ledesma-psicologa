import React from 'react';

const Button = ({ children, onClick, variant = "primary", className = "", type="button" }) => {
  // rounded-full se mantiene, shadow suave
  const baseStyle = "group relative px-8 py-3 rounded-full font-medium transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 overflow-hidden shadow-lg hover:shadow-xl";
  
  const variants = {
    // Primary: Marrón Arcilla Sólido
    primary: "bg-brand-accent text-white hover:bg-[#A67850] hover:-translate-y-1 shadow-brand-accent/30",
    
    // Secondary: Cristal Crema
    secondary: "bg-white/50 text-brand-text hover:bg-white/80 hover:-translate-y-1 backdrop-blur-md border border-white/40",
    
    // Outline: Borde Marrón Arcilla
    outline: "border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white hover:-translate-y-1 bg-transparent",
    
    whatsapp: "bg-[#25D366] text-white hover:bg-[#128C7E] shadow-green-500/30 hover:-translate-y-1"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      <span className="relative z-10 flex items-center gap-2 font-sans tracking-wide">{children}</span>
    </button>
  );
};

export default Button;