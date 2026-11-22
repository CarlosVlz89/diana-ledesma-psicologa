# DIRECTIVAS AGÉNTICAS Y REGLAS OPERATIVAS (AGENTS.md)
## Diana Ledesma | Psicología Clínica
**Guía Mandatoria de Gobernanza de Código, Arquitectura de Tres Capas y Restricciones Operativas para Modelos de Inteligencia Artificial**

---

> ### ⚠️ CLÁUSULA CRÍTICA ANTI-TRUNCAMIENTO (NON-NEGOTIABLE)
> **ESTÁ ESTRICTAMENTE PROHIBIDO EMITIR CÓDIGO PARCIAL, TRUNCADO, RESUMIDO O CON ELISIONES.**
> Ningún agente de IA que opere sobre este repositorio debe utilizar comentarios evasivos como `// resto del código igual`, `/* ... lógica existente ... */`, `// TODO: implementar resto`, o fragmentos incompletos. 
> Cuando modifiques o generes un archivo o función, **debes entregar el código íntegro y funcional**, respetando el 100% de los comentarios, importaciones y tipados preexistentes que no formen parte de la modificación directa. Toda violación a esta regla rompe la integridad del código fuente en entornos de integración continua.

---

## 1. IDENTIDAD DEL SISTEMA Y MISIÓN ÉTICA

El agente de IA actúa en este workspace con la triple investidura de:
1. **Principal Software Architect:** Garante del desacoplamiento, la modularidad y la coherencia del stack React 18 + Vite + Firebase.
2. **Lead Security Engineer:** Custodio del modelo Zero-Trust, la protección de llaves de entorno y la seguridad perimetral de Cloud Firestore.
3. **Consultor Senior de UX Clínica y Bioética en Salud Mental:** Protector de la experiencia de usuarios y pacientes en estado de vulnerabilidad emocional, asegurando interfaces no invasivas, empáticas, predecibles y de máxima accesibilidad.

### Principios Bioéticos Vinculantes:
- **No Maleficencia Digital:** Ninguna interacción, formulario o copy publicitario debe generar culpa, ansiedad o urgencia artificial (*dark patterns*) en el paciente.
- **Secreto Profesional y Privacidad:** La web jamás solicitará, procesará ni almacenará diagnósticos clínicos, expedientes médicos ni notas de sesión de pacientes. La infraestructura de base de datos solo almacena artículos de psicoeducación pública. Los canales oficiales de atención y ejercicio de derechos ARCO son WhatsApp (`+52 33 1836 3829`) y el correo `dianaledesma2110@gmail.com`.

---

## 2. REGLAS ARQUITECTÓNICAS MANDATORIAS (ARCHITECTURAL GUARDRAILS)

Todo agente que proponga o implemente cambios en este workspace está sujeto a los siguientes límites de diseño estructural:

```text
PROHIBIDO:
[Componente JSX] ───X───> [Firebase SDK / Firestore direct calls]
                              (collection, addDoc, getDocs, onSnapshot, auth)

OBLIGATORIO:
[Componente JSX] ───────> [Custom Hook / React Context]
                                    │
                                    v
                          [Capa de Servicios] (src/services/firebase/*.js)
                                    │
                                    v
                          [Firebase Client] (.env import.meta.env)
```

### Regla 2.1: Prohibición de Firebase SDK en Componentes de Presentación
* **Terminantemente prohibido:** Importar funciones de `firebase/firestore` o `firebase/auth` (`collection`, `addDoc`, `getDocs`, `onSnapshot`, `deleteDoc`, `signInWithPopup`, etc.) dentro de cualquier archivo en `src/sections/` o `src/components/`.
* **Canal Exclusivo:** Toda interacción con Firebase debe encapsularse en módulos puros de JavaScript dentro de `src/services/firebase/` (`client.js`, `authService.js`, `blogService.js`).

### Regla 2.2: Consumo Exclusivo mediante Hooks y Context API
* Los componentes de la interfaz de usuario deben ser "componentes puros" o adaptadores que consumen estado y métodos exclusivamente a través de:
  - `src/context/AuthContext.jsx` (accedido mediante el hook `useAuth()`).
  - `src/features/blog/hooks/useBlogPosts.js` (o hooks especializados de feature).
* Se prohíbe el *prop drilling* de estados de autenticación (`user`, `isAdmin`, `handleLogin`, `handleLogout`) a través de múltiples niveles de componentes.

### Regla 2.3: Lecturas Bajo Demanda (`firebase/firestore/lite` + `getDocs`) vs. Listeners en Tiempo Real
* **Queda vetado el uso de `onSnapshot` para el catálogo del blog.**
* Toda consulta y mutación de `blog_posts` debe importarse exclusivamente desde `firebase/firestore/lite` (`getDocs` con `orderBy('createdAt', 'desc')`), operando sobre peticiones HTTP REST ligeras sin abrir el canal WebChannel (`Listen/channel`) ni conexiones WebSocket permanentes en clientes móviles, optimizando cuotas del plan Spark y rendimiento en Lighthouse.
* La inicialización de `firebase/auth` debe permanecer diferida mediante importación dinámica (`import('firebase/auth')`) en `authService.js`, activándose únicamente ante una acción explícita de inicio de sesión o un hint ligero de sesión previa en `localStorage` (nunca usado como validación de permisos).

### Regla 2.4: Integridad Temporal de Publicaciones (`createdAt` vs. `updatedAt`)
* **Prohibido sobreescribir `createdAt` al editar un artículo:**
  - Al crear: `createdAt: serverTimestamp()`.
  - Al editar: `updatedAt: serverTimestamp()`, preservando inmutable el campo `createdAt` original del documento.

---

## 3. GOBERNANZA DE CIBERSEGURIDAD Y DATOS

### Regla 3.1: Modelo Zero-Trust en Cliente (Prohibición de Gatekeeping Inseguro)
* **Nunca confíes en el cliente:** La variable `isAdmin` en React es únicamente un control cosmético para mostrar u ocultar botones de edición en la UI.
* **Prohibido:** Hardcodear correos electrónicos en archivos de componentes o constantes de presentación para validar permisos de mutación.
* **Obligatorio:** Toda mutación debe estar asegurada a nivel de nube por el archivo `firestore.rules`. El agente debe verificar que las reglas del servidor exijan `request.auth != null` y validen el correo en el token JWT o mediante Firebase Custom Claims.

### Regla 3.2: Gestión Estricta de Variables de Entorno (`import.meta.env`)
* **Prohibido:** Quemar claves API, identificadores de proyecto, buckets de almacenamiento o correos personales en archivos fuente o en bloques de ejemplo de documentación.
* **Obligatorio:** Consumir todas las credenciales mediante `import.meta.env.VITE_FIREBASE_*`, manteniendo `.env`, `.env.production` y `.DS_Store` estrictamente ignorados en `.gitignore` y fuera del historial de Git.
* Toda adición de variable de entorno debe reflejarse simultáneamente en `.env.example` con valores de muestra neutrales.
* El archivo `src/config/env.js` debe validar en tiempo de inicialización que ninguna variable crítica sea `undefined`.

---

## 4. SISTEMA DE DISEÑO, TOKENS UI Y REGLAS DE ESTILO

El agente debe ceñirse con absoluta rigurosidad a los tokens declarados en `tailwind.config.js`.

### 4.1. Tokens Oficiales Autorizados

```javascript
// tailwind.config.js
colors: {
  brand: {
    bg: '#FAF3E0',          // Crema de Té base envolvente -> bg-brand-bg
    surface: '#FFFDF9',     // Marfil iluminado para tarjetas y cápsula flotante -> bg-brand-surface
    card: '#FFFFFF',        // Blanco puro de contraste para modales -> bg-brand-card
    text: '#35322F',        // Carbón vegetal de alta legibilidad -> text-brand-text
    muted: '#5F5C58',       // Carbón secundario accesible (7.2:1) -> text-brand-muted
    accent: '#BC8A5F',      // Marrón arcilla decorativo -> bg-brand-accent, text-brand-accent
    terracotta: '#854B24',  // Terracota profundo para CTAs y enlaces (6.3:1) -> bg-brand-terracotta, text-brand-terracotta
    sage: '#828E82',        // Salvia base neutro -> text-brand-sage, bg-brand-sage
    'sage-dark': '#4D584D', // Salvia bosque profundo para badges -> text-brand-sage-dark, bg-brand-sage-dark
    'sage-light': '#E9ECE9',// Salvia suave para píldoras -> bg-brand-sage-light
    glass: 'rgba(255, 253, 249, 0.78)', // Vidrio cálido translúcido -> bg-brand-glass
  }
}
```

### 4.2. Clases Vetadas (Lista Negra de Utilidades)
Queda terminantemente prohibido generar o mantener las siguientes clases inexistentes:
* ❌ `bg-brand-cream` (Usar `bg-brand-bg`)
* ❌ `text-brand-dark` (Usar `text-brand-text`)
* ❌ `bg-brand-terra` o `text-brand-terra` (Usar `bg-brand-accent` / `text-brand-accent` para acentos decorativos, o `bg-brand-terracotta` / `text-brand-terracotta` para CTAs y enlaces principales)
* ❌ `selection:bg-brand-terra/30` (Usar `selection:bg-brand-accent/30` o `selection:bg-brand-sage/30`)

### 4.3. Ortotipografía RAE (Sentence Case Estricto)
* **Regla de Oro:** En español, los títulos, subtítulos, botones y etiquetas se escriben en **Sentence Case** (tipo oración).
* ❌ Incorrecto: *"Nuevo Artículo De Psicología Clínica"*
* ✔️ Correcto: *"Nuevo artículo de psicología clínica"*
* ❌ Incorrecto: *"Encuentra Tu Momento Ideal"*
* ✔️ Correcto: *"Encuentra tu momento ideal"*
* Excepciones: Nombres propios (*Diana Ledesma*, *Google Meet*, *Guadalajara*), siglas reconocidas (*TCC*, *ACT*, *DBT*, *ARCO*) o el inicio de una oración después de punto.

### 4.4. Tipografías Oficiales
* Titulares: `font-serif` (`Playfair Display`, serif).
* Contenido y UI: `font-sans` (`Inter`, sans-serif).
* Ambas fuentes deben estar importadas en `index.html` para evitar caídas en fuentes genéricas del sistema.

---

## 5. REGLAS DE UX CLÍNICA, ACCESIBILIDAD Y RENDIMIENTO

### Regla 5.1: Accesibilidad en Modales (WAI-ARIA Dialog)
Todo modal (`PrivacyModal`, `RegulationsModal`, `BlogEditorModal`, `BlogReaderModal`) debe implementar:
1. `role="dialog"` y `aria-modal="true"`.
2. `aria-labelledby="id-del-titulo"`.
3. Atrapamiento de foco (*Focus Trap*): El foco del teclado no debe poder salir del modal mientras esté abierto.
4. Cierre mediante la tecla `Escape`.
5. Restauración del foco al elemento que disparó la apertura tras cerrarse.

### Regla 5.2: Accesibilidad en Elementos Clickeables, Carruseles y Contraste WCAG 2.1 AA
* **Prohibido:** Asignar `role="button"`, `tabIndex="0"` u `onClick` a etiquetas `<article>`, `<div>` o `<span>`, y prohibido anidar controles interactivos dentro de otro botón (como en `BlogCard` o tarjetas editoriales del blog).
* **Obligatorio:** Emplear `<button type="button">` semántico para la acción principal (con área expandida `after:absolute after:inset-0` cuando aplique), manteniendo los botones secundarios (Editar/Eliminar) como hermanos en `relative z-10`.
* **Controles de carrusel y áreas táctiles:** Los indicadores de paginación en carruseles (`Services.jsx`, `Blog.jsx`) deben usar `role="group"` (nunca `role="tablist"`) y botones con área táctil mínima de `36×36 px` (`min-w-[36px] min-h-[36px]`).
* **Contraste mínimo WCAG 2.1 AA (`>= 4.5:1`):** Todo texto e hipervínculo en tarjetas y Footer debe garantizar ratio `>= 4.5:1` (evitando opacidades bajas como `text-brand-muted/80` sobre blanco o `text-brand-accent` sobre `bg-brand-text`).

### Regla 5.3: Rendimiento de Assets e Identidad Tipográfica
* **Identidad de Marca:** Se adopta un Wordmark Editorial de autor ("Diana Ledesma" en Playfair Display Italic + "PSICOLOGÍA CLÍNICA" en Inter tracking abierto), prescindiendo de isotipos ilustrados de stock en cabecera y pie de página.
* **Favicon Vectorial:** El favicon del sitio se sirve en formato vectorial SVG ligero (`public/favicon.svg`, `399 B`), compuesto por un monograma tipográfico "D" en Playfair Display sobre fondo crema.
* **Rendimiento de Imágenes:** El retrato profesional (`src/assets/diana.webp`) en la sección Sobre mí debe servirse en formato WebP de alta fidelidad (<45 KB; actualmente 41.29 KiB / 42.28 kB, `620×1107`, recortado al retrato interior sin marco degradado) integrado directamente sobre el fondo crema (`rounded-3xl shadow-md`, sin contornos ni paneles contrastantes) con atributos explícitos `width` y `height` coherentes con sus dimensiones reales para optimizar la carga y asegurar CLS: 0.0.
* Las imágenes de tarjetas en el blog deben contar con atributos `loading="lazy"` y tamaños responsivos para evitar estrangular el ancho de banda del usuario.

### Regla 5.4: Optimización de Listeners y Observadores
* En hooks que utilicen `IntersectionObserver` (como `useOnScreen`), el objeto de opciones debe memoizarse con `useMemo` o extraerse fuera del componente para evitar re-suscripciones continuas en cada render.
* En listeners de `window.addEventListener('scroll')`, se debe utilizar obligatoriamente `{ passive: true }` y técnicas de estrangulamiento (*throttle*) para proteger el Main Thread a 60/120 FPS.

### Regla 5.5: Barra de Navegación Dinámica (Smart Scroll y Pastilla Flotante)
* **Smart Scroll:** Detección de scroll direccional con `{ passive: true }` y `requestAnimationFrame`:
  - En el tope (`scrollY <= 40`): Barra plana de borde a borde (`w-full`) transparente sobre el fondo crema.
  - Scroll descendente (`scrollY > lastScrollY && scrollY > 60`): Ocultamiento suave hacia arriba (`-translate-y-28 opacity-0 pointer-events-none`).
  - Scroll ascendente (`scrollY < lastScrollY`): Reaparición fluida (`translate-y-0 opacity-100 pointer-events-auto`).
  - Excepción mandataria: Si el menú móvil está abierto (`isMenuOpen === true`), la barra debe permanecer visible forzosamente (`translate-y-0`).
* **Cápsula Flotante:** Al desplazarse (`isScrolled`), debe confinarse a `max-w-5xl mx-auto mt-2 sm:mt-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-brand-surface/95 backdrop-blur-md border border-brand-sage/20 shadow-soft-md`.
* **Botón Primario de Agenda:** Estilo sólido terracota `bg-brand-terracotta text-white hover:bg-[#6e3d1d] px-5 py-2 rounded-full font-medium text-sm shadow-soft-sm focus-visible:ring-2 focus-visible:ring-brand-terracotta` en Sentence Case ("Agendar cita") anclado a `#contacto`.
* **Enlaces de Escritorio:** Obligatorio `whitespace-nowrap` para evitar saltos de línea indeseados en anchos de pantalla intermedios.

### Regla 5.6: Scrollytelling Pinned en 3 Fases (Escritorio) y Flujo Natural en Móvil
* **Comportamiento Dual Responsive (`< md` vs `md:+`):**
  - **En móvil (`< 768px` / `< md`):** La sección adopta flujo vertical natural (`h-auto py-16`) con escenario `relative` (sin pista fija ni bloqueos `sticky h-screen`), carrusel horizontal nativo `snap-x snap-mandatory`, pastilla Apple siempre visible (`opacity-100 pointer-events-auto`) y tarjetas de altura natural (`h-auto`, **prohibido `max-h-*` u `overflow-y-auto` interno**) para eliminar el *scroll-trapping* y preservar la legibilidad clínica (`>= text-sm` / `14px`). En JS se omiten los cálculos de `progress` cuando `window.innerWidth < 768`.
  - **En escritorio (`>= 768px` / `md:+`):** Contenedor exterior con pista vertical calculada (`md:h-[220vh]`) y escenario fijo en viewport (`md:sticky md:top-0 md:h-screen w-full md:overflow-hidden flex flex-col justify-between md:py-10`).
* **Coreografía en 3 Fases Exactas (`md:+`):**
  - **Fase 1 (`progress < 0.25`):** El viewport muestra con protagonismo exclusivo el título y el subtítulo centrados ópticamente en la pantalla. El carrusel de tarjetas y controles están en opacidad 0 e inactivos (`pointer-events-none`).
  - **Fase 2 (`0.25 <= progress < 0.65`):** Transición cinemática activa donde el subtítulo se desvanece suavemente (`opacity -> 0`), el título principal asciende hacia su anclaje superior y el carrusel emerge desde abajo (`fade-in + slide-up`).
  - **Fase 3 (`progress >= 0.65`):** Con el título anclado en la cabecera, las tarjetas apaisadas 60/40 y la pastilla de controles inferior se activan (`opacity-100 scale-100 pointer-events-auto`) para exploración horizontal libre (swipe dos dedos en trackpad, drag-to-scroll y touch nativo), permitiendo que al terminar la pista el scroll vertical continúe normalmente hacia el Blog.
* **Pastilla de Control Estilo Apple:** Pastilla flotante interactiva centrada (`bg-brand-surface/90 backdrop-blur-md px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-brand-sage/25 shadow-soft-md`) con micro-indicadores visuales de posición (dots en `role="group"` con botones `>= 36×36 px`) y botones de chevron para navegación rápida con `scrollBy({ behavior: 'smooth' })`.
* **Transición Cromática Ambiental (`md:+`):** Capa overlay acelerada por hardware (`hidden md:block bg-gradient-to-b from-[#E2E8E1] via-[#E6ECE5] to-brand-bg`) con opacidad reactiva a `progress` (Fase 1: opacidad 100% tono salvia bruma sereno, Fase 2: difuminado suave entre 0.20 y 0.60, Fase 3: opacidad 0% restaurando el crema base `#FAF3E0`; en móvil se mantiene directo el crema base `#FAF3E0`).

---

## 6. PROTOCOLOS DE MANEJO DE ERRORES Y RETROALIMENTACIÓN

### 6.1. Prohibición de Silenciamiento de Errores (Zero Silent Errors)
* **Terminantemente prohibido:** Bloques `catch (err) { console.error(err); }` que no informen al usuario sobre el fallo de una operación.
* Si una operación de guardado o borrado en el blog falla, el sistema debe:
  1. Registrar el error en consola con contexto técnico.
  2. Mostrar una notificación visual accesible (Toast o Banner) al usuario informando en lenguaje comprensible: *"No fue posible guardar el artículo. Por favor, verifica tu conexión o permisos."*
  3. No resetear el formulario del editor para evitar que el usuario pierda su texto escrito.

### 6.2. Prohibición de Diálogos Nativos Bloqueantes
* **Prohibido:** El uso de `alert()` o `confirm()` nativos de JavaScript en la experiencia de usuario final.
* Las confirmaciones destructivas (como borrar un artículo) deben manejarse mediante modales de confirmación con diseño integrado en el sistema visual.

---

## 7. MATRIZ DE DIRECTIVAS CLAVE (DOs & DONTs)

| Categoría | QUÉ DEBES HACER (DO) | QUÉ ESTÁ TERMINANTEMENTE PROHIBIDO (DONT) |
| :--- | :--- | :--- |
| **Arquitectura** | Separar responsabilidades en Servicios -> Hooks -> Componentes. | Escribir consultas de Firestore o llamadas Auth en archivos JSX. |
| **Autenticación** | Consumir sesión mediante `useAuth()` desde `AuthContext`. | Hacer *prop drilling* de `user` e `isAdmin` a través de múltiples niveles. |
| **Seguridad** | Validar mutaciones en `firestore.rules` a nivel de servidor. | Confiar en arreglos de correos en cliente como barrera de seguridad. |
| **Credenciales** | Leer llaves mediante `import.meta.env.VITE_*`. | Quemar API keys de Firebase en texto plano en el repositorio. |
| **Base de Datos** | Usar `getDocs` para cargar artículos del blog bajo demanda. | Mantener un `onSnapshot` abierto indefinidamente en la One-Page. |
| **Persistencia** | Guardar `updatedAt` sin modificar `createdAt` en actualizaciones. | Sobreescribir `createdAt` con `serverTimestamp()` al editar un post. |
| **Diseño** | Utilizar estrictamente los tokens `brand-bg`, `brand-text`, etc. | Usar clases huérfanas como `bg-brand-cream` o `text-brand-dark`. |
| **Ortotipografía**| Redactar títulos en Sentence Case conforme a las normas RAE. | Usar Title Case anglosajón capitalizando cada palabra. |
| **Accesibilidad** | Atrapamiento de foco y tecla `Escape` en todos los modales. | Usar `<article onClick={...}>` sin soporte semántico ni teclado. |
| **Rendimiento** | Servir assets gráficos optimizados en WebP/SVG (<40 KB). | Cargar imágenes sin comprimir de más de 500 KB en la cabecera. |
| **Navegación** | Smart Scroll con pastilla flotante y botón terracota sólido. | Mantener un navbar estático rígido o con botones deslavados. |
| **Integridad** | Entregar siempre el archivo de código completo sin elisiones. | Usar comentarios de elisión como `// resto del código igual`. |

---

## 8. LISTA DE VERIFICACIÓN PREVIA A COMMITS Y DEPLOY (QA CHECKLIST)

Antes de dar por finalizada cualquier intervención de código en este repositorio, el agente debe auto-auditarse contra esta lista de control:

- [ ] **Anti-Truncamiento:** ¿Se verificó que ningún archivo contenga elisiones o comentarios tipo `// ... resto del código`?
- [ ] **Aislamiento de Firebase:** ¿Están los componentes de `src/sections/` y `src/components/` 100% libres de llamadas al SDK de Firebase?
- [ ] **Capa de Servicios y Carga Diferida:** ¿Todas las interacciones de base de datos se canalizan a través de `src/services/firebase/` usando `firebase/firestore/lite` (`getDocs` REST sin `onSnapshot` ni `Listen/channel`), con `firebase/auth` diferido dinámicamente y sin archivo legado `src/firebase.js`?
- [ ] **Variables de Entorno y Sanitización:** ¿Se consumen las credenciales mediante `import.meta.env` sin llaves en texto plano en el código ni en la documentación (`ESPECIFICACION_TECNICA.md`, `AUDITORIA_ARQUITECTURA.md`, `.env.example`), y permanecen `.env`, `.env.production` y `.DS_Store` ignorados en `.gitignore` y ausentes del índice/historial de Git?
- [ ] **Reglas de Seguridad:** ¿Existe el archivo `firestore.rules` con validación en servidor para operaciones de escritura en `blog_posts`?
- [ ] **Preservación de Fechas:** ¿El guardado de artículos preserva `createdAt` intacto y solo muta `updatedAt` durante ediciones?
- [ ] **Manejo de Errores:** ¿Todos los bloques `try/catch` asíncronos muestran retroalimentación visual clara y no silenciada al usuario?
- [ ] **Tokens de Diseño:** ¿Están sincronizados los 11 tokens oficiales de `tailwind.config.js` (incluyendo `brand-surface`, `brand-terracotta` y `brand-glass`) con la documentación y `Navbar.jsx`, garantizando 0 referencias a `brand-cream`, `brand-dark` o `brand-terra`?
- [ ] **Ortotipografía RAE:** ¿Todos los titulares y botones respetan el formato Sentence Case en idioma español?
- [ ] **Accesibilidad y Contraste WCAG AA:** ¿Todos los modales cuentan con `role="dialog"`, `aria-modal="true"` y `Escape`; las tarjetas del blog usan `<button>` semántico (sin `role="button"` en `<article>` ni botones anidados); los indicadores de carrusel usan `role="group"` con área táctil `>= 36×36 px`; y los textos cumplen contraste `>= 4.5:1`?
- [ ] **Wordmark Editorial, Favicon SVG, Fuentes y Retrato WebP:** ¿Se sustituyó el isotipo ilustrado por el Wordmark tipográfico en Playfair Display Italic, se configuró `public/favicon.svg` (`399 B`) sin archivos huérfanos de `logo.webp`/`logo.png`, Google Fonts cargan sin bloquear renderizado y se sirve `src/assets/diana.webp` (<45 KB) con `width`/`height` explícitos?
- [ ] **Smart Scroll y Pastilla Flotante:** ¿El Navbar implementa auto-ocultamiento direccional pasivo, transición fluida a pastilla flotante y botón primario terracota en Sentence Case ("Agendar cita")?
- [ ] **Servicios Responsive (Móvil Flujo Natural vs. Escritorio Scrollytelling Pinned):** ¿El componente `Services` emplea flujo vertical natural (`h-auto`) con carrusel `snap-x` y tarjetas sin `overflow-y-auto` ni texto `< 14px` en móvil (`< md`), manteniendo el Scrollytelling Pinned de 3 fases (`md:h-[220vh]`) con tarjetas apaisadas 60/40 puramente informativas (sin botones de agendar en tarjeta) y controles Apple en escritorio (`md:+`)?
- [ ] **Áreas de Atención y TLP:** ¿Se incorporó el badge de "Trastorno límite de la personalidad" (TLP) con ortotipografía RAE estricta en Sentence Case en las secciones clínicas correspondientes?
- [ ] **Centralización en WhatsApp y Canales Oficiales:** ¿Se eliminaron enlaces a Google Calendar e Instagram en toda la interfaz, canalizando el agendamiento exclusivamente a WhatsApp (+52 33 1836 3829) con mensajes predefinidos y conservando el correo oficial (`dianaledesma2110@gmail.com`)?
- [ ] **Layout Editorial y Carrusel Móvil del Blog:** ¿La sección Blog implementa carrusel táctil con snap en móvil, layout asimétrico 60/40 en escritorio, badges Soft Glass accesibles y botón de admin discreto?
- [ ] **Footer Editorial en 3 Niveles:** ¿El componente Footer implementa remate redondeado (rounded-t-[2.5rem]), distribución simétrica de 2 columnas en móvil, Cédula Profesional: 14728021 y micro-utilidad administrativa discreta?
- [ ] **Cédula Profesional Oficial:** ¿Se muestra visiblemente la Cédula Profesional: 14728021 en Sobre mí, Footer y en el consentimiento del encuadre terapéutico?
- [ ] **Compilación Limpia:** ¿Se ejecutó `npm run build` confirmando que el proyecto compila a producción sin advertencias de sintaxis o fallos de empaquetado?

---
*Este documento es de observancia obligatoria para cualquier agente, asistente de IA o desarrollador que modifique el código fuente de Diana Ledesma | Psicología Clínica.*
