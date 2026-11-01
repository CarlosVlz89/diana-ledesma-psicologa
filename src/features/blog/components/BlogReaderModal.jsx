/**
 * Componente BlogReaderModal
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Diálogo modal accesible (WAI-ARIA Dialog) para la lectura extendida
 * de un artículo. Soporta cierre con Escape, bloqueo de scroll en fondo
 * y controles accesibles.
 */

import React, { useEffect, useRef } from 'react';
import { X, Calendar as CalendarIcon, User } from 'lucide-react';
import Button from '../../../components/ui/Button.jsx';
import { CATEGORY_IMAGES, formatBlogDate } from '../utils/blogConstants.js';

/**
 * @param {{
 *   post: {
 *     id: string,
 *     title: string,
 *     content: string,
 *     category?: string,
 *     imageUrl?: string,
 *     createdAt?: any
 *   } | null,
 *   onClose: () => void
 * }} props
 */
export const BlogReaderModal = ({ post, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!post) return;

    // Bloqueo de scroll en el fondo mientras el modal está activo
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Cierre mediante tecla Escape
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  const category = post.category || 'Bienestar';
  const displayImage = post.imageUrl || CATEGORY_IMAGES[category] || CATEGORY_IMAGES['Bienestar'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-reader-title"
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Telón de fondo */}
      <div
        className="absolute inset-0 bg-brand-text/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenedor del Modal */}
      <div
        ref={modalRef}
        className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10 animate-fade-in-up flex flex-col bg-brand-bg rounded-3xl shadow-2xl border border-white/60 focus:outline-none"
        tabIndex={-1}
      >
        {/* Cabecera Gráfica */}
        <div className="h-64 sm:h-80 relative shrink-0">
          <img
            src={displayImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar artículo"
            className="absolute top-4 right-4 bg-white/70 hover:bg-white text-brand-text p-2.5 rounded-full backdrop-blur-md transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            <X size={22} />
          </button>
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-brand-text/85 via-brand-text/40 to-transparent p-6 sm:p-8 pt-20">
            <span className="bg-brand-sage/90 text-brand-bg px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block border border-white/20">
              {category}
            </span>
            <h2
              id="blog-reader-title"
              className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-bg leading-tight"
            >
              {post.title}
            </h2>
          </div>
        </div>

        {/* Cuerpo del Artículo */}
        <div className="p-6 sm:p-10 bg-brand-bg/95">
          <div className="flex items-center gap-6 text-xs sm:text-sm text-brand-text/70 mb-8 border-b border-brand-sage/20 pb-4">
            <div className="flex items-center gap-2">
              <User size={16} className="text-brand-accent" />
              <span>Diana Ledesma</span>
            </div>
            <div className="flex items-center gap-2 text-brand-sage font-medium">
              <CalendarIcon size={16} />
              <time>{formatBlogDate(post.createdAt)}</time>
            </div>
          </div>

          <div className="prose prose-stone prose-lg max-w-none font-sans leading-relaxed whitespace-pre-line text-brand-text/90">
            {post.content}
          </div>

          <div className="mt-12 pt-8 border-t border-brand-sage/20 text-center">
            <Button onClick={onClose} variant="outline">
              Cerrar artículo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogReaderModal;
