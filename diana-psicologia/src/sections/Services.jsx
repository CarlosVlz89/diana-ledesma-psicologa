import React from 'react';
import { User, Heart, Brain, BookOpen } from 'lucide-react';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';

const Services = () => {
  const services = [
    {
      title: "Terapia Individual Adultos",
      desc: "Espacio seguro para abordar ansiedad, depresión, duelo o crecimiento personal.",
      icon: <User className="w-8 h-8 text-brand-accent" />, // Icono color Arcilla
      bgColor: "bg-white/50" // Fondo del icono más claro
    },
    {
      title: "Niños y Adolescentes",
      desc: "Atención especializada a partir de los 10 años. Manejo emocional y conductual.",
      icon: <Heart className="w-8 h-8 text-brand-accent" />,
      bgColor: "bg-white/50"
    },
    {
      title: "Enfoque Cognitivo Conductual",
      desc: "Trabajamos en identificar y cambiar patrones de pensamiento que afectan tu bienestar.",
      icon: <Brain className="w-8 h-8 text-brand-accent" />,
      bgColor: "bg-white/50"
    },
    {
      title: "Terapias Contextuales",
      desc: "DBT, ACT, AC y FAP. Enfocadas en la aceptación, mindfulness y valores de vida.",
      icon: <BookOpen className="w-8 h-8 text-brand-accent" />,
      bgColor: "bg-white/50"
    }
  ];

  return (
    <div className="relative z-10">
      <Section id="services">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-text mb-4">
              Mis Servicios
            </h2>
            <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mb-6"></div>
            <p className="max-w-2xl mx-auto text-brand-text/80 font-sans text-lg">
              Un enfoque profesional, cálido y humano, adaptado a tus necesidades específicas.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              
              {/* CAMBIO PRINCIPAL: bg-brand-accent/5 (Muy suave) y borde sutil */}
              <div className="bg-brand-accent/5 backdrop-blur-md rounded-[2rem] p-8 h-full group relative overflow-hidden flex flex-col items-center text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-brand-accent/10 hover:border-brand-accent/30">
                
                {/* Mancha decorativa suave detrás */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>

                {/* Círculo del Icono */}
                <div className={`w-20 h-20 rounded-full ${s.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 backdrop-blur-md border border-white/40 shadow-sm relative z-10`}>
                  <div className="transform group-hover:rotate-6 transition-transform duration-500">
                    {s.icon}
                  </div>
                </div>
                
                {/* Título y Texto (Oscuros para leerse bien) */}
                <h3 className="text-xl font-serif font-bold text-brand-text mb-3 relative z-10">
                  {s.title}
                </h3>
                
                <p className="text-brand-text/70 leading-relaxed text-sm font-sans relative z-10">
                  {s.desc}
                </p>

                {/* Borde inferior decorativo en Arcilla */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Services;