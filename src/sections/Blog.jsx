/**
 * Sección Blog de Salud Mental (Orquestador Editorial Desacoplado)
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Arquitectura editorial balanceada y responsiva:
 * - Móvil (< 768px): Carrusel táctil horizontal con snap-center, peek affordance (w-[82vw])
 *   y micro-dots de paginación reactivos, eliminando el scroll vertical infinito para que
 *   la sección de Contacto permanezca inmediatamente accesible.
 * - Escritorio (>= 768px): Layout Editorial Asimétrico (Post Destacado 60% col-span-7 +
 *   Artículos Recientes 40% col-span-5 en tarjetas horizontales compactas), erradicando
 *   tarjetas huérfanas en segundas filas y ofreciendo expansión opcional de histórico.
 * - Badges Soft Glass de alto contraste (WAI-ARIA) legibles sobre cualquier imagen.
 * - Botón administrativo discreto para que no compita en jerarquía visual con los CTAs de pacientes.
 * - Diálogo modal de confirmación accesible para eliminación destructiva (sin confirm nativo).
 */

import React, { useState, useRef, lazy, Suspense } from 'react';
import {
  Plus,
  ChevronDown,
  ChevronUp,
  Loader2,
  Calendar as CalendarIcon,
  ArrowRight,
  Edit2,
  Trash2,
} from 'lucide-react';
import Section from '../components/ui/Section.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Button from '../components/ui/Button.jsx';
import Toast from '../components/ui/Toast.jsx';
import Modal from '../components/ui/Modal.jsx';
import BlogCard from '../features/blog/components/BlogCard.jsx';
import { useBlogPosts } from '../features/blog/hooks/useBlogPosts.js';
import { useAuth } from '../hooks/useAuth.js';
import {
  CATEGORY_IMAGES,
  formatBlogDate,
  calcReadingTime,
} from '../features/blog/utils/blogConstants.js';

// Carga perezosa de modales bajo demanda
const BlogReaderModal = lazy(() => import('../features/blog/components/BlogReaderModal.jsx'));
const BlogEditorModal = lazy(() => import('../features/blog/components/BlogEditorModal.jsx'));

export const Blog = () => {
  const { user, isAdmin } = useAuth();
  const {
    posts,
    loading,
    error,
    isSubmitting,
    notification,
    handleCreate,
    handleUpdate,
    handleDelete,
    clearNotification,
  } = useBlogPosts();

  // Estados de interfaz y modales
  const [showAll, setShowAll] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Modal de confirmación para eliminación destructiva (Zero native alert/confirm)
  const [postToDelete, setPostToDelete] = useState(null);

  // Carrusel horizontal para móvil
  const [mobileIndex, setMobileIndex] = useState(0);
  const mobileCarouselRef = useRef(null);

  const handleOpenCreateModal = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handleOpenEditModal = (post) => {
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingPost(null);
  };

  const handleSavePost = async (formData) => {
    if (editingPost && editingPost.id) {
      return await handleUpdate(editingPost.id, formData);
    }
    return await handleCreate(formData, user);
  };

  const handleDeleteRequest = (id) => {
    setPostToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;
    const id = postToDelete;
    setPostToDelete(null);
    await handleDelete(id);
  };

  const handleCancelDelete = () => {
    setPostToDelete(null);
  };

  // Sincronización del índice activo en el carrusel móvil
  const handleMobileScroll = () => {
    if (!mobileCarouselRef.current) return;
    const container = mobileCarouselRef.current;
    const scrollLeft = container.scrollLeft;
    const firstCard = container.firstElementChild;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 16; // gap-4 = 16px
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setMobileIndex(Math.min(Math.max(index, 0), posts.length - 1));
  };

  const scrollToMobileCard = (index) => {
    if (!mobileCarouselRef.current) return;
    const container = mobileCarouselRef.current;
    const cards = container.children;
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setMobileIndex(index);
    }
  };

  // Desglose editorial para escritorio
  const featuredPost = posts.length > 0 ? posts[0] : null;
  const recentPosts = posts.length > 1 ? posts.slice(1, 4) : [];
  const extraPosts = posts.length > 4 ? posts.slice(4) : [];

  const featuredCategory = featuredPost?.category || 'Bienestar';
  const featuredImage =
    featuredPost?.imageUrl || CATEGORY_IMAGES[featuredCategory] || CATEGORY_IMAGES['Bienestar'];

  return (
    <Section id="blog" className="relative py-16 sm:py-20">
      {/* Notificación Toast accesible */}
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
      )}

      {/* Encabezado Editorial */}
      <Reveal>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-12 gap-4 border-b border-brand-sage/20 pb-6 sm:pb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-text">
              Blog de salud mental
            </h2>
            <div className="h-1 w-20 bg-brand-accent mt-3 rounded-full" />
            <p className="mt-3 text-brand-muted text-sm sm:text-base font-sans max-w-xl leading-relaxed">
              Herramientas, reflexiones y psicoeducación basada en evidencia para tu bienestar cotidiano.
            </p>
          </div>

          {/* Botón administrativo discreto (no compite con CTAs clínicos) */}
          {isAdmin && (
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="border border-brand-sage/30 bg-white/70 hover:bg-brand-surface text-brand-text px-4 py-2 rounded-xl text-xs font-medium shadow-soft-sm hover:shadow-soft-md transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent shrink-0"
            >
              <Plus size={16} className="text-brand-terracotta" />
              <span>Nuevo artículo</span>
            </button>
          )}
        </div>
      </Reveal>

      {/* Estado de Carga */}
      {loading && (
        <div className="py-20 flex flex-col items-center justify-center text-brand-sage gap-3">
          <Loader2 className="animate-spin text-brand-terracotta" size={32} />
          <p className="text-sm font-sans font-medium text-brand-muted">Cargando artículos de psicoeducación...</p>
        </div>
      )}

      {/* Estado Vacío */}
      {!loading && posts.length === 0 && (
        <div className="py-16 text-center text-brand-text/70 bg-white/60 rounded-3xl border border-brand-sage/20 p-8 max-w-xl mx-auto shadow-soft-sm">
          <p className="text-base font-sans mb-4">
            Aún no hay artículos publicados en este momento.
          </p>
          {isAdmin && (
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="border border-brand-sage/30 bg-white hover:bg-brand-surface text-brand-text px-4 py-2 rounded-xl text-xs font-medium shadow-soft-sm transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus size={16} className="text-brand-terracotta" />
              <span>Publicar primer artículo</span>
            </button>
          )}
        </div>
      )}

      {/* Layout de Contenidos */}
      {!loading && posts.length > 0 && (
        <>
          {/* 1. Carrusel Táctil Horizontal para Móvil (< 768px) */}
          <div className="block md:hidden">
            <div
              ref={mobileCarouselRef}
              onScroll={handleMobileScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 py-3 -mx-4 gap-4 overscroll-x-contain [-webkit-overflow-scrolling:touch]"
            >
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="w-[82vw] max-w-[320px] flex-shrink-0 snap-center"
                >
                  <BlogCard
                    post={post}
                    isAdmin={isAdmin}
                    onSelect={setSelectedPost}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteRequest}
                  />
                </div>
              ))}
            </div>

            {/* Micro-dots de paginación sincronizados con el carrusel móvil */}
            {posts.length > 1 && (
              <div
                className="flex items-center justify-center gap-1.5 mt-3"
                role="tablist"
                aria-label="Indicadores del blog"
              >
                {posts.map((post, idx) => (
                  <button
                    key={post.id || idx}
                    type="button"
                    onClick={() => scrollToMobileCard(idx)}
                    aria-label={`Ir al artículo ${idx + 1}: ${post.title}`}
                    aria-current={mobileIndex === idx ? 'true' : undefined}
                    className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta ${
                      mobileIndex === idx
                        ? 'w-6 h-2 bg-brand-terracotta'
                        : 'w-2 h-2 bg-brand-sage/30 hover:bg-brand-sage/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 2. Layout Editorial Asimétrico para Escritorio (>= 768px) */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-8 items-stretch">
            {/* Si solo hay 1 artículo publicado */}
            {posts.length === 1 && (
              <div className="col-span-12 max-w-2xl mx-auto w-full">
                <BlogCard
                  post={featuredPost}
                  isAdmin={isAdmin}
                  onSelect={setSelectedPost}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteRequest}
                />
              </div>
            )}

            {/* Layout Asimétrico 60% / 40% (2 o más artículos) */}
            {posts.length >= 2 && (
              <>
                {/* Columna Izquierda: Post Destacado (col-span-7) */}
                <div className="col-span-7 flex flex-col">
                  <article
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedPost(featuredPost)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedPost(featuredPost);
                      }
                    }}
                    aria-label={`Leer artículo destacado: ${featuredPost.title}`}
                    className="glass-card-warm bg-white/95 rounded-2xl border border-brand-sage/20 hover:border-brand-accent/40 shadow-soft-sm hover:shadow-soft-md transition-all duration-300 p-6 flex flex-col justify-between group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent h-full"
                  >
                    <div>
                      {/* Portada amplia 16/9 */}
                      <div className="aspect-[16/9] rounded-xl overflow-hidden relative shadow-soft-sm mb-5 bg-brand-surface">
                        <img
                          src={featuredImage}
                          alt={featuredPost.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Insignia Soft Glass de Alta Legibilidad y Contraste */}
                        <span className="bg-white/90 backdrop-blur-md text-brand-text border border-brand-sage/20 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full shadow-soft-sm absolute top-3 left-3">
                          {featuredCategory}
                        </span>
                        <span className="bg-brand-surface/90 backdrop-blur-md text-brand-terracotta border border-brand-accent/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-soft-sm absolute top-3 right-3">
                          Destacado
                        </span>
                      </div>

                      {/* Metadatos */}
                      <div className="flex items-center justify-between text-xs text-brand-muted mb-3 font-sans">
                        <div className="flex items-center gap-2">
                          <CalendarIcon size={13} className="text-brand-sage" />
                          <time>{formatBlogDate(featuredPost.createdAt)}</time>
                          <span>•</span>
                          <span>Por Diana Ledesma</span>
                        </div>

                        {isAdmin && (
                          <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenEditModal(featuredPost);
                              }}
                              aria-label={`Editar ${featuredPost.title}`}
                              className="p-1.5 hover:bg-brand-sage-light text-brand-text rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent cursor-pointer"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteRequest(featuredPost.id);
                              }}
                              aria-label={`Eliminar ${featuredPost.title}`}
                              className="p-1.5 hover:bg-red-50 text-brand-text hover:text-red-700 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Título H3 en Playfair Display */}
                      <h3 className="font-serif text-2xl lg:text-3xl text-brand-text font-bold leading-snug group-hover:text-brand-terracotta cursor-pointer transition-colors mb-3 line-clamp-2">
                        {featuredPost.title}
                      </h3>

                      {/* Extracto amplio */}
                      <p className="text-brand-muted text-sm font-sans leading-relaxed mb-5 line-clamp-3">
                        {featuredPost.content}
                      </p>
                    </div>

                    {/* Enlace accesible de lectura */}
                    <div className="pt-4 border-t border-brand-sage/15 flex items-center justify-between text-sm">
                      <span className="text-xs text-brand-muted/80 font-medium">
                        {calcReadingTime(featuredPost.content)}
                      </span>
                      <span className="text-brand-terracotta font-semibold inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                        Leer artículo completo <ArrowRight size={15} />
                      </span>
                    </div>
                  </article>
                </div>

                {/* Columna Derecha: Artículos Recientes (col-span-5) */}
                <div className="col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-brand-sage/20">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-brand-muted font-sans">
                        Artículos recientes
                      </h4>
                      <span className="text-xs text-brand-muted/70 font-sans">
                        {recentPosts.length} {recentPosts.length === 1 ? 'publicación' : 'publicaciones'}
                      </span>
                    </div>

                    <div className="flex flex-col divide-y divide-brand-sage/15 bg-white/70 rounded-2xl border border-brand-sage/20 p-4 shadow-soft-sm">
                      {recentPosts.map((post) => {
                        const postCategory = post.category || 'Bienestar';
                        const postImage =
                          post.imageUrl || CATEGORY_IMAGES[postCategory] || CATEGORY_IMAGES['Bienestar'];

                        return (
                          <article
                            key={post.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedPost(post)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setSelectedPost(post);
                              }
                            }}
                            aria-label={`Leer artículo: ${post.title}`}
                            className="py-3.5 first:pt-1 last:pb-1 flex gap-4 items-center group cursor-pointer hover:bg-white/80 rounded-xl px-2 -mx-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                          >
                            {/* Miniatura cuadrada */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 relative shadow-soft-sm bg-brand-surface">
                              <img
                                src={postImage}
                                alt={post.title}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>

                            {/* Contenido lateral */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-sage-dark bg-brand-sage-light px-2 py-0.5 rounded-full w-fit">
                                    {postCategory}
                                  </span>

                                  {isAdmin && (
                                    <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleOpenEditModal(post);
                                        }}
                                        aria-label={`Editar ${post.title}`}
                                        className="p-1 hover:bg-brand-sage-light text-brand-text rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent cursor-pointer"
                                      >
                                        <Edit2 size={12} />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteRequest(post.id);
                                        }}
                                        aria-label={`Eliminar ${post.title}`}
                                        className="p-1 hover:bg-red-50 text-brand-text hover:text-red-700 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 cursor-pointer"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  )}
                                </div>

                                <h5 className="font-serif text-sm lg:text-base font-bold text-brand-text group-hover:text-brand-terracotta transition-colors line-clamp-2 leading-snug mb-1">
                                  {post.title}
                                </h5>
                              </div>

                              <div className="flex items-center justify-between text-xs text-brand-muted/80 pt-1">
                                <time>{formatBlogDate(post.createdAt)}</time>
                                <span className="text-brand-terracotta font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                  Leer <ArrowRight size={12} />
                                </span>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Cuadrícula expandible para artículos restantes (si posts > 4) */}
          {showAll && extraPosts.length > 0 && (
            <div className="mt-8 pt-8 border-t border-brand-sage/20 grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in hidden md:grid">
              {extraPosts.map((post, idx) => (
                <Reveal key={post.id} delay={idx * 80}>
                  <BlogCard
                    post={post}
                    isAdmin={isAdmin}
                    onSelect={setSelectedPost}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteRequest}
                  />
                </Reveal>
              ))}
            </div>
          )}

          {/* Botón Ver Más / Ver Menos para histórico en escritorio */}
          {posts.length > 4 && (
            <div className="mt-10 text-center animate-fade-in hidden md:block">
              <Button
                onClick={() => setShowAll(!showAll)}
                variant="outline"
                className="min-w-[220px]"
              >
                {showAll ? (
                  <span className="flex items-center gap-2">
                    Ver menos artículos <ChevronUp size={18} />
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Ver más artículos ({extraPosts.length} restantes){' '}
                    <ChevronDown size={18} />
                  </span>
                )}
              </Button>
            </div>
          )}
        </>
      )}

      {/* Modal de Confirmación para Eliminación Destructiva (Cumplimiento Regla 6.2 AGENTS.md) */}
      {postToDelete && (
        <Modal
          isOpen={Boolean(postToDelete)}
          onClose={handleCancelDelete}
          title="Eliminar artículo"
          maxWidth="max-w-md"
          footer={
            <div className="flex justify-end gap-3 w-full">
              <Button variant="outline" onClick={handleCancelDelete}>
                Cancelar
              </Button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                Confirmar eliminación
              </button>
            </div>
          }
        >
          <p className="text-brand-text/80 text-sm font-sans leading-relaxed">
            ¿Estás segura de que deseas eliminar este artículo de psicoeducación? Esta acción es permanente y no se podrá recuperar.
          </p>
        </Modal>
      )}

      {/* Modales con Carga Perezosa (Code Splitting vía Suspense) */}
      <Suspense fallback={null}>
        {selectedPost && (
          <BlogReaderModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}

        {isEditorOpen && (
          <BlogEditorModal
            isOpen={isEditorOpen}
            initialPost={editingPost}
            isSubmitting={isSubmitting}
            onSave={handleSavePost}
            onClose={handleCloseEditor}
          />
        )}
      </Suspense>
    </Section>
  );
};

export default Blog;
