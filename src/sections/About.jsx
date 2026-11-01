/**
 * Sección Sobre Mí
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Presentación profesional, trayectoria académica, áreas de especialidad
 * categorizadas y manifiesto clínico con ortotipografía RAE y diseño visual orgánico.
 * Integra el retrato oficial diana.webp en el marco de la semblanza curricular.
 */

import React from 'react';
import { User, Award, BookOpen, Users, CheckCircle, GraduationCap } from 'lucide-react';
import Section from '../components/ui/Section.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import dianaImg from '../assets/diana.webp';

export const About = () => (
  <Section id="about">
    <Reveal>
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-text mb-4">
          Sobre mí
        </h2>
        <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mb-6" />
        <p className="text-brand-muted text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
          Mi vocación es acompañarte en un espacio clínico respetuoso, ético y personalizado, brindándote herramientas fundamentadas en la ciencia para construir bienestar integral.
        </p>
      </div>
    </Reveal>

    <div className="grid md:grid-cols-12 gap-10 lg:gap-12 items-center">
      {/* Columna Izquierda: Información Profesional y Especialidades (7 cols) */}
      <div className="order-2 md:order-1 md:col-span-7 space-y-6">
        <Reveal delay={200}>
          <div className="space-y-4 max-w-prose text-brand-text/90 font-sans leading-relaxed">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-brand-sage-light text-brand-sage-dark flex items-center justify-center">
                <User size={18} />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-brand-text">
                  Diana Ledesma
                </h3>
                <p className="text-xs text-brand-terracotta font-semibold">
                  Psicóloga Clínica Colegiada
                </p>
              </div>
            </div>

            <p className="text-base text-brand-text/90">
              Soy <strong>Licenciada en Psicología</strong> por la Universidad de Guadalajara, con estancia académica e intercambio clínico en la Universidad de Murcia, España.
            </p>
            <p className="text-sm text-brand-muted">
              Mi práctica integra calidez humana con rigor científico. Mantengo una formación continua avalada en psiquiatría básica, salud mental comunitaria y terapias basadas en la evidencia.
            </p>
          </div>

          {/* Manifiesto / Encuadre Clínico */}
          <blockquote className="my-6 border-l-2 border-brand-terracotta pl-4 py-2 italic font-serif text-brand-text/90 text-sm md:text-base bg-brand-surface/60 rounded-r-xl max-w-prose">
            "El objetivo de la terapia no consiste en evitar el malestar a cualquier costo, sino en aprender a relacionarnos con él para poder actuar en dirección a lo que realmente valoras."
          </blockquote>

          {/* Categorización de Especialidades y Enfoques */}
          <div className="space-y-5 pt-2 max-w-prose">
            {/* Grupo 1: Enfoques Terapéuticos Basados en Evidencia */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-brand-terracotta mb-2.5 flex items-center gap-1.5">
                <BookOpen size={14} /> Enfoques terapéuticos
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Terapia cognitivo-conductual (TCC)", badge: true },
                  { name: "Terapia de aceptación y compromiso (ACT)", badge: true },
                  { name: "Terapia dialéctico-conductual (DBT)", badge: false },
                  { name: "Mindfulness clínico", badge: false }
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                      item.badge
                        ? 'bg-brand-sage-light text-brand-sage-dark border-brand-sage/30 font-semibold'
                        : 'bg-brand-surface text-brand-text border-brand-sage/20'
                    } shadow-soft-sm`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Grupo 2: Poblaciones y Ámbitos de Atención */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-brand-muted mb-2.5 flex items-center gap-1.5">
                <Users size={14} /> Poblaciones y áreas de atención
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Adultos en procesos de cambio y duelo",
                  "Adolescentes desde 10 años",
                  "Trastornos de la conducta alimentaria (TCA)",
                  "Intervención en crisis y prevención del suicidio"
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-surface text-brand-muted border border-brand-sage/20 shadow-soft-sm"
                  >
                    <GraduationCap size={13} className="text-brand-sage-dark" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Columna Derecha: Retrato Oficial Auténtico y Credenciales Flotantes (5 cols) */}
      <div className="order-1 md:order-2 md:col-span-5 flex justify-center">
        <Reveal delay={300}>
          <div className="relative mt-4 md:mt-0 max-w-xs sm:max-w-sm">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] relative shadow-soft-lg border border-brand-sage/20 bg-brand-surface group">
              <img
                src={dianaImg}
                alt="Lic. Diana Ledesma - Psicóloga Clínica Colegiada en Guadalajara"
                width={600}
                height={750}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-brand-accent/5 mix-blend-multiply pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Tarjeta Flotante con acabado Glass Cálido */}
            <div className="bg-white/90 backdrop-blur-md absolute -bottom-6 -right-3 md:-right-6 p-4 sm:p-5 max-w-[260px] rounded-2xl shadow-soft-md border border-white/80">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="p-2 bg-brand-sage-light text-brand-sage-dark rounded-xl shrink-0">
                  <CheckCircle size={18} />
                </div>
                <span className="font-bold text-xs text-brand-text">Enfoque contextual</span>
              </div>
              <p className="text-xs text-brand-muted font-sans leading-relaxed">
                Herramientas terapéuticas prácticas diseñadas para tu realidad cotidiana.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </Section>
);

export default About;
