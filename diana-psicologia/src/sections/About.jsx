import React from 'react';
import { User, CheckCircle } from 'lucide-react';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';

const About = () => (
  <Section id="about">
    <Reveal>
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-text mb-4">Sobre Mí</h2>
        <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mb-6"></div>
        <p className="text-brand-text/80 text-lg font-sans">
          Mi propósito es acompañarte en un proceso terapéutico personalizado, brindándote herramientas para construir un bienestar psicológico integral.
        </p>
      </div>
    </Reveal>

    <div className="grid md:grid-cols-2 gap-12 items-center">
       
       <div className="order-2 md:order-1 space-y-6">
         <Reveal delay={200}>
           <h3 className="text-2xl font-bold text-brand-text flex items-center gap-2">
             <User className="text-brand-accent" /> Diana Ledesma
           </h3>
           <div className="space-y-4 text-brand-text/90 leading-relaxed font-sans">
             <p>
               Soy <strong>Licenciada en Psicología</strong> por la Universidad de Guadalajara, con intercambio académico en la Universidad de Murcia, España.
             </p>
             <p>
               Mi formación académica es continua y apasionada. Cuento con diplomados y cursos especializados en:
             </p>
             <ul className="grid gap-3 mt-4">
               {[
                 "Terapia Cognitivo Conductual (TCC)",
                 "Terapia Cognitiva basada en Mindfulness",
                 "Psiquiatría y Salud Mental",
                 "Trastornos de la Conducta Alimentaria (TCA)",
                 "Terapias Contextuales (DBT y ACT)",
                 "Intervención en crisis y prevención del suicidio"
               ].map((item, idx) => (
                 // Tarjetas de lista estilo cristal
                 <li key={idx} className="flex items-start gap-3 bg-white/40 p-3 rounded-xl border border-white/50 hover:bg-white/60 transition-colors shadow-sm">
                   <div className="mt-1 h-2 w-2 bg-brand-sage rounded-full flex-shrink-0"></div>
                   <span className="text-sm font-medium">{item}</span>
                 </li>
               ))}
             </ul>
           </div>
         </Reveal>
       </div>

       <div className="order-1 md:order-2 flex justify-center">
         <Reveal delay={300}>
            <div className="relative mt-8 md:mt-0 group perspective-1000 max-w-sm">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-brand-sage/20 relative group transform transition-transform duration-700 group-hover:rotate-1 group-hover:scale-[1.02] border border-white/40">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Psicóloga Diana Ledesma" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Filtro cálido suave */}
                <div className="absolute inset-0 bg-brand-accent/10 mix-blend-multiply"></div>
              </div>
              
              {/* Tarjeta Flotante (Liquid Glass) */}
              <div className="glass-panel absolute -bottom-6 -right-4 p-6 max-w-xs transform transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-brand-sage/20 rounded-full text-brand-text">
                    <CheckCircle size={20} />
                  </div>
                  <span className="font-bold text-brand-text">Enfoque Integral</span>
                </div>
                <p className="text-sm text-brand-text/70 font-sans">Herramientas prácticas para construir bienestar real.</p>
              </div>
            </div>
         </Reveal>
       </div>
    </div>
  </Section>
);

export default About;