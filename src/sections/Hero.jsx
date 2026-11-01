/**
 * Sección Hero (Cabecera de Entrada)
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Presentación principal con diseño editorial clínico, sobrio y balanceado.
 * Destaca la propuesta de valor basada en evidencia, llamadas a la acción en
 * terracota de alto contraste, iluminación ambiental orgánica y un contenedor
 * editorial de encuadre clínico y certeza institucional en escritorio.
 */

import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, MapPin, GraduationCap, Clock } from 'lucide-react';
import Reveal from '../components/ui/Reveal.jsx';
import Button from '../components/ui/Button.jsx';
import { scrollToSection } from '../utils/scroll.js';

export const Hero = () => (
  <section
    id="home"
    className="relative overflow-hidden isolate min-h-[calc(100vh-4rem)] md:min-h-screen flex items-center pt-24 sm:pt-28 md:pt-24 pb-12 md:pb-16 bg-gradient-to-b from-brand-bg via-[#F5EED9]/40 to-brand-bg"
  >
    {/* Orbes de iluminación ambiental orgánica en el fondo */}
    <div
      className="pointer-events-none absolute -top-10 -right-10 w-96 h-96 rounded-full bg-brand-sage/15 blur-3xl -z-10"
      aria-hidden="true"
    />
    <div
      className="pointer-events-none absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-brand-terracotta/10 blur-3xl -z-10"
      aria-hidden="true"
    />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-6 md:py-12">
      <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Columna de Texto Principal (7 columnas en escritorio) */}
        <div className="md:col-span-7 space-y-6 md:space-y-8 text-center md:text-left">
          <div className="animate-fade-in-up">
            {/* Eyebrow Tag Clínico */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface/90 border border-brand-accent/30 text-brand-terracotta text-xs font-bold tracking-[0.2em] uppercase shadow-soft-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-[#854B24] animate-pulse" />
              Psicología clínica basada en evidencia
            </div>

            {/* Titular Principal en Playfair Display */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-text leading-[1.15]">
              Compromiso, aceptación y una{' '}
              <span className="text-brand-terracotta italic relative inline-block">
                vida valiosa
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-brand-accent opacity-50"
                  viewBox="0 0 200 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2.00025 6.99997C2.00025 6.99997 101.996 -2.43573e-05 198 2.00002"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>
          </div>

          {/* Subtítulo Clínico Empático */}
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <p className="text-base sm:text-lg md:text-xl text-brand-muted leading-relaxed max-w-xl mx-auto md:mx-0 font-sans">
              Un espacio seguro, confidencial y respaldado por la ciencia donde comprender lo que sientes y desarrollar recursos prácticos para transformar tu bienestar cotidiano.
            </p>
          </div>

          {/* Llamadas a la Acción (CTAs) de Alto Contraste */}
          <Reveal delay={200}>
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 pt-1 justify-center md:justify-start">
              <Button
                variant="primary"
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto !bg-[#854B24] !text-white hover:!bg-[#6e3d1d] !px-6 !py-3.5 !rounded-xl shadow-soft-md hover:shadow-soft-lg hover:-translate-y-0.5 font-medium transition-all duration-300"
              >
                Agendar primera cita <Calendar size={18} />
              </Button>
              <Button
                variant="secondary"
                onClick={() => scrollToSection('services')}
                className="w-full sm:w-auto !bg-white/80 hover:!bg-white border !border-brand-sage/30 !text-brand-text !px-6 !py-3.5 !rounded-xl shadow-soft-sm hover:shadow-soft-md hover:-translate-y-0.5 font-medium transition-all duration-300"
              >
                Conocer servicios <ArrowRight size={18} />
              </Button>
            </div>
          </Reveal>

          {/* Cápsula Compacta de Certeza Clínica (Exclusiva para Móvil <md: para evitar redundancia en desktop) */}
          <Reveal delay={250}>
            <div className="md:hidden rounded-2xl bg-white/70 backdrop-blur-sm border border-brand-sage/20 p-4 mt-6 text-left shadow-soft-sm space-y-2.5 max-w-xl mx-auto">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-brand-text font-medium">
                <div className="w-7 h-7 rounded-lg bg-brand-sage/15 flex items-center justify-center shrink-0 text-brand-sage-dark">
                  <MapPin size={15} />
                </div>
                <span>Consultorio privado en Guadalajara y atención en línea</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-brand-muted font-medium">
                <div className="w-7 h-7 rounded-lg bg-brand-accent/15 flex items-center justify-center shrink-0 text-[#854B24]">
                  <ShieldCheck size={15} />
                </div>
                <span>Lic. Diana Ledesma · Cédula Profesional UdeG</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Columna Derecha: Tarjeta Editorial de Encuadre Clínico y Certeza (Desktop >=md:) */}
        <div className="hidden md:block md:col-span-5 relative">
          <Reveal delay={300}>
            <div className="glass-panel-warm rounded-3xl p-6 sm:p-8 border border-brand-sage/20 shadow-soft-lg relative overflow-hidden">
              {/* Resplandor ambiental interno suave */}
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-brand-accent/15 blur-2xl pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-brand-sage/15 blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Cabecera: Etiqueta institucional y badge flotante de disponibilidad */}
              <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-sage-dark">
                  <span className="w-2 h-2 rounded-full bg-brand-terracotta/70" />
                  <span>Consulta de Psicología Clínica</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50/90 border border-emerald-200/60 text-emerald-800 text-[11px] font-medium shadow-soft-sm shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Citas programadas esta semana</span>
                </div>
              </div>

              {/* Título Destacado y Subtítulo de la Titular */}
              <div className="relative z-10 pb-6 mb-6 border-b border-brand-sage/20">
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-brand-text mb-1.5">
                  Lic. Diana Ledesma
                </h2>
                <p className="text-xs sm:text-sm text-[#854B24] font-medium leading-relaxed font-sans">
                  Especialista en Terapia Cognitivo-Conductual y Terapias Contextuales (ACT/DBT)
                </p>
              </div>

              {/* Tres Módulos de Información Estructurados */}
              <div className="space-y-3 relative z-10">
                {/* Módulo 1: Cédula Profesional */}
                <div className="p-3.5 rounded-xl bg-white/70 border border-brand-sage/15 shadow-soft-sm flex items-start gap-3.5 transition-all duration-300 hover:bg-white hover:shadow-soft-md">
                  <div className="w-9 h-9 rounded-xl bg-brand-sage-light text-brand-sage-dark flex items-center justify-center shrink-0 shadow-inner mt-0.5">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-brand-text uppercase tracking-wider">
                      Cédula profesional
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed font-sans mt-0.5">
                      Formación y grado legal universitario por la Universidad de Guadalajara (UdeG).
                    </p>
                  </div>
                </div>

                {/* Módulo 2: Modalidad Dual */}
                <div className="p-3.5 rounded-xl bg-white/70 border border-brand-sage/15 shadow-soft-sm flex items-start gap-3.5 transition-all duration-300 hover:bg-white hover:shadow-soft-md">
                  <div className="w-9 h-9 rounded-xl bg-brand-accent/15 text-[#854B24] flex items-center justify-center shrink-0 shadow-inner mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-brand-text uppercase tracking-wider">
                      Modalidad dual
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed font-sans mt-0.5">
                      Consultorio privado en Col. Monraz, Guadalajara y sesiones remotas por Google Meet.
                    </p>
                  </div>
                </div>

                {/* Módulo 3: Encuadre Terapéutico */}
                <div className="p-3.5 rounded-xl bg-white/70 border border-brand-sage/15 shadow-soft-sm flex items-start gap-3.5 transition-all duration-300 hover:bg-white hover:shadow-soft-md">
                  <div className="w-9 h-9 rounded-xl bg-brand-sage-light text-brand-sage-dark flex items-center justify-center shrink-0 shadow-inner mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-brand-text uppercase tracking-wider">
                      Encuadre terapéutico
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed font-sans mt-0.5">
                      Procesos individuales de 50 a 60 minutos con confidencialidad ética absoluta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
