import React from 'react';
import { Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { scrollToSection } from '../utils/scroll';

const Hero = () => (
  <div id="home" className="relative overflow-hidden min-h-screen flex items-center pt-20">
    
    {/* FONDO DINÁMICO (Blobs Otoñales) */}
    {/* Blob Salvia */}
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] rounded-full bg-brand-sage opacity-20 blur-[100px] animate-float"></div>
    {/* Blob Marrón/Ocre */}
    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-brand-accent opacity-15 blur-[80px] animate-float" style={{ animationDelay: '4s' }}></div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-8">
          <Reveal>
            <div className="inline-block px-4 py-1.5 bg-white/60 backdrop-blur-sm border border-brand-sage/30 text-brand-sage rounded-full text-sm font-bold tracking-wide mb-4 shadow-sm">
              Psicología Cognitivo Conductual y Contextual
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-text leading-tight">
              Compromiso, aceptación y una <span className="text-brand-accent italic relative">
                vida valiosa
                {/* Subrayado orgánico estilo pincel */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-accent opacity-40" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C2.00025 6.99997 101.996 -2.43573e-05 198 2.00002" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
              </span>.
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-brand-text/80 leading-relaxed max-w-lg font-sans">
              "Cuando cambiamos la forma de mirar las cosas, las cosas que miramos cambian."
              <br/> <span className="text-sm font-bold text-brand-accent">— Wayne W. Dyer</span>
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
        
        {/* Moodboard de Fotos con efecto Cristal */}
        <div className="grid grid-cols-2 gap-4">
           <Reveal delay={300}>
             <div className="space-y-4">
                <div className="h-48 rounded-3xl overflow-hidden shadow-lg border border-white/50 relative group">
                   <div className="absolute inset-0 bg-brand-sage/20 mix-blend-multiply z-10"></div>
                   <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400" alt="Consultorio" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
                </div>
                <div className="h-64 rounded-3xl overflow-hidden shadow-lg border border-white/50 relative group">
                   <div className="absolute inset-0 bg-brand-accent/10 mix-blend-multiply z-10"></div>
                   <img src="https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&fit=crop&q=80&w=400" alt="Calma" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
                </div>
             </div>
           </Reveal>
           <Reveal delay={500}>
             <div className="space-y-4 pt-12">
                <div className="glass-panel p-6 text-center transform hover:-translate-y-2 transition-transform duration-500">
                   <div className="w-12 h-12 bg-brand-bg rounded-full flex items-center justify-center mx-auto mb-3 text-brand-accent shadow-inner">
                      <CheckCircle />
                   </div>
                   <p className="text-sm font-bold text-brand-text">Enfoque<br/>Integral</p>
                </div>
                <div className="h-48 rounded-3xl overflow-hidden shadow-lg border border-white/50 relative group">
                   <div className="absolute inset-0 bg-brand-sage/20 mix-blend-multiply z-10"></div>
                   <img src="https://images.unsplash.com/photo-1499209974431-2761e25234d5?auto=format&fit=crop&q=80&w=400" alt="Bienestar" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
                </div>
             </div>
           </Reveal>
        </div>

      </div>
    </div>
  </div>
);

export default Hero;