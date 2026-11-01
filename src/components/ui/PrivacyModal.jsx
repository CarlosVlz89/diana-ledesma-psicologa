/**
 * Modal de Aviso de Privacidad
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Diálogo modal accesible que detalla el tratamiento de datos personales
 * conforme a la LFPDPPP y el ejercicio de derechos ARCO.
 * Construido sobre el componente primitivo Modal (WAI-ARIA).
 */

import React from 'react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';

export const PrivacyModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Aviso de privacidad"
      closeAriaLabel="Cerrar aviso de privacidad"
      footer={
        <Button onClick={onClose} variant="primary">
          Entendido
        </Button>
      }
    >
      <div className="prose prose-stone text-brand-text/85 leading-relaxed font-sans text-sm sm:text-base">
        <p className="text-xs text-brand-sage font-medium mb-4">
          Última actualización: Enero 2026
        </p>
        <p>
          <strong>Diana Ledesma</strong>, con domicilio en Calle Toltecas 3446, Col. Monraz, 44670 Guadalajara, Jalisco, es la responsable del uso y protección de sus datos personales, y al respecto le informa lo siguiente:
        </p>

        <h4 className="font-bold text-brand-text mt-4">
          ¿Para qué fines utilizaremos sus datos personales?
        </h4>
        <p>
          Los datos personales que recabamos de usted (nombre, teléfono, correo electrónico) los utilizaremos para las siguientes finalidades que son necesarias para el servicio terapéutico solicitado:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Agendar y confirmar sus citas terapéuticas.</li>
          <li>Contactarlo en caso de cambios de horario o reprogramaciones.</li>
          <li>Facturación electrónica (en caso de requerirla).</li>
        </ul>

        <h4 className="font-bold text-brand-text mt-6">
          ¿Dónde puedo consultar el aviso de privacidad integral?
        </h4>
        <p>
          Para conocer mayor información sobre los términos y condiciones en que serán tratados sus datos personales, y la forma en que podrá ejercer sus derechos ARCO (Acceso, Rectificación, Cancelación y Oposición), puede solicitar el aviso de privacidad integral enviando un correo a{' '}
          <a
            href="mailto:contacto@dianaledesma.com"
            className="text-brand-accent underline hover:text-brand-text transition-colors"
          >
            contacto@dianaledesma.com
          </a>
          .
        </p>
      </div>
    </Modal>
  );
};

export default PrivacyModal;
