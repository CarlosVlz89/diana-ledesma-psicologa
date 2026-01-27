import React from 'react';
import { MapPin, Phone, Instagram, Calendar, CheckCircle } from 'lucide-react';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';

const Contact = () => (
  // Fondo gradiente cálido (Crema a un toque muy suave de Arena)
  <div className="bg-gradient-to-br from-brand-cream via-brand-cream to-brand-sage/10">
    <Section id="contact">
      <div className="grid lg:grid-cols-2 gap-16">
        <Reveal>
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6">Contacto y Agenda</h2>
            <p className="text-stone-600 text-lg mb-8 font-light">
              Dar el primer paso es lo más importante. Estoy aquí para resolver tus dudas y acompañarte en el proceso.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="bg-white p-3 rounded-full shadow-sm text-brand-terra group-hover:scale-110 transition-transform border border-brand-sand">
                  <MapPin />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark">Consultorio</h4>
                  <p className="text-stone-600">Colonia Providencia / Zona Centro<br/>Guadalajara, Jalisco.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="bg-white p-3 rounded-full shadow-sm text-brand-sage group-hover:scale-110 transition-transform border border-brand-sand">
                  <Phone />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark">WhatsApp</h4>
                  <p className="text-stone-600 mb-2">33 1836 3829</p>
                  {/* Enlace en Salvia Oscuro */}
                  <a href="https://wa.me/523318363829" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-brand-sage hover:text-brand-dark hover:underline transition-colors">
                    Enviar mensaje directo →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-white p-3 rounded-full shadow-sm text-brand-terra group-hover:scale-110 transition-transform border border-brand-sand">
                  <Instagram />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark">Instagram</h4>
                  <p className="text-stone-600 mb-2">@dianaledesma.psic</p>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-brand-terra hover:text-brand-dark hover:underline transition-colors">
                    Ver contenido y tips →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          {/* Tarjeta Glass con borde Salvia muy sutil */}
          <div className="glass-card p-8 border border-white/60 relative overflow-hidden">
            {/* Barra superior decorativa degradado Tierra */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-terra to-brand-sage"></div>
            
            <h3 className="text-2xl font-bold text-brand-dark mb-6">Agenda tu Sesión</h3>
            
            <div className="bg-white/50 rounded-xl p-6 text-center mb-8 border border-brand-sand">
              <Calendar className="w-12 h-12 text-brand-terra mx-auto mb-3 animate-float" />
              <p className="text-brand-dark font-medium mb-4">
                Consulta disponibilidad en tiempo real.
              </p>
              
              {/* BOTÓN PRINCIPAL: Cambiado de Azul a Carboncillo (Dark) para elegancia */}
              <Button className="w-full bg-brand-dark hover:bg-brand-terra text-brand-cream shadow-lg">
                 Ver Horarios Disponibles
              </Button>
              
              <p className="text-xs text-stone-500 mt-3 font-light">
                Serás redirigido al sistema seguro de citas.
              </p>
            </div>

            <div className="border-t border-brand-sand pt-6">
              <h4 className="font-bold text-brand-dark mb-2">Dudas rápidas</h4>
               <ul className="text-sm text-stone-600 space-y-2 font-light">
                 {/* Checkmarks en Salvia */}
                 <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-sage"/> Duración de sesión: 60 minutos.</li>
                 <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-sage"/> Modalidad: Presencial y Online (Zoom).</li>
                 <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-sage"/> Pago: Efectivo o Transferencia.</li>
               </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  </div>
);

export default Contact;