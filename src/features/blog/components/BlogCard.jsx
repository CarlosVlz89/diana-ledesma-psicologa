/**
 * Componente BlogCard
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Renderiza la tarjeta de previsualización de un artículo de psicoeducación.
 * Accesible por teclado (WAI-ARIA, foco visual, eventos Enter/Space) y
 * provista de acciones administrativas de edición y borrado aisladas.
 * Refinado con superficie en cristal cálido, badge Soft Glass de alto contraste
 * legible sobre cualquier fotografía, y enlaces de lectura en terracota.
 */

import React from 'react';
import { Calendar as CalendarIcon, ArrowRight, Edit2, Trash2 } from 'lucide-react';
import { CATEGORY_IMAGES, formatBlogDate, calcReadingTime } from '../utils/blogConstants.js';

/**
 * @param {{
 *   post: {
 *     id: string,
 *     title: string,
 *     content: string,
 *     category?: string,
 *     imageUrl?: string,
 *     createdAt?: any
 *   },
 *   isAdmin: boolean,
 *   onSelect: (post: any) => void,
 *   onEdit: (post: any) => void,
 *   onDelete: (id: string) => void,
 *   className?: string
 * }} props
 */
export const BlogCard = ({
  post,
  isAdmin,
  onSelect,
  onEdit,
  onDelete,
  className = '',
}) => {
  const category = post.category || 'Bienestar';
  const displayImage = post.imageUrl || CATEGORY_IMAGES[category] || CATEGORY_IMAGES['Bienestar'];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(post);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(post);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(post.id);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect(post)}
      onKeyDown={handleKeyDown}
      aria-label={`Leer artículo: ${post.title}`}
      className={`glass-card-warm flex flex-col h-full group bg-white/95 rounded-2xl border border-brand-sage/20 hover:border-brand-accent/40 shadow-soft-sm hover:shadow-soft-md hover:-translate-y-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Portada */}
      <div className="h-44 sm:h-52 relative overflow-hidden bg-brand-surface">
        <img
          src={displayImage}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Insignia Soft Glass de Alta Legibilidad y Contraste WAI-ARIA */}
        <span className="bg-white/90 backdrop-blur-md text-brand-text border border-brand-sage/20 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full shadow-soft-sm absolute top-3 left-3">
          {category}
        </span>
      </div>

      {/* Contenido */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1.5 text-xs text-brand-muted font-medium font-sans">
              <CalendarIcon size={13} className="text-brand-sage shrink-0" />
              <time>{formatBlogDate(post.createdAt)}</time>
            </div>

            {isAdmin && (
              <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={handleEditClick}
                  aria-label={`Editar ${post.title}`}
                  className="p-1.5 hover:bg-brand-sage-light text-brand-text rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent cursor-pointer"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  aria-label={`Eliminar ${post.title}`}
                  className="p-1.5 hover:bg-red-50 text-brand-text hover:text-red-700 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-brand-text mb-2.5 leading-snug group-hover:text-brand-terracotta transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-brand-muted text-xs sm:text-sm font-sans leading-relaxed line-clamp-3 mb-4">
            {post.content}
          </p>
        </div>

        <div className="pt-3.5 border-t border-brand-sage/15 flex justify-between items-center text-xs">
          <span className="text-brand-muted/80 font-medium">
            {calcReadingTime(post.content)}
          </span>
          <span className="text-brand-terracotta font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Leer artículo <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
