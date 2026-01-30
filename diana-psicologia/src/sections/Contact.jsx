import React from 'react';
import { MapPin, Phone, Instagram, Calendar, CheckCircle } from 'lucide-react';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';

const Contact = () => (
  <div className="bg-gradient-to-t from-brand-sage/20 to-transparent">
    <Section id="contact">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Columna Izquierda: Datos de Contacto */}
        <Reveal>
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-text mb-6">Contacto y Agenda</h2>
            <p className="text-brand-text/80 text-lg mb-8 font-sans">
              Dar el primer paso es lo más importante. Estoy aquí para resolver tus dudas y acompañarte en el proceso.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="bg-white/60 p-3 rounded-full shadow-sm text-brand-accent group-hover:scale-110 transition-transform border border-white/50 backdrop-blur-sm">
                  <MapPin />
                </div>
                <div>
                  <h4 className="font-bold text-brand-text">Consultorio</h4>
                  <p className="text-brand-text/70">Colonia Providencia / Zona Centro<br/>Guadalajara, Jalisco.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="bg-white/60 p-3 rounded-full shadow-sm text-brand-sage group-hover:scale-110 transition-transform border border-white/50 backdrop-blur-sm">
                  <Phone />
                </div>
                <div>
                  <h4 className="font-bold text-brand-text">WhatsApp</h4>
                  <p className="text-brand-text/70 mb-2">33 1836 3829</p>
                  <a href="https://wa.me/523318363829" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-brand-sage hover:text-brand-accent hover:underline transition-colors">
                    Enviar mensaje directo →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-white/60 p-3 rounded-full shadow-sm text-brand-accent group-hover:scale-110 transition-transform border border-white/50 backdrop-blur-sm">
                  <Instagram />
                </div>
                <div>
                  <h4 className="font-bold text-brand-text">Instagram</h4>
                  <p className="text-brand-text/70 mb-2">Psic. Diana Ledesma</p>
                  <a 
                    href="https://www.instagram.com/psic.dianaledesma?utm_source=qr&igsh=NTdmdjk4dDE1enJp" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-bold text-brand-accent hover:text-brand-text hover:underline transition-colors"
                  >
                    Ver contenido y tips →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Columna Derecha: Tarjeta Verde (Estilo de tu captura) */}
        <Reveal delay={200}>
          {/* Fondo Verde Salvia Sólido/Glass */}
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl bg-brand-sage p-10 border border-white/20">
            
            {/* Marca de agua decorativa (Icono grande transparente) */}
            <Calendar className="absolute -top-6 -right-6 w-48 h-48 text-brand-text opacity-5 rotate-12" />

            <h3 className="text-3xl font-serif font-bold text-brand-text mb-4 relative z-10 text-center">
              Reserva tu primera sesión
            </h3>
            
            <p className="text-brand-text/70 font-sans text-center mb-8 relative z-10">
              Consulta mi disponibilidad en tiempo real a través de Google Calendar y elige el horario que mejor se adapte a tu ritmo de vida.
            </p>
            
            {/* Botón Arcilla (Accent) */}
            <div className="relative z-10">
              <Button className="w-full shadow-xl hover:shadow-2xl" variant="primary">
                 Abrir Calendario <Calendar size={18}/>
              </Button>
              <p className="text-xs text-brand-text/40 mt-4 text-center">
                Serás redirigido al sistema seguro de citas.
              </p>
            </div>

            {/* Sección inferior con líneas divisorias sutiles */}
            <div className="mt-8 pt-6 border-t border-brand-text/10">
               <ul className="text-sm text-brand-text/60 space-y-3 font-sans font-medium">
                 <li className="flex items-center gap-3">
                   <div className="p-1 bg-brand-text/10 rounded-full"><CheckCircle size={12}/></div>
                   Duración de sesión: 60 minutos.
                 </li>
                 <li className="flex items-center gap-3">
                   <div className="p-1 bg-brand-text/10 rounded-full"><CheckCircle size={12}/></div>
                   Modalidad: Presencial y Online.
                 </li>
                 <li className="flex items-center gap-3">
                   <div className="p-1 bg-brand-text/10 rounded-full"><CheckCircle size={12}/></div>
                   Pago: Efectivo o Transferencia.
                 </li>
               </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  </div>
);

export default Contact;