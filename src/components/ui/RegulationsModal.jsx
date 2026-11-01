/**
 * Modal de Encuadre Terapéutico y Políticas de Citas
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Diálogo modal accesible (WAI-ARIA) que presenta el encuadre clínico,
 * lineamientos de sesión y políticas de cancelación.
 * Basado en el componente primitivo Modal.
 */

import React, { useState } from 'react';
import { Copy, Check, AlertCircle, Clock, Video, CreditCard } from 'lucide-react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';

export const RegulationsModal = ({ isOpen, onClose, isAdmin: propIsAdmin }) => {
  const auth = useAuth();
  const isAdmin = propIsAdmin !== undefined ? propIsAdmin : (auth?.isAdmin ?? false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `Hola, te comparto los lineamientos para nuestras sesiones de terapia:\n\n1. CANCELACIONES: Para reagendar o cancelar, es necesario avisar con al menos 24 horas de anticipación. De lo contrario, la sesión generará honorarios completos.\n\n2. PUNTUALIDAD: La sesión dura 60 minutos. Hay una tolerancia de 15 minutos; pasado este tiempo, la sesión se dará por cancelada y se cobrará.\n\n3. TERAPIA ONLINE: Es indispensable estar en un lugar privado, cerrado y sin distracciones. Por tu seguridad y la calidad del proceso, NO se realizarán sesiones si estás conduciendo, en transporte público o espacios ruidosos.\n\n4. PAGOS: El pago se realiza previo a la sesión o al finalizar la misma (Efectivo o Transferencia).\n\nGracias por tu compromiso con tu proceso.`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  };

  const modalFooter = (
    <>
      {isAdmin && (
        <Button
          onClick={handleCopy}
          variant="outline"
          className="text-sm px-4 py-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white"
        >
          {copied ? (
            <>
              <Check size={16} /> ¡Copiado al portapapeles!
            </>
          ) : (
            <>
              <Copy size={16} /> Copiar para WhatsApp
            </>
          )}
        </Button>
      )}

      <Button onClick={onClose} variant="primary" className="text-sm px-6 py-2">
        <Check size={16} /> Leído y de acuerdo
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Encuadre terapéutico"
      subtitle="Políticas de citas"
      closeAriaLabel="Cerrar encuadre terapéutico"
      footer={modalFooter}
    >
      <div className="space-y-8">
        {/* Alerta de introducción */}
        <div className="bg-brand-sage/20 p-5 rounded-2xl border border-brand-sage/30 flex gap-4 items-start">
          <AlertCircle className="text-brand-text shrink-0 mt-1" />
          <p className="text-sm text-brand-text font-sans font-medium">
            Este reglamento tiene como objetivo proteger tu espacio terapéutico y asegurar la calidad de la atención profesional que mereces.
          </p>
        </div>

        {/* Sección: Cancelaciones */}
        <section>
          <h4 className="flex items-center gap-2 font-bold text-brand-text text-lg mb-3">
            <Clock className="text-brand-accent" size={20} /> Cancelaciones y asistencia
          </h4>
          <ul className="space-y-3 text-brand-text font-sans list-disc pl-5 text-sm sm:text-base">
            <li>
              Para cancelar o reprogramar, es necesario notificar con al menos{' '}
              <strong className="text-brand-accent font-bold">24 horas de anticipación</strong>.
            </li>
            <li className="text-brand-text font-medium bg-red-50 p-2.5 rounded-lg border border-red-100">
              Las citas canceladas con menos de 24 horas o la inasistencia (No Show) causarán honorarios completos.
            </li>
            <li>
              La sesión tiene una duración de <strong>60 minutos</strong>. Se otorga una tolerancia de 15 minutos.
            </li>
          </ul>
        </section>

        <hr className="border-brand-sage/20" />

        {/* Sección: Sesiones Online */}
        <section>
          <h4 className="flex items-center gap-2 font-bold text-brand-text text-lg mb-3">
            <Video className="text-brand-accent" size={20} /> Código para sesiones online
          </h4>
          <ul className="grid gap-2 text-sm text-brand-text font-sans font-medium">
            <li className="flex gap-3 items-center bg-white p-3 rounded-xl border border-brand-sage/20 shadow-sm">
              <Check size={18} className="text-brand-sage shrink-0" /> Estar en un lugar privado y cerrado.
            </li>
            <li className="flex gap-3 items-center bg-white p-3 rounded-xl border border-brand-sage/20 shadow-sm">
              <Check size={18} className="text-brand-sage shrink-0" /> Contar con buena conexión a internet y audífonos.
            </li>
            <li className="flex gap-3 items-start bg-red-50 p-3 rounded-xl border border-red-100 text-red-900">
              <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
              <span>NO se realizarán sesiones conduciendo o en espacios públicos.</span>
            </li>
          </ul>
        </section>

        <hr className="border-brand-sage/20" />

        {/* Sección: Honorarios */}
        <section>
          <h4 className="flex items-center gap-2 font-bold text-brand-text text-lg mb-3">
            <CreditCard className="text-brand-accent" size={20} /> Honorarios
          </h4>
          <p className="text-brand-text font-sans leading-relaxed text-sm sm:text-base">
            El pago se realiza preferentemente por transferencia bancaria previo a la sesión o en efectivo al finalizar la misma.
          </p>
        </section>
      </div>
    </Modal>
  );
};

export default RegulationsModal;
