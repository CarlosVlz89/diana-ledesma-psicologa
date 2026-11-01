/**
 * Componente BlogEditorModal
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Diálogo modal para la redacción o edición de artículos de psicoeducación.
 * Accesible (WAI-ARIA), con validaciones locales, estados de envío y
 * visualización clara de errores (cero fallos silenciados).
 */

import React, { useState, useEffect } from 'react';
import { Edit2, X, AlertCircle } from 'lucide-react';
import Button from '../../../components/ui/Button.jsx';
import { BLOG_CATEGORIES } from '../utils/blogConstants.js';

/**
 * @param {{
 *   isOpen: boolean,
 *   initialPost?: {
 *     id?: string,
 *     title?: string,
 *     content?: string,
 *     category?: string,
 *     imageUrl?: string
 *   } | null,
 *   isSubmitting: boolean,
 *   onSave: (postData: { title: string, content: string, category: string, imageUrl: string }) => Promise<boolean>,
 *   onClose: () => void
 * }} props
 */
export const BlogEditorModal = ({
  isOpen,
  initialPost = null,
  isSubmitting = false,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Bienestar',
    imageUrl: '',
  });
  const [localError, setLocalError] = useState('');

  // Sincroniza los datos cuando se abre para edición o creación
  useEffect(() => {
    if (initialPost) {
      setFormData({
        title: initialPost.title || '',
        content: initialPost.content || '',
        category: initialPost.category || 'Bienestar',
        imageUrl: initialPost.imageUrl || '',
      });
    } else {
      setFormData({
        title: '',
        content: '',
        category: 'Bienestar',
        imageUrl: '',
      });
    }
    setLocalError('');
  }, [initialPost, isOpen]);

  // Manejo de Escape y bloqueo de scroll
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const isEditingMode = Boolean(initialPost && initialPost.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    const title = formData.title.trim();
    const content = formData.content.trim();

    if (title.length < 5) {
      setLocalError('El título debe contener al menos 5 caracteres.');
      return;
    }

    if (content.length < 20) {
      setLocalError('El contenido debe contener al menos 20 caracteres.');
      return;
    }

    const success = await onSave({
      title,
      content,
      category: formData.category,
      imageUrl: formData.imageUrl.trim(),
    });

    if (success) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-editor-title"
      className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Telón de fondo */}
      <div
        className="absolute inset-0 bg-brand-text/50 backdrop-blur-sm transition-opacity"
        onClick={() => {
          if (!isSubmitting) onClose();
        }}
        aria-hidden="true"
      />

      {/* Contenedor del Formulario */}
      <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 animate-fade-in-up bg-white rounded-3xl shadow-2xl border border-white/60 p-6 sm:p-8">
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-brand-sage/20">
          <h3
            id="blog-editor-title"
            className="text-2xl font-serif font-bold text-brand-text flex items-center gap-2"
          >
            <Edit2 size={22} className="text-brand-accent" />
            {isEditingMode ? 'Editar artículo' : 'Nuevo artículo'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Cerrar editor"
            className="p-2 hover:bg-brand-sage/10 rounded-full text-brand-text transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mensaje de error local visible */}
        {localError && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3"
          >
            <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
            <span>{localError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="post-title"
              className="block text-sm font-medium text-brand-text mb-1"
            >
              Título del artículo *
            </label>
            <input
              id="post-title"
              type="text"
              required
              disabled={isSubmitting}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3.5 border border-brand-sage/30 rounded-xl bg-brand-bg/40 outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all text-brand-text disabled:opacity-50"
              placeholder="Ej. Herramientas de aceptación en momentos de crisis"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="post-category"
                className="block text-sm font-medium text-brand-text mb-1"
              >
                Categoría *
              </label>
              <select
                id="post-category"
                value={formData.category}
                disabled={isSubmitting}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3.5 border border-brand-sage/30 rounded-xl bg-brand-bg/40 outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all text-brand-text disabled:opacity-50"
              >
                {BLOG_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="post-image"
                className="block text-sm font-medium text-brand-text mb-1"
              >
                URL de imagen de portada (Opcional)
              </label>
              <input
                id="post-image"
                type="url"
                disabled={isSubmitting}
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full p-3.5 border border-brand-sage/30 rounded-xl bg-brand-bg/40 outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all text-brand-text disabled:opacity-50"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="post-content"
              className="block text-sm font-medium text-brand-text mb-1"
            >
              Contenido del artículo *
            </label>
            <textarea
              id="post-content"
              required
              rows={8}
              disabled={isSubmitting}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-3.5 border border-brand-sage/30 rounded-xl bg-brand-bg/40 outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all text-brand-text leading-relaxed disabled:opacity-50"
              placeholder="Redacta el contenido psicoeducativo aquí..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-brand-sage/10">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
              className="text-sm px-6 py-2.5"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="text-sm px-8 py-2.5"
            >
              {isSubmitting
                ? 'Guardando...'
                : isEditingMode
                ? 'Actualizar artículo'
                : 'Publicar artículo'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditorModal;
