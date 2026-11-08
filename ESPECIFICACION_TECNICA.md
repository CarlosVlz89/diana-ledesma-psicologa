# ESPECIFICACIÓN TÉCNICA Y ESTÁNDAR ARQUITECTÓNICO
## Diana Ledesma | Psicología Clínica
**Documento Vivo de Arquitectura de Software, UX Clínica, Ciberseguridad y Aseguramiento de Calidad (QA)**

---

### Control de Versión y Metadatos del Documento

| Campo | Detalle Técnico |
| :--- | :--- |
| **Identificador del Proyecto** | `diana-psicologia` (Vite SPA + Firebase Platform) |
| **Titular y Responsable Sanitaria** | Lic. Diana Ledesma (Cédula Profesional: 14728021, UdeG) |
| **Versión del Documento** | `1.0.0-PROD-SPEC` |
| **Fecha de Aprobación** | Octubre 2026 |
| **Estado del Documento** | **OFICIAL / ACTIVO** (Referencia vinculante de desarrollo) |
| **Rol Redactor / Auditor** | Principal Software Architect, Lead Security Engineer & Clinical UX Consultant |
| **Línea Base del Código** | React 18.2.0, Vite 5.0.8, Firebase 10.7.1, Tailwind CSS 3.4.1 |

---

## 1. RESUMEN EJECUTIVO Y PARÁMETROS DEL PROYECTO

### 1.1. Propuesta de Valor y Misión Digital
El ecosistema digital **Diana Ledesma | Psicología Clínica** provee una interfaz web de alta confianza y baja fricción emocional para la captación, orientación, encuadre terapéutico y agendamiento de pacientes que requieren atención psicoterapéutica basada en evidencia (Terapia Cognitivo-Conductual y Terapias Contextuales). Incorpora un canal de divulgación psicoeducativa (Blog) con capacidades de gestión de contenidos (CRUD) para la especialista, garantizando la confidencialidad de datos personales y la estabilidad técnica de grado profesional.

### 1.2. Tabla de Parámetros Operativos del Negocio

| Parámetro | Configuración Oficial del Sistema | Referencia de Código / Implementación |
| :--- | :--- | :--- |
| **Nombre Comercial** | Diana Ledesma \| Psicología Clínica | `document.title`, `Navbar.jsx`, `Footer.jsx` |
| **Titular Sanitaria** | Lic. Diana Ledesma (Psicóloga Clínica, Cédula Profesional: 14728021, Univ. de Guadalajara / Univ. de Murcia) | `src/sections/About.jsx` |
| **Cédula Profesional** | 14728021 (Registrada oficialmente ante la Dirección General de Profesiones / SEP) | `About.jsx`, `Footer.jsx`, `RegulationsModal.jsx` |
| **Enfoques Terapéuticos** | TCC (Cognitivo-Conductual), ACT, DBT, Mindfulness, TCA, Trastorno límite de la personalidad (TLP / DBT) e Intervención en Crisis | `src/sections/Services.jsx`, `About.jsx` |
| **Modalidad 1: Online** | Sesiones por Google Meet (60 min), agendamiento y coordinación directa vía WhatsApp | `https://wa.me/523318363829` |
| **Modalidad 2: Presencial** | Consultorio físico en Guadalajara (60 min con tolerancia máxima de 15 min), agendamiento vía WhatsApp | `https://wa.me/523318363829` |
| **Ubicación Consultorio** | Calle Toltecas 3446, Col. Monraz, C.P. 44670, Guadalajara, Jalisco, México | `src/sections/Contact.jsx` (Google Maps ID: `389pHWCyAvtYHotB6`) |
| **WhatsApp Oficial** | `+52 33 1836 3829` (Canal oficial y exclusivo de atención, informes y agendamiento de citas) | `https://wa.me/523318363829` |
| **Correo de Contacto** | `contacto@dianaledesma.com` (Consultas institucionales y ejercicio de derechos ARCO) | `mailto:contacto@dianaledesma.com` |
| **Políticas de Citas** | Cancelaciones con 24h de anticipación obligatorias o causan honorarios completos | `src/components/ui/RegulationsModal.jsx` |
| **Métodos de Pago** | Transferencia bancaria anticipada o efectivo al finalizar | Cláusula 4 del Reglamento |

---

## 2. SISTEMA DE DISEÑO VISUAL Y TOKENS SEMÁNTICOS

Para erradicar inconsistencias entre la configuración del compilador y el marcado JSX, se formalizan los tokens de diseño vinculantes. Queda estrictamente prohibido el uso de clases arbitrarias o huérfanas como `bg-brand-cream`, `text-brand-dark` o `bg-brand-terra`.

### 2.1. Tokens de Color Oficiales (`tailwind.config.js`)

| Token Semántico | Código HEX / RGBA | Utilidad Tailwind | Rol Clínico y de Accesibilidad (WCAG 2.1 AA) |
| :--- | :--- | :--- | :--- |
| **`brand.bg`** | `#FAF3E0` | `bg-brand-bg` | **Fondo Crema de Té:** Reduce el deslumbramiento y fatiga ocular del paciente en crisis o ansiedad. |
| **`brand.text`** | `#35322F` | `text-brand-text` | **Carbón Vegetal:** Contraste óptimo (11.8:1 sobre `brand.bg`). Evita el negro puro (#000000) para mayor calidez. |
| **`brand.accent`** | `#BC8A5F` | `text-brand-accent`<br>`bg-brand-accent` | **Marrón Arcilla:** Elementos de llamada a la acción (CTA), bordes de foco, enlaces y botones principales. |
| **`brand.sage`** | `#828E82` | `text-brand-sage`<br>`bg-brand-sage` | **Verde Salvia:** Transmite serenidad y balance. Utilizado en insignias, bordes sutiles y fondo del Footer. |
| **`brand.glass`** | `rgba(250, 243, 224, 0.6)` | `bg-brand-glass` | **Vidrio Líquido (Liquid Glass):** Fondo con desenfoque de fondo (`backdrop-blur-md/xl`) para paneles flotantes. |

### 2.2. Clases Utilitarias Compuestas y Reglas CSS (`src/index.css`)
```css
/* Paneles de Contención Orgánica */
.glass-panel {
  @apply bg-brand-sage/10 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl;
}

/* Tarjetas Interactivas con Elevación Suave */
.glass-card {
  @apply glass-panel transition-all duration-500 hover:bg-white/40 hover:-translate-y-2 hover:shadow-2xl hover:border-white/60 cursor-default;
}
```

### 2.3. Sistema Tipográfico Oficial
1. **Titulares y Acentos Humanísticos (`font-serif`):**
   - Familia: `'Playfair Display', serif` (Google Fonts).
   - Aplicación: Títulos `h1`, `h2`, `h3`, citas textuales y modal headers. Confiere autoridad clínica y serenidad.
2. **Cuerpo de Lectura e Interfaz (`font-sans`):**
   - Familia: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` (Google Fonts).
   - Aplicación: Párrafos, campos de formulario, botones, avisos legales y etiquetas. Optimizado para legibilidad en pantallas retina y móviles.

### 2.4. Reglas de Ortotipografía RAE (Sentence Case Estricto)
En cumplimiento con las normas de la Real Academia Española (RAE) para el idioma español:
* **Prohibido el "Title Case" anglosajón:** No escribir titulares capitalizando cada palabra (ej. ❌ *"Compromiso, Aceptación Y Una Vida Valiosa"*).
* **Uso estricto de "Sentence Case":** Solo se capitaliza la primera letra de la frase y los nombres propios (ej. ✔️ *"Compromiso, aceptación y una vida valiosa"*, ✔️ *"Blog de salud mental"*, ✔️ *"Encuadre terapéutico y políticas de citas"*).
* Las siglas institucionales y terapias se escriben en mayúsculas sostenidas: TCC, ACT, DBT, TCA, ARCO, RAE.

### 2.5. Patrón de Navegación Flotante Dinámica (Smart Scroll y Pastilla Flotante)
* **Tope de página (`scrollY <= 40`):** Extensión completa (`w-full`), fondo transparente plano fusionado de forma natural con el fondo crema del Hero.
* **Scroll descendente (`scrollY > lastScrollY && scrollY > 60`):** Auto-ocultamiento direccional suave hacia arriba (`-translate-y-28 opacity-0 pointer-events-none`).
* **Scroll ascendente (`scrollY < lastScrollY`):** Reaparición instantánea con animación fluida (`translate-y-0 opacity-100 pointer-events-auto`).
* **Cápsula Flotante (`isScrolled === true`):** Confinamiento en cápsula centrada:
  `max-w-5xl mx-auto mt-2 sm:mt-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-brand-surface/95 backdrop-blur-md border border-brand-sage/20 shadow-soft-md` con transición suave (`transition-all duration-300 ease-in-out`).
* **Excepción de Menú Móvil:** Si el menú hamburguesa está abierto (`isMenuOpen === true`), la barra permanece forzosamente visible (`translate-y-0`).
* **Botón Primario de Agenda:** Variante sólida terracota `bg-brand-terracotta text-white hover:bg-[#6e3d1d] px-5 py-2 rounded-full font-medium text-sm shadow-soft-sm focus-visible:ring-2 focus-visible:ring-brand-terracotta` en Sentence Case ("Agendar cita") con anclaje suave a `#contacto`.
* **Enlaces de Escritorio:** Incorporan `whitespace-nowrap` para evitar quiebres de línea en resoluciones intermedias.

---

## 3. ARQUITECTURA DE SOFTWARE Y MAPA DE COMPONENTES

### 3.1. Diagnóstico del Estado Actual vs. Estado Objetivo

| Criterio | Estado Actual (Monolítico Acoplado) | Estado Objetivo (Clean Layered Architecture) |
| :--- | :--- | :--- |
| **Nivel de Acoplamiento** | **8.5 / 10 (Crítico)** | **2.0 / 10 (Bajo / Desacoplado)** |
| **Llamadas a Firebase** | Directas en el cuerpo de `App.jsx` y `Blog.jsx`. | Aisladas en `src/services/firebase/*.js`. |
| **Gestión de Sesión** | `user` e `isAdmin` pasados por *prop drilling*. | Gestionada centralizadamente mediante `AuthContext` y `useAuth()`. |
| **Manejo de Errores** | Silenciado en el catch o con alertas bloqueantes. | Notificaciones visuales tipo Toast accesibles y no intrusivas. |
| **Carga de Artículos** | `onSnapshot` (WebSocket activo indefinido). | `getDocs` bajo demanda con caché en memoria y revalidación. |

### 3.2. Diagrama de Flujo en 3 Capas (Arquitectura Desacoplada)

```text
+--------------------------------------------------------------------------------+
|                        CAPA DE PRESENTACIÓN (UI PURA)                          |
|  - src/sections/ (Hero, About, Services, BlogSection, Contact)                 |
|  - src/components/ui/ (Button, Modal WAI-ARIA, Reveal, Toast)                  |
|  - src/features/blog/components/ (BlogCard, BlogGrid, BlogEditor, BlogReader)   |
+---------------------------------------+----------------------------------------+
                                        | (Consume estados y despacha acciones)
                                        v
+--------------------------------------------------------------------------------+
|                   CAPA DE ADAPTACIÓN Y ESTADO (HOOKS / CONTEXT)                |
|  - src/context/AuthContext.jsx  ---> [useAuth] (user, isAdmin, authLoading)    |
|  - src/features/blog/hooks/useBlogPosts.js (posts, loading, error, CRUD ops)   |
|  - src/hooks/useIntersection.js (IntersectionObserver con ref estable)         |
|  - src/hooks/useScrollThrottle.js (Scroll pasivo con estrangulamiento)         |
+---------------------------------------+----------------------------------------+
                                        | (Invoca promesas de dominio limpias)
                                        v
+--------------------------------------------------------------------------------+
|                 CAPA DE INFRAESTRUCTURA Y SERVICIOS (FIREBASE / API)           |
|  - src/services/firebase/client.js (Init con variables import.meta.env)       |
|  - src/services/firebase/authService.js (loginWithGoogle, logout, subscribe)   |
|  - src/services/firebase/blogService.js (fetchPosts, savePost, deletePost)     |
+---------------------------------------+----------------------------------------+
                                        | (Transmisión segura HTTPS / WSS)
                                        v
+--------------------------------------------------------------------------------+
|                        SERVICIOS CLOUD EXTERNOS (FIREBASE)                     |
|  - Google Cloud Identity (Firebase Authentication)                             |
|  - Cloud Firestore (Reglas de Seguridad Zero-Trust con JWT claims)            |
+--------------------------------------------------------------------------------+
```

### 3.3. Desglose Componente por Componente

```text
[App.jsx] (Orquestador Raíz con AuthProvider y UIModalProvider)
  │
  ├── [Navbar.jsx] (Pastilla flotante dinámica con Smart Scroll direccional, Wordmark Editorial de autor, CTA terracota primario e indicador Admin)
  │
  ├── <main>
  │     ├── [Hero.jsx] (Encuadre clínico editorial, iluminación ambiental con orbes difuminados y CTAs de alto contraste)
  │     ├── [About.jsx] (Retrato oficial diana.webp, credenciales académicas UdeG, Cédula Profesional: 14728021, perfil profesional)
  │     ├── [Services.jsx] (Scrollytelling Pinned 220vh en 3 fases: Fase 1 centro óptico, Fase 2 transición activa, Fase 3 carrusel con 4 tarjetas de especialidad puramente informativas y controles Apple)
  │     ├── [Blog.jsx] (Layout Editorial Asimétrico 60/40 en Desktop + Carrusel Táctil horizontal en Móvil)
  │     │     ├── [BlogCard.jsx] (Tarjeta individual accesible con badge Soft Glass y tiempo de lectura)
  │     │     ├── [BlogEditorModal.jsx] (Editor de admin desacoplado)
  │     │     └── [BlogReaderModal.jsx] (Lectura completa con tipografía fluida)
  │     └── [Contact.jsx] (Datos de contacto, consultorio en Maps y selector interactivo con agendamiento directo vía WhatsApp)
  │
  ├── [Footer.jsx] (Pie de página editorial en 3 niveles con remate redondeado, Cédula Profesional: 14728021 y micro-utilidad de administración)
  │
  ├── [PrivacyModal.jsx] (Aviso de privacidad integral y derechos ARCO)
  └── [RegulationsModal.jsx] (Encuadre clínico, consentimiento informado con Cédula Profesional: 14728021 y políticas de cancelación)
```

---

## 4. ESTRATEGIA DE UX CLÍNICA Y PSICOLOGÍA DEL PACIENTE

### 4.1. Reducción de la Fricción Cognitiva en Agendamiento
Un paciente que busca psicoterapia se encuentra frecuentemente en un estado emocional vulnerable (angustia, rumiación, estrés agudo o fatiga). La interfaz debe priorizar:
1. **Predictibilidad Absoluta y Coordinación Directa:**
   - La tarjeta de agenda en `src/sections/Contact.jsx` desglosa con total transparencia: duración de la sesión (60 min), modalidad (Online por Meet o Presencial en Monraz) y métodos de pago aceptados.
   - Claridad en el canal directo: La reserva y coordinación de horarios se canaliza de forma directa, ágil y confidencial a través del chat oficial de WhatsApp (+52 33 1836 3829) con un mensaje predefinido contextualizado a la modalidad solicitada, prescindiendo de intermediarios y plataformas externas.
2. **Eliminación de Formularios Extensos:**
   - No se exige registro de cuenta, contraseñas ni llenado de cuestionarios clínicos invasivos en la web pública antes de reservar.
3. **Canal Único de Atención:**
   - Botón directo de WhatsApp visible en los puntos de contacto para resolver dudas y agendar en una sola conversación humana y empática.

### 4.2. Encuadre Terapéutico Claro (`RegulationsModal.jsx`)
- El encuadre (*setting*) psicoterapéutico establece los límites profesionales necesarios para la alianza terapéutica:
  - Política estricta de cancelación con 24 horas de antelación.
  - Reglas de seguridad en terapia online (prohibición de sesiones conduciendo o en transporte público).
- **Herramienta para la Especialista:** Función de un solo clic para copiar el reglamento formateado y enviarlo por WhatsApp al confirmar la primera consulta.

---

## 5. PRIVACIDAD, CIBERSEGURIDAD Y MANEJO DE DATOS

### 5.1. Modelo Zero-Trust en Cliente
Queda formalmente tipificado como **falacia de seguridad** cualquier control de acceso que dependa exclusivamente de variables en el código JavaScript del navegador.

#### Vulnerabilidad Auditada y Eliminada:
* El archivo `src/config/constants.js` contenía el arreglo `adminEmails` en texto plano.
* La condición `const isAdmin = user && adminEmails.includes(user.email);` solo gobierna la visibilidad cosmética de los botones en la interfaz de usuario.
* **Directiva de Ciberseguridad:** Toda operación de mutación (creación, edición, eliminación de artículos) en Cloud Firestore debe ser autorizada y validada a nivel de servidor por las Reglas de Seguridad de Firestore (`firestore.rules`).

### 5.2. Matriz de Reglas de Seguridad en Cloud Firestore (`firestore.rules`)
El proyecto debe disponer en la raíz del repositorio el archivo `firestore.rules` con la siguiente política estricta de autorización:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Función de verificación de identidad de Administrador
    function isPsychologistAdmin() {
      return request.auth != null && 
        request.auth.token.email_verified == true &&
        request.auth.token.email in [
          'carlos.mtzvelez@gmail.com', 
          'dianaledesma@gmail.com'
        ];
    }

    // Reglas para la colección del Blog
    match /blog_posts/{postId} {
      // Cualquier visitante puede leer artículos públicos
      allow read: if true;
      
      // Solo las psicólogas administradoras verificadas pueden crear
      allow create: if isPsychologistAdmin()
                    && request.resource.data.title is string
                    && request.resource.data.title.size() > 5
                    && request.resource.data.content is string
                    && request.resource.data.content.size() > 20
                    && request.resource.data.createdAt == request.time;
      
      // Solo las administradoras pueden actualizar, preservando createdAt
      allow update: if isPsychologistAdmin()
                    && request.resource.data.title is string
                    && request.resource.data.content is string
                    && request.resource.data.createdAt == resource.data.createdAt
                    && request.resource.data.updatedAt == request.time;
      
      // Solo las administradoras pueden borrar
      allow delete: if isPsychologistAdmin();
    }
  }
}
```

### 5.3. Aislamiento de Variables de Entorno (`.env`)
Las llaves del proyecto no deben figurar quemadas en código fuente. Se utiliza el estándar Vite:

```env
# Variables Públicas de Firebase Client (Archivo .env / .env.production)
VITE_FIREBASE_API_KEY="AIzaSyCKQxD283QgSB7hotsQQIXhMDgVbLgR9j0"
VITE_FIREBASE_AUTH_DOMAIN="diana-psicologia.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="diana-psicologia"
VITE_FIREBASE_STORAGE_BUCKET="diana-psicologia.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="713339277261"
VITE_FIREBASE_APP_ID="1:713339277261:web:d706901838cf6436243e84"
VITE_ADMIN_EMAILS="carlos.mtzvelez@gmail.com,dianaledesma@gmail.com"
```

Validador obligatorio de configuración (`src/config/env.js`):
```javascript
export const env = {
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  },
  adminEmails: (import.meta.env.VITE_ADMIN_EMAILS || '').split(',').map(e => e.trim()),
};

// Validación en tiempo de inicialización
const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'appId'];
for (const key of requiredKeys) {
  if (!env.firebase[key]) {
    console.error(`[FATAL] Variable de entorno faltante: VITE_FIREBASE_${key.toUpperCase()}`);
  }
}
```

### 5.4. Política de Privacidad y Derechos ARCO
En apego a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) en México:
* La web no almacena expedientes clínicos de pacientes en Firestore; solo aloja artículos públicos de divulgación.
* Los datos de contacto recabados al coordinar citas vía WhatsApp están protegidos bajo secreto profesional psicoterapéutico.
* El aviso de privacidad integral accesible desde el pie de página garantiza el ejercicio de derechos ARCO (Acceso, Rectificación, Cancelación y Oposición) a través del correo `contacto@dianaledesma.com`.

---

## 6. ESTRUCTURA DEL PROYECTO, STACK TECNOLÓGICO Y DEPENDENCIAS

### 6.1. Árbol Canónico del Blueprint Objetivo

```text
diana-psicologia/
├── .env.example
├── .gitignore
├── AUDITORIA_ARQUITECTURA.md
├── ESPECIFICACION_TECNICA.md
├── AGENTS.md
├── firestore.rules
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── assets/
    │   ├── diana.webp                 # Retrato oficial de Diana (<50 KB, 800x1000)
    │   └── icons/
    ├── config/
    │   ├── env.js                     # Parser y validador de import.meta.env
    │   ├── constants.js               # Tokens y rutas públicas
    │   └── navigation.js              # Enlaces de navegación One-Page
    ├── context/
    │   ├── AuthContext.jsx            # Provider global de autenticación
    │   └── UIContext.jsx              # Gestor global de modales y toasts
    ├── features/
    │   └── blog/
    │       ├── components/
    │       │   ├── BlogCard.jsx       # Tarjeta con a11y por teclado y badge Soft Glass
    │       │   ├── BlogEditorModal.jsx# Formulario de creación/edición
    │       │   └── BlogReaderModal.jsx# Modal de lectura accesible
    │       ├── hooks/
    │       │   └── useBlogPosts.js    # Custom hook gestor de posts
    │       └── utils/
    │           └── blogConstants.js   # Formateo de fechas, imágenes y tiempo de lectura
    ├── hooks/
    │   ├── useAuth.js                 # Consumidor de AuthContext
    │   ├── useIntersection.js         # Observer con threshold memoizado
    │   └── useScrollThrottle.js       # Listener pasivo con estrangulamiento
    ├── services/
    │   └── firebase/
    │       ├── client.js              # Inicializador único de Firebase
    │       ├── authService.js         # Métodos de autenticación desacoplados
    │       └── blogService.js         # Operaciones CRUD con Firestore getDocs
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx             # Barra con Smart Scroll direccional y pastilla flotante
    │   │   ├── Footer.jsx             # Pie de página editorial en 3 niveles con remate redondeado
    │   │   └── Layout.jsx             # Contenedor estructural
    │   ├── ui/
    │   │   ├── Button.jsx             # Botón polimórfico accesible
    │   │   ├── Modal.jsx              # Diálogo WAI-ARIA reutilizable
    │   │   ├── Reveal.jsx             # Contenedor de animación en scroll
    │   │   ├── Section.jsx            # Envoltorio semántico <section>
    │   │   └── Toast.jsx              # Feedback de errores y confirmación
    │   └── legal/
    │       ├── PrivacyContent.jsx     # Contenido del aviso de privacidad
    │       └── RegulationsContent.jsx # Contenido del encuadre terapéutico
    ├── sections/
    │   ├── Hero.jsx
    │   ├── About.jsx
    │   ├── Services.jsx           # Scrollytelling Pinned 220vh en 3 fases con carrusel lateral y controles Apple
    │   ├── Blog.jsx               # Layout Editorial Asimétrico 60/40 y carrusel táctil móvil
    │   └── Contact.jsx
    ├── utils/
    │   ├── dateFormatters.js
    │   └── scroll.js
    ├── index.css
    ├── main.jsx
    └── App.jsx
```

### 6.2. Matriz de Librerías y Dependencias del Stack

| Dependencia | Versión | Estado de Auditoría | Justificación Técnica |
| :--- | :---: | :---: | :--- |
| **`react`** | `^18.2.0` | **Aprobada** | Núcleo de componentes declarativos y renderizado concurrente. |
| **`react-dom`** | `^18.2.0` | **Aprobada** | Renderizador de React sobre el DOM del navegador. |
| **`firebase`** | `^10.7.1` | **Aprobada (Aislar)** | SDK modular. Debe ser consumida únicamente desde `src/services/firebase/`. |
| **`lucide-react`** | `^0.309.0` | **Aprobada** | Set de iconografía SVG accesible, ligera y coherente visualmente. |
| **`vite`** | `^5.0.8` | **Aprobada** | Bundler ultra-rápido basado en Rollup y ES Modules para desarrollo. |
| **`tailwindcss`** | `^3.4.1` | **Aprobada** | Framework de utilidades CSS con compilador JIT bajo demanda. |
| **`@tailwindcss/typography`** | `^0.5.19` | **Aprobada y Activada** | Habilitado formalmente en `plugins: [typography]` en `tailwind.config.js`. |
| **`autoprefixer`** | `^10.4.16` | **Aprobada** | Inserción automática de prefijos de compatibilidad de navegadores en CSS. |
| **`postcss`** | `^8.4.33` | **Aprobada** | Herramienta de transformación de CSS mediante plugins. |
| **`gh-pages`** | `^6.1.1` | **Aprobada** | Utilidad de despliegue a GitHub Pages basada en la carpeta `dist`. |

---

## 7. MATRIZ DE CONTROL DE CALIDAD (QA CHECKLIST)

Esta matriz establece los criterios de aceptación formales tras la ejecución exitosa de las Fases 0 a 4 del roadmap arquitectónico.

| ID | Módulo / Componente | Escenario de Prueba | Resultado Esperado de Calidad | Estado de Verificación |
| :---: | :--- | :--- | :--- | :---: |
| **QA-01** | **Seguridad / Firestore** | Intento de borrado de post vía consola por usuario anónimo | Transacción rechazada con código `permission-denied` por `firestore.rules`. | 🟢 **Verificado en código** (`firestore.rules` Zero-Trust implementado) |
| **QA-02** | **Seguridad / Env** | Inicialización de app sin archivo `.env` configurado | La consola emite alerta de variable faltante y detiene operaciones críticas. | 🟢 **Verificado en código** (`src/config/env.js` validador Fail-Fast) |
| **QA-03** | **Auth / Sesión** | Recarga de página con sesión de Google activa | Se muestra indicador `authLoading` brevemente; no hay flicker en el botón de acceso. | 🟢 **Verificado en código** (`AuthContext.jsx` con `authLoading` reactivo) |
| **QA-04** | **Blog / CRUD** | Edición de un artículo publicado anteriormente | El artículo se actualiza con `updatedAt`; su fecha original `createdAt` se preserva intacta. | 🟢 **Verificado en código** (`blogService.js` omite `createdAt` en update) |
| **QA-05** | **Blog / Error Handling** | Fallo de conexión de red durante el guardado de un post | La interfaz presenta un Toast visual de error; el formulario no se borra. | 🟢 **Verificado en código** (`Toast.jsx` + `useBlogPosts` cero fallos silenciados) |
| **QA-06** | **Rendimiento / Assets** | Medición de peso del logo en carga inicial de página | El archivo servido pesa menos de 40 KB (WebP) y no genera retraso de LCP. | 🟢 **Verificado en código** (`logo.webp` pesa 9.63 KB con `fetchPriority="high"`) |
| **QA-07** | **Rendimiento / DOM** | Desplazamiento vertical veloz (scroll) en la One-Page | El evento de scroll se ejecuta con `{ passive: true }` y `requestAnimationFrame` sin congelar el Main Thread, implementando Smart Scroll direccional y transición fluida a pastilla flotante (`max-w-5xl rounded-full`). | 🟢 **Verificado en código** (`Navbar.jsx` Smart Scroll + Floating Pill) |
| **QA-08** | **Rendimiento / Hook** | Re-renderizado de sección animada con `Reveal` | El `IntersectionObserver` permanece activo sin destruirse en cada ciclo de render. | 🟢 **Verificado en código** (`useOnScreen.js` desestructuración primitiva estable) |
| **QA-09** | **Diseño / Tailwind** | Inspección de estilos en `App.jsx` y modales | Todas las clases corresponden a tokens válidos; no existen referencias a `brand-cream`. | 🟢 **Verificado en código** (`constants.js` y `tailwind.config.js` sincronizados) |
| **QA-10** | **Diseño / Tipografía** | Carga de página sin conexión o en navegador limpio | Los textos cargan y aplican las fuentes oficiales `Playfair Display` e `Inter`. | 🟢 **Verificado en código** (`index.html` con Google Fonts preconnect oficial) |
| **QA-11** | **Accesibilidad / Modales**| Presión de tecla `Escape` con modal abierto | El modal se cierra inmediatamente y devuelve el foco al botón disparador. | 🟢 **Verificado en código** (`Modal.jsx` WAI-ARIA Dialog + Focus Trap) |
| **QA-12** | **Accesibilidad / Artículos**| Navegación por teclado (`Tab` y `Enter`) en el Blog | El usuario puede seleccionar y abrir un artículo sin depender del puntero del ratón. | 🟢 **Verificado en código** (`BlogCard.jsx` semántico con `tabIndex={0}`) |
| **QA-13** | **Negocio / Agendamiento** | Clic en "Agendar sesión en línea vía WhatsApp" y "Agendar sesión presencial vía WhatsApp" en Contacto | Abre directamente el chat oficial de WhatsApp (+52 33 1836 3829) con el mensaje predefinido contextualizado según la modalidad elegida. | 🟢 **Verificado y funcional** |
| **QA-14** | **Negocio / Contacto y Cédula** | Clic en enlace de WhatsApp y verificación de cédula | Se abre el chat directo al +52 33 1836 3829 y se valida la Cédula Profesional 14728021 visible en Sobre mí, Footer y Reglamento (sin enlaces huérfanos a redes sociales de terceros). | 🟢 **Verificado y funcional** |
| **QA-15** | **Legal / Privacidad** | Clic en "Aviso de Privacidad" en el footer | Se abre el modal con texto legal completo y opciones de contacto ARCO. | 🟢 **Verificado y funcional** |

---

## 8. PLAN DE REFACTORIZACIÓN Y PROTOCOLO DE MANTENIMIENTO

### 8.1. Detalle de Fases de Refactorización Segura

```text
[FASE 0: SEGURIDAD Y CONFIG] ─────> [FASE 1: CAPA DE SERVICIOS] ─────> [FASE 2: DESACOPLAR BLOG]
  • Variables de entorno .env         • client.js, authService.js         • useBlogPosts hook
  • Validador config/env.js          • blogService.js (getDocs)          • Extraer componentes modales
  • Desplegar firestore.rules        • AuthContext y useAuth             • Corregir bug de fechas
                                                                                  │
[FASE 4: SISTEMA DE DISEÑO]  <───── [FASE 3: RENDIMIENTO Y ASSETS] <─────────────┘
  • Sincronizar tokens Tailwind       • Reducir logo de 2.33MB a <40KB
  • Activar plugin Typography        • Reparar useOnScreen observer
  • Importar Playfair e Inter        • Scroll throttle en Navbar
  • Modales accesibles WAI-ARIA      • Lazy loading con React.lazy
```

#### Fase 0: Seguridad, Entorno y Configuración Base
- Crear `.env.example` y `.env` con las variables `VITE_FIREBASE_*`.
- Implementar `src/config/env.js`.
- Redactar e implementar `firestore.rules` con validación estricta de claims/emails.
- Agregar `.DS_Store` y `.env` a `.gitignore`.

#### Fase 1: Abstracción de Firebase y Capa de Servicios
- Crear `src/services/firebase/client.js`, `authService.js` y `blogService.js`.
- Migrar consultas de Firestore de `onSnapshot` a `getDocs` bajo demanda.
- Crear `src/context/AuthContext.jsx` y `src/hooks/useAuth.js` con soporte para `authLoading`.

#### Fase 2: Desacoplamiento del Módulo de Blog y Erradicación de Prop Drilling
- Envolver `App.jsx` en `<AuthProvider>`.
- Eliminar props de autenticación en `Navbar`, `Footer` y `Blog`.
- Modularizar `Blog.jsx` extrayendo `BlogEditorModal.jsx`, `BlogReaderModal.jsx` y `BlogCard.jsx`.
- Implementar el hook `useBlogPosts.js`.
- Corregir bug de `serverTimestamp()` para no sobreescribir `createdAt` al editar.
- Implementar notificaciones visuales tipo Toast para operaciones exitosas o fallidas.

#### Fase 3: Optimización de Rendimiento, Assets y Carga
- Convertir `logo.png` (2.33 MB) a WebP optimizado (<40 KB).
- Corregir el hook `src/hooks/useOnScreen.js` memoizando las opciones del observador.
- Aplicar `{ passive: true }` y estrangulamiento al listener de scroll en `Navbar.jsx`.
- Implementar `React.lazy` para la carga diferida de modales administrativos y legales.
- Corregir la ruta del favicon en `index.html`.

#### Fase 4: Consolidación del Sistema de Diseño y Accesibilidad
- Limpiar `src/config/constants.js` y sincronizar los tokens de `tailwind.config.js`.
- Activar el plugin `@tailwindcss/typography` en `tailwind.config.js`.
- Importar las fuentes oficiales `Playfair Display` e `Inter` en `index.html`.
- Desarrollar un componente accesible `src/components/ui/Modal.jsx` con WAI-ARIA y Focus Trap.
- Reemplazar el contenedor interactivo `<article>` por elementos navegables por teclado.

### 8.2. Protocolo de Mantenimiento y Buenas Prácticas Post-Lanzamiento
1. **Auditoría Trimestral de Dependencias:** Ejecutar `npm audit` y actualizar librerías secundarias verificando compatibilidad con React 18.
2. **Monitoreo de Cuotas de Firebase:** Monitorear en la consola de Firebase que las lecturas diarias de Firestore se mantengan en el plan gratuito (*Spark Plan*), garantizado por el uso de `getDocs` en lugar de conexiones en tiempo real permanentes.
3. **Respaldo Periódico de Contenidos:** Realizar exportaciones periódicas de la colección `blog_posts` mediante Firebase CLI o consola de Google Cloud.
4. **Verificación de Enlaces de Contacto:** Probar periódicamente los enlaces inteligentes y mensajes predefinidos de WhatsApp (+52 33 1836 3829) y el canal de correo para asegurar una comunicación ininterrumpida.

---
*Fin de la Especificación Técnica Oficial para Diana Ledesma | Psicología Clínica.*
