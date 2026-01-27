import React from 'react';
import { User, CheckCircle } from 'lucide-react';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';

const About = () => (
  <Section id="about" className="bg-white/50">
    <Reveal>
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">Sobre Mí</h2>
        <div className="h-1 w-20 bg-brand-terra mx-auto rounded-full mb-6"></div>
        <p className="text-stone-600 text-lg font-light">
          Mi propósito es acompañarte en un proceso terapéutico personalizado, brindándote herramientas para construir un bienestar psicológico integral.
        </p>
      </div>
    </Reveal>

    <div className="grid md:grid-cols-2 gap-12 items-center">
       
       {/* Lado Izquierdo: Biografía y Credenciales */}
       <div className="order-2 md:order-1 space-y-6">
         <Reveal delay={200}>
           <h3 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
             <User className="text-brand-terra" /> Diana Ledesma
           </h3>
           <div className="space-y-4 text-stone-700 leading-relaxed font-light">
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
                 <li key={idx} className="flex items-start gap-3 bg-brand-cream p-3 rounded-lg border border-brand-sand hover:bg-white transition-colors">
                   <div className="mt-1 h-2 w-2 bg-brand-sage rounded-full flex-shrink-0"></div>
                   <span>{item}</span>
                 </li>
               ))}
             </ul>
           </div>
         </Reveal>
       </div>

       {/* Lado Derecho: FOTO DE DIANA (Antes estaba en Hero) */}
       <div className="order-1 md:order-2 flex justify-center">
         <Reveal delay={300}>
            <div className="relative mt-8 md:mt-0 group perspective-1000 max-w-sm">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-brand-sand relative group transform transition-transform duration-700 group-hover:rotate-1 group-hover:scale-[1.02]">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Psicóloga Diana Ledesma" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Degradado sutil sobre la foto para elegancia */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent"></div>
              </div>
              
              {/* Tarjeta Flotante Decorativa */}
              <div className="glass-card absolute -bottom-6 -right-4 bg-white/95 p-6 rounded-xl shadow-lg max-w-xs border border-white/50 transform transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-brand-sage/20 rounded-full text-brand-dark">
                    <CheckCircle size={20} />
                  </div>
                  <span className="font-bold text-brand-dark">Enfoque Integral</span>
                </div>
                <p className="text-sm text-stone-600 font-light">Herramientas prácticas para construir bienestar real.</p>
              </div>
            </div>
         </Reveal>
       </div>

    </div>
  </Section>
);

export default About;