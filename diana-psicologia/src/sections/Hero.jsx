import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { scrollToSection } from '../utils/scroll';

const Hero = () => (
  <div id="home" className="relative overflow-hidden bg-brand-cream min-h-screen flex items-center pt-20">
    {/* Manchas de fondo */}
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-terra opacity-10 blur-3xl animate-float"></div>
    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brand-sage opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* Lado Izquierdo: Textos */}
        <div className="space-y-8">
          <Reveal>
            <div className="inline-block px-4 py-1.5 bg-white border border-brand-sand text-brand-terra rounded-full text-sm font-semibold tracking-wide mb-2 shadow-sm">
              Psicología Cognitivo Conductual y Contextual
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-dark leading-tight">
              Compromiso, aceptación y una <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-terra to-brand-sage">vida valiosa</span>.
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-lg font-light">
              "Cuando cambiamos la forma de mirar las cosas, las cosas que miramos cambian."
              <br/> <span className="text-sm italic text-stone-500">— Wayne W. Dyer</span>
            </p>
          </Reveal>

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
        
        {/* Lado Derecho: Moodboard de 4 Fotos (Antes estaba en About) */}
        <div className="grid grid-cols-2 gap-4">
           <Reveal delay={300}>
             <div className="space-y-4">
                <div className="bg-brand-sand h-48 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                   <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400" alt="Consultorio detalle" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity transform hover:scale-105 duration-700"/>
                </div>
                <div className="bg-brand-terra/20 h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                   <img src="https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&fit=crop&q=80&w=400" alt="Atmósfera de calma" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity transform hover:scale-105 duration-700"/>
                </div>
             </div>
           </Reveal>
           <Reveal delay={500}>
             <div className="space-y-4 pt-8">
                <div className="bg-brand-sage/20 h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                   <img src="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?auto=format&fit=crop&q=80&w=400" alt="Espacio de escucha" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity transform hover:scale-105 duration-700"/>
                </div>
                <div className="bg-brand-sand h-48 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                   <img src="https://images.unsplash.com/photo-1499209974431-2761e25234d5?auto=format&fit=crop&q=80&w=400" alt="Bienestar" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity transform hover:scale-105 duration-700"/>
                </div>
             </div>
           </Reveal>
        </div>

      </div>
    </div>
  </div>
);

export default Hero;