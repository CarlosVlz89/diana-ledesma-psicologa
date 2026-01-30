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
      {/* Fondo oscuro más opaco para resaltar el papel */}
      <div 
        className="absolute inset-0 bg-brand-text/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal tipo "Hoja de Papel" (Fondo Sólido) */}
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto relative z-10 animate-fade-in-up bg-brand-bg rounded-3xl shadow-2xl border border-white/60">
        
        {/* Header (Fondo sólido) */}
        <div className="sticky top-0 bg-brand-bg z-20 border-b border-brand-sage/20 p-6 flex justify-between items-center shadow-sm">
          <div>
            <h3 className="text-2xl font-serif font-bold text-brand-text">Encuadre Terapéutico</h3>
            <p className="text-xs text-brand-sage font-bold tracking-wider uppercase mt-1">Políticas de Citas</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-brand-sage/10 rounded-full text-brand-text transition-colors">
            <X size={24} />
          </button>
        </div>
        
        {/* Contenido del Reglamento */}
        <div className="p-8 space-y-8">
          
          {/* Alerta de introducción (Más contraste) */}
          <div className="bg-brand-sage/20 p-5 rounded-2xl border border-brand-sage/30 flex gap-4 items-start">
             <AlertCircle className="text-brand-text shrink-0 mt-1" />
             <p className="text-sm text-brand-text font-sans font-medium">
               Este reglamento tiene como objetivo proteger tu espacio terapéutico y asegurar la calidad de la atención profesional que mereces.
             </p>
          </div>

          <section>
            <h4 className="flex items-center gap-2 font-bold text-brand-text text-lg mb-3">
              <Clock className="text-brand-accent" size={20}/> Cancelaciones y Asistencia
            </h4>
            {/* Texto oscuro sin transparencia para lectura clara */}
            <ul className="space-y-3 text-brand-text font-sans list-disc pl-5">
              <li>
                Para cancelar o reprogramar, es necesario notificar con al menos <strong className="text-brand-accent font-bold">24 horas de anticipación</strong>.
              </li>
              <li className="text-brand-text font-medium bg-red-50 p-2 rounded-lg border border-red-100">
                Las citas canceladas con menos de 24 horas o la inasistencia (No Show) causarán honorarios completos.
              </li>
              <li>
                La sesión tiene una duración de <strong>60 minutos</strong>. Se otorga una tolerancia de 15 minutos.
              </li>
            </ul>
          </section>

          <hr className="border-brand-sage/20" />

          <section>
            <h4 className="flex items-center gap-2 font-bold text-brand-text text-lg mb-3">
              <Video className="text-brand-accent" size={20}/> Código para Sesiones Online
            </h4>
            <ul className="grid gap-2 text-sm text-brand-text font-sans font-medium">
               {/* Tarjetas BLANCAS sólidas para máximo contraste */}
               <li className="flex gap-3 items-center bg-white p-3 rounded-xl border border-brand-sage/20 shadow-sm">
                 <Check size={18} className="text-brand-sage shrink-0"/> Estar en un lugar privado y cerrado.
               </li>
               <li className="flex gap-3 items-center bg-white p-3 rounded-xl border border-brand-sage/20 shadow-sm">
                 <Check size={18} className="text-brand-sage shrink-0"/> Contar con buena conexión a internet y audífonos.
               </li>
               <li className="flex gap-3 items-start bg-red-50 p-3 rounded-xl border border-red-100 text-red-900">
                 <X size={18} className="text-red-500 mt-0.5 shrink-0"/> 
                 <span>NO se realizarán sesiones conduciendo o en espacios públicos.</span>
               </li>
            </ul>
          </section>

          <hr className="border-brand-sage/20" />

          <section>
            <h4 className="flex items-center gap-2 font-bold text-brand-text text-lg mb-3">
              <CreditCard className="text-brand-accent" size={20}/> Honorarios
            </h4>
            <p className="text-brand-text font-sans">
              El pago se realiza preferentemente por transferencia bancaria previo a la sesión.
            </p>
          </section>

        </div>
        
        {/* Footer del Modal */}
        <div className="p-6 border-t border-brand-sage/20 bg-brand-bg flex flex-wrap justify-end gap-3 rounded-b-3xl">
            
            {isAdmin && (
              <Button onClick={handleCopy} variant="outline" className="text-sm px-4 py-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white">
                <Copy size={16} /> Copiar para WhatsApp
              </Button>
            )}
            
            <Button onClick={onClose} variant="primary" className="text-sm px-6 py-2">
              <Check size={16} /> Leído y de Acuerdo
            </Button>
        </div>
      </div>
    </div>
  );
};

export default RegulationsModal;