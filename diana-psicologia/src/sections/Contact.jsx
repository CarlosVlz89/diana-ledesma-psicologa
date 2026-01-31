import React from 'react';
import { MapPin, Phone, Instagram, Calendar, CheckCircle, ArrowRight, Video, User } from 'lucide-react';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';

const Contact = () => (
  <div className="bg-gradient-to-t from-brand-sage/20 to-transparent">
    <Section id="contact">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Columna Izquierda (Se mantiene igual) */}
        <Reveal>
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-text mb-6">Contacto y Agenda</h2>
            <p className="text-brand-text/80 text-lg mb-8 font-sans">
              Dar el primer paso es lo más importante. Estoy aquí para resolver tus dudas y acompañarte en el proceso.
            </p>
            
            <div className="space-y-8">
              {/* UBICACIÓN */}
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="bg-white/60 p-3 rounded-full shadow-sm text-brand-accent group-hover:scale-110 transition-transform duration-300 border border-white/50 backdrop-blur-sm">
                  <MapPin />
                </div>
                <div>
                  <h4 className="font-bold text-brand-text mb-1">Consultorio</h4>
                  <a href="https://maps.app.goo.gl/389pHWCyAvtYHotB6" target="_blank" rel="noopener noreferrer" className="text-brand-text/70 group-hover:text-brand-accent transition-colors block leading-relaxed">
                    Calle Toltecas 3446, Monraz,<br/>44670 Guadalajara, Jal.
                    <span className="text-xs font-bold flex items-center gap-1 mt-2 text-brand-sage">
                      Ver ubicación en Maps <ArrowRight size={14}/>
                    </span>
                  </a>
                </div>
              </div>
              
              {/* WHATSAPP */}
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="bg-white/60 p-3 rounded-full shadow-sm text-brand-sage group-hover:scale-110 transition-transform duration-300 border border-white/50 backdrop-blur-sm">
                  <Phone />
                </div>
                <div>
                  <h4 className="font-bold text-brand-text mb-1">WhatsApp</h4>
                  <a href="https://wa.me/523318363829" target="_blank" rel="noopener noreferrer" className="text-brand-text/70 group-hover:text-brand-accent transition-colors block leading-relaxed">
                    33 1836 3829<br/>
                    <span className="text-xs font-bold flex items-center gap-1 mt-2 text-brand-sage">
                      Enviar mensaje directo <ArrowRight size={14}/>
                    </span>
                  </a>
                </div>
              </div>

              {/* INSTAGRAM */}
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="bg-white/60 p-3 rounded-full shadow-sm text-brand-accent group-hover:scale-110 transition-transform duration-300 border border-white/50 backdrop-blur-sm">
                  <Instagram />
                </div>
                <div>
                  <h4 className="font-bold text-brand-text mb-1">Instagram</h4>
                  <a href="https://www.instagram.com/psic.dianaledesma?utm_source=qr&igsh=NTdmdjk4dDE1enJp" target="_blank" rel="noopener noreferrer" className="text-brand-text/70 group-hover:text-brand-accent transition-colors block leading-relaxed">
                    Psic. Diana Ledesma<br/>
                    <span className="text-xs font-bold flex items-center gap-1 mt-2 text-brand-sage">
                      Ver contenido y tips <ArrowRight size={14}/>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Columna Derecha: Tarjeta Agenda con DOBLE BOTÓN */}
        <Reveal delay={200}>
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl bg-brand-accent/5 backdrop-blur-md p-10 border border-brand-accent/10">
            <Calendar className="absolute -top-6 -right-6 w-48 h-48 text-brand-accent opacity-5 rotate-12" />

            <h3 className="text-3xl font-serif font-bold text-brand-text mb-4 relative z-10 text-center">
              Encuentra tu momento ideal
            </h3>
            <p className="text-brand-text/80 font-sans text-center mb-8 relative z-10 leading-relaxed">
              Elige la modalidad que prefieras para ver los horarios disponibles:
            </p>
            
            <div className="grid gap-4 relative z-10">
              {/* BOTÓN 1: ONLINE */}
              <a 
                /* 👇 PEGA AQUÍ EL LINK DE LA AGENDA ONLINE 👇 */
                href="https://calendar.app.google/7tm3XgfTdGsZntvN8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full shadow-lg bg-brand-sage text-white hover:bg-brand-text border-none font-bold flex items-center justify-center gap-2">
                   <Video size={18}/> Cita Online (Google Meet)
                </Button>
              </a>

              {/* BOTÓN 2: PRESENCIAL */}
              <a 
                /* 👇 PEGA AQUÍ EL LINK DE LA AGENDA PRESENCIAL 👇 */
                href="https://calendar.app.google/jSvAQqKxyrVtb7jt6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full shadow-lg bg-brand-accent text-white hover:bg-brand-text border-none font-bold flex items-center justify-center gap-2">
                   <User size={18}/> Cita Presencial
                </Button>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-brand-accent/10">
               <ul className="text-sm text-brand-text/70 space-y-3 font-sans font-medium">
                 <li className="flex items-center gap-3">
                   <div className="p-1 bg-brand-accent/10 text-brand-accent rounded-full"><CheckCircle size={12}/></div>
                   Duración de sesión: 60 minutos.
                 </li>
                 <li className="flex items-center gap-3">
                   <div className="p-1 bg-brand-accent/10 text-brand-accent rounded-full"><CheckCircle size={12}/></div>
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