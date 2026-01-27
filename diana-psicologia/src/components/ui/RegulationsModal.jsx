import React from 'react';
import { X, Copy, Check, AlertCircle, Clock, Video, CreditCard } from 'lucide-react';
import Button from './Button';

const RegulationsModal = ({ isOpen, onClose, isAdmin }) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    const textToCopy = `Hola, te comparto los lineamientos para nuestras sesiones de terapia:\n\n1. CANCELACIONES: Para reagendar o cancelar, es necesario avisar con al menos 24 horas de anticipación. De lo contrario, la sesión generará honorarios completos.\n\n2. PUNTUALIDAD: La sesión dura 60 minutos. Hay una tolerancia de 15 minutos; pasado este tiempo, la sesión se dará por cancelada y se cobrará.\n\n3. TERAPIA ONLINE: Es indispensable estar en un lugar privado, cerrado y sin distracciones. Por tu seguridad y la calidad del proceso, NO se realizarán sesiones si estás conduciendo, en transporte público o espacios ruidosos.\n\n4. PAGOS: El pago se realiza previo a la sesión o al finalizar la misma (Efectivo o Transferencia).\n\nGracias por tu compromiso con tu proceso.`;
    
    navigator.clipboard.writeText(textToCopy);
    alert("¡Texto copiado! Ahora puedes pegarlo en WhatsApp.");
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Fondo oscuro backdrop */}
      <div 
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="bg-brand-cream rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto relative z-10 animate-fade-in-up border border-brand-sand">
        
        {/* Header */}
        <div className="sticky top-0 bg-brand-cream/95 backdrop-blur-md border-b border-brand-sand p-6 flex justify-between items-center z-20">
          <div>
            <h3 className="text-2xl font-serif font-bold text-brand-dark">Encuadre Terapéutico</h3>
            <p className="text-xs text-brand-terra font-bold tracking-wider uppercase mt-1">Políticas de Citas</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-brand-sand/50 rounded-full text-stone-500 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        {/* Contenido del Reglamento */}
        <div className="p-8 space-y-8">
          
          <div className="bg-brand-sage/20 p-4 rounded-xl border border-brand-sage/30 flex gap-3 items-start">
             <AlertCircle className="text-brand-sage shrink-0 mt-1" />
             <p className="text-sm text-brand-dark font-light">
               Este reglamento tiene como objetivo proteger tu espacio terapéutico y asegurar la calidad de la atención profesional que mereces.
             </p>
          </div>

          <section>
            <h4 className="flex items-center gap-2 font-bold text-brand-dark text-lg mb-3">
              <Clock className="text-brand-terra" size={20}/> Cancelaciones y Asistencia
            </h4>
            <ul className="space-y-3 text-stone-600 font-light list-disc pl-5">
              <li>
                Para cancelar o reprogramar, es necesario notificar con al menos <strong className="text-brand-dark font-bold">24 horas de anticipación</strong>.
              </li>
              <li className="text-brand-terra font-medium">
                Las citas canceladas con menos de 24 horas o la inasistencia (No Show) causarán honorarios completos y deberán ser cubiertas antes de la siguiente sesión.
              </li>
              <li>
                La sesión tiene una duración de <strong>60 minutos</strong>. Se otorga una tolerancia de 15 minutos; pasado este tiempo, la sesión se dará por vista.
              </li>
            </ul>
          </section>

          <hr className="border-brand-sand" />

          <section>
            <h4 className="flex items-center gap-2 font-bold text-brand-dark text-lg mb-3">
              <Video className="text-brand-terra" size={20}/> Código para Sesiones Online
            </h4>
            <p className="text-stone-600 font-light mb-3">
              Para garantizar la confidencialidad y el trabajo profundo, el paciente se compromete a:
            </p>
            <ul className="grid gap-2 text-sm text-stone-600 font-light">
               <li className="flex gap-2 items-center bg-white p-2 rounded-lg border border-brand-sand">
                 <Check size={16} className="text-brand-sage"/> Estar en un lugar privado y cerrado (sin otras personas presentes).
               </li>
               <li className="flex gap-2 items-center bg-white p-2 rounded-lg border border-brand-sand">
                 <Check size={16} className="text-brand-sage"/> Contar con buena conexión a internet y audífonos.
               </li>
               <li className="flex gap-2 items-start bg-red-50 p-2 rounded-lg border border-red-100 text-red-800 font-medium">
                 <X size={16} className="text-red-500 mt-0.5"/> 
                 <span>NO se realizarán sesiones si el paciente está conduciendo, en transporte público, caminando por la calle o en lugares públicos (cafeterías, parques).</span>
               </li>
            </ul>
          </section>

          <hr className="border-brand-sand" />

          <section>
            <h4 className="flex items-center gap-2 font-bold text-brand-dark text-lg mb-3">
              <CreditCard className="text-brand-terra" size={20}/> Honorarios
            </h4>
            <p className="text-stone-600 font-light">
              El pago de la sesión se realiza preferentemente por transferencia bancaria previo a la sesión, o en efectivo al finalizar la misma (solo presencial).
            </p>
          </section>

        </div>
        
        {/* Footer del Modal con Botones */}
        <div className="p-6 border-t border-brand-sand bg-brand-sand/30 flex flex-wrap justify-end gap-3">
            
            {/* ESTE BOTÓN SOLO LO VE DIANA (ADMIN) */}
            {isAdmin && (
              <Button onClick={handleCopy} variant="outline" className="text-sm px-4 py-2 bg-white hover:bg-brand-terra hover:text-white border-brand-terra text-brand-terra">
                <Copy size={16} /> Copiar para WhatsApp
              </Button>
            )}
            
            {/* ESTE BOTÓN LO VEN TODOS */}
            <Button onClick={onClose} variant="primary" className="text-sm px-6 py-2 bg-brand-dark hover:bg-brand-terra">
              <Check size={16} /> Leído y de Acuerdo
            </Button>
        </div>
      </div>
    </div>
  );
};

export default RegulationsModal;