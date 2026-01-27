// src/components/ui/PrivacyModal.jsx
import React from 'react';
import { X } from 'lucide-react';
import Button from './Button';

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto relative z-10 animate-fade-in-up">
        <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-stone-100 p-4 flex justify-between items-center z-20">
          <h3 className="text-xl font-serif font-bold text-stone-800">Aviso de Privacidad</h3>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full text-stone-500 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 prose prose-stone text-stone-600">
          <p className="text-sm text-stone-400 mb-4">Última actualización: Enero 2026</p>
          <p>
            <strong>Diana Ledesma</strong>, con domicilio en Guadalajara, Jalisco, es la responsable del uso y protección de sus datos personales, y al respecto le informa lo siguiente:
          </p>
          
          <h4 className="font-bold text-stone-800 mt-4">¿Para qué fines utilizaremos sus datos personales?</h4>
          <p>
            Los datos personales que recabamos de usted (Nombre, Teléfono, Correo Electrónico) los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Agendar y confirmar sus citas terapéuticas.</li>
            <li>Contactarlo en caso de cambios de horario o emergencias.</li>
            <li>Facturación (en caso de requerirla).</li>
          </ul>

          <h4 className="font-bold text-stone-800 mt-6">¿Dónde puedo consultar el aviso de privacidad integral?</h4>
          <p>
            Para conocer mayor información sobre los términos y condiciones en que serán tratados sus datos personales, y la forma en que podrá ejercer sus derechos ARCO, puede solicitar el aviso de privacidad integral enviando un correo a contacto@dianaledesma.com.
          </p>
        </div>
        
        <div className="p-6 border-t border-stone-100 bg-stone-50 text-right">
          <Button onClick={onClose} variant="primary">Entendido</Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;