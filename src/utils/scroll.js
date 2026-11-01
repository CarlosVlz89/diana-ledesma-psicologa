/**
 * Utilidad de Desplazamiento Suave (Smooth Scroll)
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Maneja la navegación fluida hacia secciones One-Page con soporte
 * bidireccional para identificadores canónicos ('contact'/'contacto', 'services'/'servicios').
 */

export const scrollToSection = (id) => {
  if (!id) return;

  const cleanId = id.startsWith('#') ? id.slice(1) : id;
  const element =
    document.getElementById(cleanId) ||
    (cleanId === 'contacto' ? document.getElementById('contact') : null) ||
    (cleanId === 'contact' ? document.getElementById('contacto') : null) ||
    (cleanId === 'servicios' ? document.getElementById('services') : null) ||
    (cleanId === 'services' ? document.getElementById('servicios') : null);

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default scrollToSection;
