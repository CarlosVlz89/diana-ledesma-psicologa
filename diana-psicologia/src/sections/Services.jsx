import React from 'react';
import { User, Heart, Brain, BookOpen } from 'lucide-react';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';

const Services = () => {
  const services = [
    {
      title: "Terapia Individual Adultos",
      desc: "Espacio seguro para abordar ansiedad, depresión, duelo o crecimiento personal.",
      icon: <User className="w-8 h-8 text-brand-terra" />, // Terracota
      bgColor: "bg-brand-terra/10" // Terracota muy suave (10% opacidad)
    },
    {
      title: "Niños y Adolescentes",
      desc: "Atención especializada a partir de los 10 años. Manejo emocional y conductual.",
      icon: <Heart className="w-8 h-8 text-brand-sage" />, // Salvia
      bgColor: "bg-brand-sage/20" // Salvia suave
    },
    {
      title: "Enfoque Cognitivo Conductual",
      desc: "Trabajamos en identificar y cambiar patrones de pensamiento que afectan tu bienestar.",
      icon: <Brain className="w-8 h-8 text-brand-dark" />, // Carboncillo
      bgColor: "bg-stone-200/50" // Gris suave
    },
    {
      title: "Terapias Contextuales",
      desc: "DBT, ACT, AC y FAP. Enfocadas en la aceptación, mindfulness y valores de vida.",
      icon: <BookOpen className="w-8 h-8 text-brand-terra" />, // Terracota de nuevo para balancear
      bgColor: "bg-brand-terra/10"
    }
  ];

  return (
    // Fondo general "Crema" definido en el componente padre o body, aquí aseguramos limpieza
    <div className="relative z-10">
      <Section id="services">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
              Mis Servicios
            </h2>
            {/* Línea decorativa en color Salvia */}
            <div className="h-1 w-20 bg-brand-sage mx-auto rounded-full mb-6"></div>
            <p className="max-w-2xl mx-auto text-stone-600 font-light text-lg">
              Un enfoque profesional, cálido y humano, adaptado a tus necesidades específicas.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              {/* AQUÍ APLICAMOS LA TARJETA DE VIDRIO (glass-card) */}
              <div className="glass-card p-8 h-full group border border-white/40 relative overflow-hidden">
                
                {/* Mancha de color decorativa sutil detrás del icono */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${s.bgColor} blur-2xl opacity-50 group-hover:scale-150 transition-transform duration-700`}></div>

                <div className={`w-16 h-16 rounded-2xl ${s.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10 backdrop-blur-sm`}>
                  <div className="transform group-hover:rotate-6 transition-transform duration-500">
                    {s.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-serif font-bold text-brand-dark mb-3 group-hover:text-brand-terra transition-colors relative z-10">
                  {s.title}
                </h3>
                
                <p className="text-stone-600 leading-relaxed text-sm font-light relative z-10">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Services;