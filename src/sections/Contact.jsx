/**
 * Sección Contacto y Agenda
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Información de contacto directo, selector interactivo de modalidad (en línea vs. presencial),
 * enlace inteligente pre-llenado a WhatsApp y accesos a Google Calendar con ortotipografía Sentence Case.
 */

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Instagram,
  Calendar,
  CheckCircle,
  ArrowRight,
  Video,
  Clock,
  ShieldCheck,
  CreditCard,
  ExternalLink
} from 'lucide-react';
import Section from '../components/ui/Section.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Button from '../components/ui/Button.jsx';

export const Contact = () => {
  const [modality, setModality] = useState('online'); // 'online' | 'presencial'

  const whatsappMessage = encodeURIComponent(
    'Hola Diana, me gustaría recibir información sobre tus consultas terapéuticas.'
  );
  const whatsappUrl = `https://wa.me/523318363829?text=${whatsappMessage}`;

  return (
    <div className="bg-gradient-to-t from-brand-sage-light/30 via-transparent to-transparent relative">
      <span id="contacto" className="sr-only" aria-hidden="true" />
      <Section id="contact">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Columna Izquierda: Información de Contacto y Ubicación (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-accent/20 text-brand-terracotta text-xs font-bold tracking-wider uppercase mb-3 shadow-soft-sm">
                  Atención personalizada
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-text mb-4">
                  Contacto y agenda
                </h2>
                <p className="text-brand-muted text-base md:text-lg font-sans leading-relaxed">
                  Dar el primer paso hacia el bienestar requiere valor. Si tienes preguntas sobre el proceso o deseas orientación previa, conversemos directamente.
                </p>
              </div>

              <div className="space-y-6 pt-4">
                {/* WhatsApp Directo */}
                <div className="glass-card-warm bg-brand-surface/90 p-5 rounded-2xl border border-brand-sage/20 shadow-soft-sm hover:shadow-soft-md transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform border border-emerald-200">
                      <Phone size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-brand-text text-sm mb-1">
                        WhatsApp profesional
                      </h3>
                      <p className="text-xs text-brand-muted mb-2 font-sans">
                        Respuesta personalizada para dudas de disponibilidad y tarifas.
                      </p>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                      >
                        Enviar mensaje directo <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Ubicación Consultorio */}
                <div className="glass-card-warm bg-brand-surface/90 p-5 rounded-2xl border border-brand-sage/20 shadow-soft-sm hover:shadow-soft-md transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-sage-light text-brand-sage-dark flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform border border-brand-sage/30">
                      <MapPin size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-brand-text text-sm mb-1">
                        Consultorio privado
                      </h3>
                      <p className="text-xs text-brand-muted leading-relaxed font-sans mb-2">
                        Calle Toltecas 3446, Monraz,<br />
                        44670 Guadalajara, Jalisco, México.
                      </p>
                      <a
                        href="https://maps.app.goo.gl/389pHWCyAvtYHotB6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-terracotta hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded"
                      >
                        Ver ubicación en Google Maps <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Instagram Psicoeducativo */}
                <div className="glass-card-warm bg-brand-surface/90 p-5 rounded-2xl border border-brand-sage/20 shadow-soft-sm hover:shadow-soft-md transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-50 text-brand-terracotta flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform border border-brand-accent/20">
                      <Instagram size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-brand-text text-sm mb-1">
                        Comunidad y psicoeducación
                      </h3>
                      <p className="text-xs text-brand-muted mb-2 font-sans">
                        Publicaciones sobre salud mental, apego y autorregulación.
                      </p>
                      <a
                        href="https://www.instagram.com/psic.dianaledesma?utm_source=qr&igsh=NTdmdjk4dDE1enJp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-terracotta hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded"
                      >
                        @psic.dianaledesma en Instagram <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Columna Derecha: Tarjeta Interactiva con Selector de Modalidad (6 cols) */}
          <div className="lg:col-span-6">
            <Reveal delay={200}>
              <div className="glass-panel-warm bg-brand-surface/95 rounded-3xl p-6 sm:p-8 lg:p-9 shadow-soft-lg border border-brand-sage/25 relative overflow-hidden">
                <Calendar
                  className="absolute -top-6 -right-6 w-44 h-44 text-brand-accent opacity-5 rotate-12 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <h3 className="text-2xl font-serif font-bold text-brand-text mb-2 text-center">
                    Encuentra tu momento ideal
                  </h3>
                  <p className="text-brand-muted font-sans text-center text-xs sm:text-sm mb-6 leading-relaxed">
                    Selecciona tu modalidad preferida para consultar la agenda oficial en tiempo real.
                  </p>

                  {/* Selector Interactivo de Modalidad (Tabs) */}
                  <div
                    className="flex p-1.5 bg-brand-bg/90 rounded-xl border border-brand-sage/25 mb-6"
                    role="tablist"
                    aria-label="Selector de modalidad de cita"
                  >
                    <button
                      type="button"
                      role="tab"
                      id="tab-online"
                      aria-selected={modality === 'online'}
                      aria-controls="panel-online"
                      onClick={() => setModality('online')}
                      className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
                        modality === 'online'
                          ? 'bg-brand-surface text-brand-text shadow-soft-sm font-bold border border-brand-sage/20'
                          : 'text-brand-muted hover:text-brand-text'
                      }`}
                    >
                      <Video
                        size={16}
                        className={modality === 'online' ? 'text-brand-terracotta' : 'text-brand-muted'}
                      />
                      <span>En línea (Google Meet)</span>
                    </button>
                    <button
                      type="button"
                      role="tab"
                      id="tab-presencial"
                      aria-selected={modality === 'presencial'}
                      aria-controls="panel-presencial"
                      onClick={() => setModality('presencial')}
                      className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
                        modality === 'presencial'
                          ? 'bg-brand-surface text-brand-text shadow-soft-sm font-bold border border-brand-sage/20'
                          : 'text-brand-muted hover:text-brand-text'
                      }`}
                    >
                      <MapPin
                        size={16}
                        className={modality === 'presencial' ? 'text-brand-terracotta' : 'text-brand-muted'}
                      />
                      <span>En consultorio (GDL)</span>
                    </button>
                  </div>

                  {/* Contenido Dinámico de la Pestaña Activa */}
                  {modality === 'online' ? (
                    <div
                      id="panel-online"
                      role="tabpanel"
                      aria-labelledby="tab-online"
                      className="space-y-5 animate-fade-in"
                    >
                      <div className="bg-brand-bg/60 p-4 rounded-xl border border-brand-sage/20 space-y-2.5 text-xs text-brand-text font-sans">
                        <div className="flex items-center gap-2.5 text-brand-text font-medium">
                          <Clock size={15} className="text-brand-terracotta flex-shrink-0" />
                          <span>Sesión individual de 60 minutos.</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-brand-text font-medium">
                          <ShieldCheck size={15} className="text-brand-sage-dark flex-shrink-0" />
                          <span>Enlace seguro y privado generado al confirmar tu horario.</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-brand-text font-medium">
                          <CreditCard size={15} className="text-brand-muted flex-shrink-0" />
                          <span>Pago mediante transferencia bancaria antes de la sesión.</span>
                        </div>
                      </div>

                      <a
                        href="https://calendar.app.google/7tm3XgfTdGsZntvN8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-xl"
                      >
                        <Button
                          variant="primary"
                          className="w-full flex items-center justify-center gap-2 py-3.5 shadow-soft-sm"
                        >
                          <Video size={18} /> Agendar sesión en línea
                        </Button>
                      </a>
                    </div>
                  ) : (
                    <div
                      id="panel-presencial"
                      role="tabpanel"
                      aria-labelledby="tab-presencial"
                      className="space-y-5 animate-fade-in"
                    >
                      <div className="bg-brand-bg/60 p-4 rounded-xl border border-brand-sage/20 space-y-2.5 text-xs text-brand-text font-sans">
                        <div className="flex items-center gap-2.5 text-brand-text font-medium">
                          <Clock size={15} className="text-brand-terracotta flex-shrink-0" />
                          <span>Sesión individual de 60 minutos en consultorio privado.</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-brand-text font-medium">
                          <MapPin size={15} className="text-brand-sage-dark flex-shrink-0" />
                          <span>Calle Toltecas 3446, Monraz, Guadalajara, Jal.</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-brand-text font-medium">
                          <CreditCard size={15} className="text-brand-muted flex-shrink-0" />
                          <span>Pago en efectivo o transferencia bancaria el día de la cita.</span>
                        </div>
                      </div>

                      <a
                        href="https://calendar.app.google/jSvAQqKxyrVtb7jt6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-xl"
                      >
                        <Button
                          variant="primary"
                          className="w-full flex items-center justify-center gap-2 py-3.5 shadow-soft-sm"
                        >
                          <MapPin size={18} /> Agendar sesión presencial
                        </Button>
                      </a>
                    </div>
                  )}

                  <p className="text-[11px] text-brand-muted/80 mt-4 text-center font-sans">
                    Serás redirigido a la agenda oficial y cifrada en Google Calendar.
                  </p>

                  <div className="mt-6 pt-5 border-t border-brand-sage/15 flex items-center justify-center gap-4 text-xs text-brand-muted">
                    <span className="flex items-center gap-1.5 font-medium">
                      <CheckCircle size={14} className="text-brand-sage-dark" />
                      Sin intermediarios
                    </span>
                    <span className="w-1 h-1 rounded-full bg-brand-sage/50" />
                    <span className="flex items-center gap-1.5 font-medium">
                      <CheckCircle size={14} className="text-brand-sage-dark" />
                      Confirmación inmediata por correo
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
