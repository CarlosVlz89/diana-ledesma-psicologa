/**
 * Sección Mis Servicios (Flujo Natural en Móvil y Scrollytelling Pinned en 3 Fases en Escritorio)
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Comportamiento responsive:
 * - Móvil (< 768px / < md): Flujo vertical natural (h-auto py-16) sin altura fija ni
 *   overflow-y-auto interno en las tarjetas, mostrando de golpe los 5 bloques clínicos con
 *   legibilidad >= 14px (text-sm) y carrusel horizontal snap-x + pastilla Apple siempre visibles.
 * - Escritorio (>= 768px / md:+): Scrollytelling Pinned 220vh en 3 fases:
 *   - Fase 1 (progress < 0.25): Título y subtítulo centrados sobre salvia bruma (#E6ECE5).
 *   - Fase 2 (0.25 <= progress < 0.65): Transición cinemática al crema base (#FAF3E0) y subida del título.
 *   - Fase 3 (progress >= 0.65): 4 tarjetas apaisadas 60/40 explorables horizontalmente y pastilla Apple.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Heart,
  Brain,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  ShieldCheck,
} from 'lucide-react';

export const Services = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const carouselRef = useRef(null);
  const initialHeaderHeightRef = useRef(0);

  // Detección de viewport desktop (>= 768px) para activar Scrollytelling Pinned solo en md:+
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );

  // Progreso normalizado de scroll (0.0 a 1.0) a lo largo de la pista fija en escritorio
  const [progress, setProgress] = useState(0);
  const [centerOffset, setCenterOffset] = useState(240);

  // Estados para la paginación y el arrastre con ratón (Drag-to-Scroll)
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Detección de accesibilidad (prefers-reduced-motion)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const services = [
    {
      id: 'adultos',
      category: 'Modalidad clínica individual',
      title: 'Terapia individual para adultos',
      desc: 'Un espacio de escucha confidencial y estructurado para abordar periodos de incertidumbre, procesar duelos significativos, regular estados de angustia y transformar patrones de ansiedad o depresión en bienestar duradero.',
      tags: ['Ansiedad y estrés', 'Depresión', 'Procesos de duelo', 'Crecimiento personal'],
      icon: User,
      quote: 'Comprender lo que sientes es el primer paso para actuar con firmeza hacia lo que verdaderamente valoras.',
      duration: '50 a 60 min',
      modality: 'Online o Presencial',
      framework: 'Espacio confidencial y ético',
      // Identidad cromática suave: Arcilla cálida suave
      bgCard: 'bg-[#FAF5EF]',
      borderCard: 'border-[#E8DDD0]',
      borderAccent: 'border-l-[#854B24]',
      accentColor: 'text-[#854B24]',
      hoverAccent: 'group-hover:text-[#854B24]',
      iconBg: 'bg-[#854B24]/10 text-[#854B24]',
      boxRightBg: 'bg-[#F4ECE2]/80',
      tagBg: 'bg-[#F4ECE2] text-[#6E3B1B]',
    },
    {
      id: 'ninos-adolescentes',
      category: 'Atención infanto-juvenil',
      title: 'Niños y adolescentes',
      desc: 'Acompañamiento especializado en el desarrollo socioemocional, regulación conductual y fortalecimiento de la autoestima, creando puentes de comunicación asertiva entre el paciente y su entorno familiar.',
      tags: ['Desde 10 años', 'Regulación emocional', 'Autoestima', 'Orientación familiar'],
      icon: Heart,
      quote: 'Validar las emociones de un niño o joven construye los cimientos de su seguridad para toda la vida.',
      duration: '50 a 60 min',
      modality: 'Presencial y Online',
      framework: 'Enfoque colaborativo con padres',
      // Identidad cromática suave: Salvia orgánico suave
      bgCard: 'bg-[#F2F6F3]',
      borderCard: 'border-[#D8E3DA]',
      borderAccent: 'border-l-[#4D584D]',
      accentColor: 'text-[#4D584D]',
      hoverAccent: 'group-hover:text-[#4D584D]',
      iconBg: 'bg-[#4D584D]/10 text-[#4D584D]',
      boxRightBg: 'bg-[#E5ECE6]/80',
      tagBg: 'bg-[#E5ECE6] text-[#3B463B]',
    },
    {
      id: 'tcc',
      category: 'Metodología basada en evidencia',
      title: 'Enfoque cognitivo-conductual',
      desc: 'Intervención estructurada y respaldada por la ciencia para identificar patrones cognitivos distorsionados y reemplazarlos por conductas adaptativas orientadas a metas concretas y medibles.',
      tags: ['Reestructuración cognitiva', 'Resolución de problemas', 'Metas claras', 'Alta efectividad'],
      icon: Brain,
      quote: 'No son los hechos los que perturban a las personas, sino los juicios y narrativas que hacen sobre ellos.',
      duration: '50 a 60 min',
      modality: 'Online o Presencial',
      framework: 'Seguimiento de metas sesión a sesión',
      // Identidad cromática suave: Azul niebla tenue
      bgCard: 'bg-[#F1F5F8]',
      borderCard: 'border-[#D3E0EA]',
      borderAccent: 'border-l-[#3B627D]',
      accentColor: 'text-[#3B627D]',
      hoverAccent: 'group-hover:text-[#3B627D]',
      iconBg: 'bg-[#3B627D]/10 text-[#3B627D]',
      boxRightBg: 'bg-[#E3EDF4]/80',
      tagBg: 'bg-[#E3EDF4] text-[#2C4E65]',
    },
    {
      id: 'contextuales',
      category: 'Terapias de tercera generación',
      title: 'Terapias contextuales (ACT / DBT)',
      desc: 'Modelos contemporáneos enfocados en la flexibilidad psicológica, la aceptación compasiva del malestar inevitable y el compromiso inquebrantable con acciones coherentes con tus valores de vida.',
      tags: ['Aceptación y compromiso (ACT)', 'Dialéctico-conductual (DBT)', 'Trastorno límite de la personalidad (TLP)', 'Mindfulness clínico'],
      icon: BookOpen,
      quote: 'Aprender a hacer espacio al malestar para poder caminar con ligereza hacia una vida con sentido profundo.',
      duration: '50 a 60 min',
      modality: 'Online o Presencial',
      framework: 'Recursos vivenciales prácticos',
      // Identidad cromática suave: Lavanda empolvada introspectiva
      bgCard: 'bg-[#F6F2F7]',
      borderCard: 'border-[#E1D6E3]',
      borderAccent: 'border-l-[#6A4D73]',
      accentColor: 'text-[#6A4D73]',
      hoverAccent: 'group-hover:text-[#6A4D73]',
      iconBg: 'bg-[#6A4D73]/10 text-[#6A4D73]',
      boxRightBg: 'bg-[#EFE8F1]/80',
      tagBg: 'bg-[#EFE8F1] text-[#55385E]',
    },
  ];

  // 1. Accesibilidad: verificación de movimiento reducido
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleMotionChange);
      return () => mediaQuery.removeEventListener('change', handleMotionChange);
    }
  }, []);

  // 2. Cálculo reactivo del progreso del Scrollytelling Pinned (solo en escritorio >= 768px)
  useEffect(() => {
    let animationFrameId = null;

    const updateMetrics = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);

      if (!desktop) {
        setProgress(0);
        return;
      }

      if (!headerRef.current) return;
      if (initialHeaderHeightRef.current === 0) {
        initialHeaderHeightRef.current = headerRef.current.offsetHeight;
      }
      const windowH = window.innerHeight;
      const headerH = initialHeaderHeightRef.current || 140;
      const topPadding = 40;
      const offset = Math.max(0, windowH / 2 - headerH / 2 - topPadding);
      setCenterOffset(offset);
    };

    const handleScroll = () => {
      if (window.innerWidth < 768 || !containerRef.current) return;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = window.requestAnimationFrame(() => {
        if (window.innerWidth < 768 || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const scrollDistance = containerRef.current.offsetHeight - window.innerHeight;
        if (scrollDistance <= 0) {
          setProgress(0);
          return;
        }

        const currentScroll = Math.min(Math.max(-rect.top, 0), scrollDistance);
        const rawProgress = currentScroll / scrollDistance;
        const normalized = Math.round(rawProgress * 1000) / 1000;

        setProgress((prev) => (Math.abs(prev - normalized) > 0.002 ? normalized : prev));
      });
    };

    const handleResize = () => {
      updateMetrics();
      handleScroll();
    };

    updateMetrics();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const getCarouselGap = (container) => {
    if (!container || typeof window === 'undefined') return 24;
    const styles = window.getComputedStyle(container);
    const parsed = parseFloat(styles.columnGap || styles.gap || '24');
    return Number.isFinite(parsed) ? parsed : 24;
  };

  // 3. Sincronización del índice activo mediante el desplazamiento horizontal
  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const firstCard = container.firstElementChild;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = getCarouselGap(container);
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(Math.max(index, 0), services.length - 1));
  };

  // 4. Manejadores de Arrastre con Ratón (Drag-to-Scroll en escritorio)
  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setIsDragging(true);
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const distance = x - startXRef.current;

    if (Math.abs(distance) > 5) {
      hasDraggedRef.current = true;
    }

    carouselRef.current.scrollLeft = scrollLeftRef.current - distance * 1.25;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  // 5. Navegación por botones y dots (Apple Bottom Bar)
  const scrollByDirection = (direction) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const firstCard = container.firstElementChild;
    const gap = getCarouselGap(container);
    const slideWidth = firstCard ? firstCard.offsetWidth + gap : window.innerWidth * 0.75;

    container.scrollBy({
      left: direction * slideWidth,
      behavior: 'smooth',
    });
  };

  const scrollToCard = (index) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cards = container.children;
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setActiveIndex(index);
    }
  };

  // -------------------------------------------------------------
  // Cálculos matemáticos de la coreografía en 3 fases (solo md:+):
  // -------------------------------------------------------------
  const isPinnedActive = isDesktop && !prefersReducedMotion;

  // 0. Capa cromática ambiental de fondo:
  // Fase 1 (progress <= 0.20): opacidad 100% (tono salvia bruma orgánico)
  // Fase 2 (0.20 < progress < 0.60): se difumina suavemente hacia el crema base
  // Fase 3 (progress >= 0.60): opacidad 0% (fondo crema base restaurado al 100%)
  let overlayOpacity = 1;
  if (progress >= 0.6) {
    overlayOpacity = 0;
  } else if (progress > 0.2) {
    overlayOpacity = Math.max(0, 1 - (progress - 0.2) / 0.4);
  }

  // 1. Subtítulo:
  // Fase 1 (progress < 0.25): opacidad 100%
  // Fase 2 (0.25 <= progress < 0.50): se desvanece suavemente hasta desaparecer
  // Fase 3 (progress >= 0.50): opacidad 0
  let subtitleOpacity = 1;
  if (progress >= 0.5) {
    subtitleOpacity = 0;
  } else if (progress >= 0.25) {
    subtitleOpacity = Math.max(0, 1 - (progress - 0.25) / 0.25);
  }
  const subtitleTranslateY = progress >= 0.25 ? -Math.min(16, (progress - 0.25) * 64) : 0;

  // 2. Título principal:
  // Fase 1 (progress < 0.25): centrado verticalmente en la pantalla (offset = centerOffset)
  // Fase 2 (0.25 <= progress < 0.65): se desplaza fluidamente hacia la cabecera superior
  // Fase 3 (progress >= 0.65): anclado en la cabecera superior (offset = 0)
  let titleProgress = 0;
  if (progress >= 0.65) {
    titleProgress = 1;
  } else if (progress >= 0.25) {
    titleProgress = (progress - 0.25) / 0.4;
  }
  const easeTitle = titleProgress * titleProgress * (3 - 2 * titleProgress);
  const currentTitleOffset = (1 - easeTitle) * centerOffset;

  // 3. Carrusel de tarjetas y pastilla de controles:
  // Fase 1 (progress < 0.30): completamente invisible (opacidad 0, translateY 90px, escala 0.95, pointer-events: none)
  // Fase 2 (0.30 <= progress < 0.65): emerge gradualmente (fade-in + slide-up)
  // Fase 3 (progress >= 0.65): opacidad 100%, escala 1.0, interacción completa activa
  let carouselProgress = 0;
  if (progress >= 0.65) {
    carouselProgress = 1;
  } else if (progress >= 0.3) {
    carouselProgress = (progress - 0.3) / 0.35;
  }
  const easeCarousel = carouselProgress * carouselProgress * (3 - 2 * carouselProgress);
  const cardsOpacity = Math.min(1, Math.max(0, carouselProgress));
  const cardsTranslateY = (1 - easeCarousel) * 90;
  const cardsScale = 0.95 + easeCarousel * 0.05;
  const isInteractive = !isPinnedActive || progress >= 0.6;

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative h-auto py-16 md:py-0 md:h-[220vh] bg-transparent"
    >
      <span id="servicios" className="sr-only" aria-hidden="true" />

      {/* Escenario natural en móvil (< md) y Pinned en viewport en escritorio (md:+) */}
      <div className="relative md:sticky md:top-0 h-auto md:h-screen w-full md:overflow-hidden flex flex-col justify-between gap-6 md:gap-0 md:py-10">
        {/* Capa de fondo cromático ambiental (solo escritorio md:+; en móvil conserva el crema base #FAF3E0) */}
        <div
          style={
            isPinnedActive
              ? {
                  opacity: overlayOpacity,
                  willChange: 'opacity',
                }
              : undefined
          }
          className="hidden md:block absolute inset-0 pointer-events-none -z-20 bg-gradient-to-b from-[#E2E8E1] via-[#E6ECE5] to-brand-bg transition-opacity duration-300 ease-out"
          aria-hidden="true"
        />

        {/* Orbes de ambientación decorativa sutil en el fondo (confinados para evitar overflow horizontal) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
          aria-hidden="true"
        >
          <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-brand-sage/15 blur-3xl" />
          <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-brand-terracotta/10 blur-3xl" />
        </div>

        {/* Cabecera Cinemática Coreografiada en escritorio / Estática legible en móvil */}
        <div
          ref={headerRef}
          style={
            isPinnedActive
              ? {
                  transform: `translate3d(0, ${currentTitleOffset}px, 0)`,
                  willChange: 'transform',
                }
              : undefined
          }
          className="text-center px-4 max-w-3xl mx-auto shrink-0 z-20 transition-transform duration-100 ease-out"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-surface border border-brand-accent/25 text-brand-terracotta text-xs font-bold tracking-wider uppercase mb-2 sm:mb-3 shadow-soft-sm">
            Especialidades clínicas
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-text mb-2 sm:mb-3">
            Mis servicios
          </h2>
          <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mb-3" />
          <p
            style={
              isPinnedActive
                ? {
                    opacity: subtitleOpacity,
                    transform: `translate3d(0, ${subtitleTranslateY}px, 0)`,
                    maxHeight: progress >= 0.5 ? '0px' : '100px',
                    marginBottom: progress >= 0.5 ? '0px' : '0.75rem',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, margin-bottom 0.4s ease',
                  }
                : undefined
            }
            className="max-w-2xl mx-auto text-brand-muted font-sans text-sm md:text-base leading-relaxed"
          >
            Un enfoque profesional, cálido y fundamentado en la ciencia, adaptado a tus necesidades específicas y a tu ritmo personal.
          </p>
        </div>

        {/* Carrusel Horizontal de Tarjetas con Identidad Cromática Suave Diferenciada (Puramente Informativas) */}
        <div
          style={
            isPinnedActive
              ? {
                  opacity: cardsOpacity,
                  transform: `translate3d(0, ${cardsTranslateY}px, 0) scale(${cardsScale})`,
                  pointerEvents: isInteractive ? 'auto' : 'none',
                  willChange: 'transform, opacity',
                }
              : undefined
          }
          className="w-full relative overflow-hidden md:flex-1 flex items-center transition-all duration-150 ease-out md:my-auto"
        >
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={`flex items-stretch gap-5 sm:gap-7 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-5 sm:px-12 py-3 sm:py-4 select-none overscroll-x-contain [-webkit-overflow-scrolling:touch] w-full ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <article
                  key={service.id}
                  className={`w-[86vw] sm:w-[78vw] max-w-4xl flex-shrink-0 snap-center ${service.bgCard} ${service.borderCard} backdrop-blur-md rounded-[1.75rem] sm:rounded-[2.5rem] border border-l-4 ${service.borderAccent} p-5 sm:p-7 md:p-8 lg:p-10 shadow-soft-sm hover:shadow-soft-md flex flex-col md:flex-row gap-3.5 md:gap-6 lg:gap-8 items-stretch justify-between relative h-auto overflow-hidden group transition-all`}
                >
                  {/* Resplandor ambiental decorativo interior suave */}
                  <div
                    className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-white/40 blur-2xl pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Columna Izquierda: Información de Especialidad (aprox 60%) */}
                  <div className="w-full md:w-[58%] flex flex-col justify-between text-left relative z-10">
                    <div>
                      {/* Micro-badge de Categoría */}
                      <span className="inline-block bg-white/80 backdrop-blur-sm text-brand-text/90 text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2 md:mb-3 border border-black/5 shadow-soft-sm">
                        {service.category}
                      </span>

                      {/* Título H3 en Playfair Display */}
                      <h3 className={`font-serif text-xl sm:text-2xl lg:text-3xl text-brand-text font-bold mb-2 md:mb-3 leading-snug ${service.hoverAccent} transition-colors`}>
                        {service.title}
                      </h3>

                      {/* Párrafo Descriptivo (>= 14px para legibilidad clínica) */}
                      <p className="text-brand-muted text-sm md:text-base leading-relaxed mb-3.5 md:mb-5 font-sans">
                        {service.desc}
                      </p>

                      {/* Micro-chips Temáticos con paleta tonal específica */}
                      <div className="flex flex-wrap gap-1.5">
                        {service.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className={`text-xs px-2.5 py-1 rounded-md font-medium border border-black/5 ${service.tagBg}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Columna Derecha: Tarjeta Somática y Ficha Técnica (aprox 40%) */}
                  <div className="w-full md:w-[42%] flex flex-col justify-between relative z-10">
                    <div className={`${service.boxRightBg} ${service.borderCard} rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border flex flex-col justify-between h-full w-full text-left shadow-soft-sm backdrop-blur-sm`}>
                      {/* Icono e Identidad con Cita Clínica */}
                      <div>
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${service.iconBg} flex items-center justify-center mb-2.5 md:mb-4 shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                          <IconComponent size={22} className="md:w-6 md:h-6" />
                        </div>
                        <blockquote className="italic font-serif text-sm text-brand-text/90 leading-relaxed mb-3 md:mb-4 border-l-2 border-brand-accent/50 pl-3">
                          "{service.quote}"
                        </blockquote>
                      </div>

                      {/* Ficha Técnica Breve */}
                      <div className="border-t border-black/5 pt-2.5 md:pt-3 space-y-1.5 text-sm text-brand-muted font-sans">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-brand-sage-dark shrink-0" />
                          <span>
                            <strong>Duración:</strong> {service.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-brand-sage-dark shrink-0" />
                          <span>
                            <strong>Modalidad:</strong> {service.modality}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ShieldCheck size={14} className="text-brand-sage-dark shrink-0" />
                          <span>
                            <strong>Encuadre:</strong> {service.framework}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Pastilla de Control Inferior estilo Apple (siempre visible en móvil; coreografiada en escritorio) */}
        <div
          style={
            isPinnedActive
              ? {
                  opacity: cardsOpacity,
                  transform: `translate3d(0, ${cardsTranslateY * 0.5}px, 0)`,
                  pointerEvents: isInteractive ? 'auto' : 'none',
                  willChange: 'transform, opacity',
                }
              : undefined
          }
          className="flex items-center justify-center relative z-20 px-4 shrink-0 transition-all duration-150 ease-out"
        >
          <div className="bg-brand-surface/90 backdrop-blur-md px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-brand-sage/25 shadow-soft-md flex items-center gap-2 sm:gap-3 mx-auto w-fit">
            {/* Botón Anterior */}
            <button
              type="button"
              onClick={() => scrollByDirection(-1)}
              disabled={activeIndex === 0}
              aria-label="Servicio anterior"
              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full text-brand-text hover:text-brand-terracotta hover:bg-brand-sage/10 transition-colors disabled:opacity-30 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Micro-píldoras de paginación */}
            <div
              className="flex items-center gap-0.5"
              role="group"
              aria-label="Indicadores de servicios"
            >
              {services.map((service, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToCard(idx)}
                  aria-label={`Ir al servicio ${idx + 1}: ${service.title}`}
                  aria-current={activeIndex === idx ? 'true' : undefined}
                  className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta cursor-pointer group/dot"
                >
                  <span
                    aria-hidden="true"
                    className={`transition-all duration-300 rounded-full block ${
                      activeIndex === idx
                        ? 'w-7 h-2.5 bg-brand-terracotta'
                        : 'w-2.5 h-2.5 bg-brand-sage/30 group-hover/dot:bg-brand-sage/50'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Botón Siguiente */}
            <button
              type="button"
              onClick={() => scrollByDirection(1)}
              disabled={activeIndex === services.length - 1}
              aria-label="Servicio siguiente"
              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full text-brand-text hover:text-brand-terracotta hover:bg-brand-sage/10 transition-colors disabled:opacity-30 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
