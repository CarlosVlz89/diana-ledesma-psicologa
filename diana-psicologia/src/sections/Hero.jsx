import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { scrollToSection } from '../utils/scroll';

const Hero = () => (
  <div id="home" className="relative overflow-hidden min-h-screen flex items-center pt-32 md:pt-20">
    
    {/* FONDO DINÁMICO OPTIMIZADO */}
    {/* En celular: w-64 y blur-3xl (ligero). En PC: w-[500px] y blur-[100px] (lujoso) */}
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 md:w-[500px] md:h-[500px] rounded-full bg-brand-sage opacity-20 blur-3xl md:blur-[100px] animate-float"></div>
    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 md:w-[400px] md:h-[400px] rounded-full bg-brand-accent opacity-15 blur-2xl md:blur-[80px] animate-float" style={{ animationDelay: '4s' }}></div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* TEXTO HERO (SIN REVEAL PARA CARGA INSTANTÁNEA) */}
        <div className="space-y-8">
          
          {/* Quitamos <Reveal> de aquí para que el título salga YA */}
          <div className="animate-fade-in-up"> {/* Usamos una animación CSS simple */}
            <div className="inline-block px-4 py-1.5 bg-white/60 backdrop-blur-sm border border-brand-sage/30 text-brand-sage rounded-full text-sm font-bold tracking-wide mb-4 shadow-sm">
              Psicología Cognitivo Conductual y Contextual
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-text leading-tight">
              Compromiso, aceptación y una <span className="text-brand-accent italic relative">
                vida valiosa
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-accent opacity-40" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C2.00025 6.99997 101.996 -2.43573e-05 198 2.00002" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
              </span>.
            </h1>
          </div>
          
          {/* Texto secundario también instantáneo */}
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <p className="text-lg md:text-xl text-brand-text/80 leading-relaxed max-w-lg font-sans">
              "Cuando cambiamos la forma de mirar las cosas, las cosas que miramos cambian."
              <br/> <span className="text-sm font-bold text-brand-accent">— Wayne W. Dyer</span>
            </p>
          </div>

          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => scrollToSection('contact')}>
                Agendar Cita <Calendar size={18} />
              </Button>
              <Button variant="outline" onClick={() => scrollToSection('services')}>
                Conocer Terapia <ArrowRight size={18} />
              </Button>
            </div>
          </Reveal>
        </div>
        
        {/* MOODBOARD DE FOTOS */}
        <div className="grid grid-cols-2 gap-4">
           <Reveal delay={300}>
             <div className="space-y-4">
                <div className="h-48 rounded-[2rem] overflow-hidden shadow-lg border border-white/50 relative group">
                   <div className="absolute inset-0 bg-brand-sage/20 mix-blend-multiply z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
                   <img 
                     src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400" 
                     alt="Lectura" 
                     loading="eager" // Carga prioritaria
                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                </div>
                <div className="h-64 rounded-[2rem] overflow-hidden shadow-lg border border-white/50 relative group">
                   <div className="absolute inset-0 bg-brand-accent/10 mix-blend-multiply z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
                   <img 
                     src="https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400" 
                     alt="Naturaleza" 
                     loading="lazy"
                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                </div>
             </div>
           </Reveal>

           <Reveal delay={500}>
             <div className="space-y-4 pt-12">
                <div className="h-56 rounded-[2rem] overflow-hidden shadow-lg border border-white/50 relative group">
                   <div className="absolute inset-0 bg-brand-sage/10 mix-blend-multiply z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
                   <img 
                     src="https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400" 
                     alt="Escritura terapéutica" 
                     loading="lazy"
                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                </div>
                <div className="h-40 rounded-[2rem] overflow-hidden shadow-lg border border-white/50 relative group">
                   <div className="absolute inset-0 bg-brand-accent/20 mix-blend-multiply z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
                   <img 
                     src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400" 
                     alt="Bienestar y Yoga" 
                     loading="lazy"
                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                </div>
             </div>
           </Reveal>
        </div>

      </div>
    </div>
  </div>
);

export default Hero;