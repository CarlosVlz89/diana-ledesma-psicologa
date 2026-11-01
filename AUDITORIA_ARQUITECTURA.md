# AUDITORÍA TÉCNICA PROFUNDA Y DIAGNÓSTICO DE ARQUITECTURA
**Proyecto:** Diana Ledesma - Psicología Clínica (`diana-psicologia`)  
**Fecha de Auditoría:** Octubre 2026  
**Rol del Auditor:** Principal Software Architect & Senior Frontend/Cloud Engineer (React & Firebase)  
**Entorno de Ejecución:** Vite 5 + React 18 (SPA One-Page) + Firebase 10 + Tailwind CSS 3  

---

## ÍNDICE GENERAL
1. [Resumen Ejecutivo y Diagnóstico Global](#1-resumen-ejecutivo-y-diagnóstico-global)
2. [Eje 1: Diagnóstico de Arquitectura General y Modularidad](#2-eje-1-diagnóstico-de-arquitectura-general-y-modularidad)
3. [Eje 2: Auditoría de Integración con Firebase (Infraestructura y Datos)](#3-eje-2-auditoría-de-integración-con-firebase-infraestructura-y-datos)
4. [Eje 3: Rendimiento, UX y Estilos](#4-eje-3-rendimiento-ux-y-estilos)
5. [Eje 4: Diagnóstico de Deuda Técnica y Matriz de Riesgos](#5-eje-4-diagnóstico-de-deuda-técnica-y-matriz-de-riesgos)
6. [Eje 5: Propuesta de Arquitectura Objetivo (Blueprint Canónico)](#6-eje-5-propuesta-de-arquitectura-objetivo-blueprint-canónico)
7. [Hoja de Ruta de Refactorización por Fases Seguras (Roadmap)](#7-hoja-de-ruta-de-refactorización-por-fases-seguras-roadmap)

---

## 1. RESUMEN EJECUTIVO Y DIAGNÓSTICO GLOBAL

El proyecto **Diana Ledesma - Psicología Clínica** es una Single Page Application (SPA) construida con React 18 y Vite, estilizada con Tailwind CSS y respaldada por Firebase (Authentication y Firestore). La aplicación ofrece una presencia digital profesional para consulta psicológica privada, incorporando secciones informativas, agenda de citas vía Google Calendar y un módulo de Blog interactivo con capacidades administrativas (CRUD).

### Calificación General del Estado del Código

| Dimensión | Puntuación (1-10) | Estado | Observación Principal |
| :--- | :---: | :---: | :--- |
| **Modularidad y Separación de Capas** | **3.0 / 10** | 🔴 Crítico | No existe capa de servicios; la UI consume directamente Firebase SDK. |
| **Seguridad y Aislamiento de Datos** | **2.5 / 10** | 🔴 Crítico | Control de acceso 100% en cliente; credenciales y correos expuestos en Git. |
| **Rendimiento y Optimización de Carga** | **4.0 / 10** | 🟡 Deficiente | Activo estático de 2.33 MB en header; bundle vendor monolithic (>630 KB). |
| **Estabilidad y Manejo de Errores** | **4.5 / 10** | 🟡 Deficiente | Errores asíncronos silenciados; listeners en tiempo real innecesarios. |
| **Consistencia del Sistema de Diseño** | **5.0 / 10** | 🟡 Regular | Tokens de color rotos/huérfanos entre `constants.js` y `tailwind.config.js`. |
| **Accesibilidad (a11y) y Semántica** | **4.0 / 10** | 🟡 Deficiente | Modales sin WAI-ARIA/Focus Trap; elementos clickeables no semánticos. |

**Nivel de Acoplamiento Global:** **8.5 / 10 (Acoplamiento Crítico)**.

---

## 2. EJE 1: DIAGNÓSTICO DE ARQUITECTURA GENERAL Y MODULARIDAD

### 2.1. Análisis Estructural de la Carpeta `src/`

La estructura física actual del proyecto presenta la siguiente distribución:

```text
src/
├── assets/
│   ├── .DS_Store
│   └── logo.png (2.33 MB)
├── components/
│   ├── layout/
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── PrivacyModal.jsx
│       ├── RegulationsModal.jsx
│       ├── Reveal.jsx
│       └── Section.jsx
├── config/
│   └── constants.js
├── hooks/
│   └── useOnScreen.js
├── sections/
│   ├── About.jsx
│   ├── Blog.jsx
│   ├── Contact.jsx
│   ├── Hero.jsx
│   └── Services.jsx
├── utils/
│   └── scroll.js
├── App.jsx
├── firebase.js
├── index.css
└── main.jsx
```

#### Hallazgos Estructurales:
1. **Ausencia de Capa de Dominio/Servicios:** No existen directorios para `services/`, `api/`, `context/` o `types/`. Cualquier interacción con la red o el SDK de terceros se resuelve ad-hoc en los componentes de vista.
2. **Confusión en la Jerarquía de Componentes UI:**
   - La carpeta `src/components/ui/` mezcla componentes atómicos agnósticos del dominio (`Button.jsx`, `Section.jsx`, `Reveal.jsx`) con modales de alto contenido y reglas de negocio específicas (`PrivacyModal.jsx`, `RegulationsModal.jsx`).
   - Los modales contienen textos estáticos legales y de encuadre psicoterapéutico que deberían gestionarse como contenido o módulos desacoplados, no como primitivas UI reutilizables.
3. **Archivos Basura en el Árbol de Código:** Presencia de archivos `.DS_Store` en `src/`, `src/sections/`, `src/config/`, `src/components/`, `src/assets/`, lo que denota un `.gitignore` incompleto y falta de higiene en el control de versiones.

---

### 2.2. Análisis de Monolitismo en Componentes de Vista (One-Page)

El componente principal `App.jsx` y la sección `src/sections/Blog.jsx` presentan una alta densidad de responsabilidades mezcladas (violación del Principio de Responsabilidad Única - SRP).

#### A. El Monolito `src/sections/Blog.jsx` (226 líneas)
Este archivo asume simultáneamente cinco responsabilidades distintas:
1. **Infraestructura y Persistencia:** Importa e interactúa directamente con 9 funciones del SDK de Firestore (`collection`, `addDoc`, `query`, `orderBy`, `onSnapshot`, `deleteDoc`, `doc`, `serverTimestamp`, `updateDoc`).
2. **Gestión de Estado Múltiple:** Maneja 6 variables de estado local (`posts`, `loading`, `isEditing`, `selectedPost`, `currentPost`, `error`, `showAll`).
3. **Lógica de Mutación y Validaciones de Negocio:** Valida permisos (`if (!isAdmin) return;`), gestiona diálogos bloqueantes del navegador (`confirm("¿Borrar artículo?")`), y construye las cargas útiles de datos.
4. **Presentación de Tarjetas y Animaciones:** Renderiza el grid responsivo, aplica animaciones con `Reveal` y manipula imágenes de fallback.
5. **Formulario Administrativo y Modal de Lectura:** Renderiza de forma condicional tanto el formulario de creación/edición de artículos como el modal flotante de lectura completa del artículo.

```mermaid
graph TD
    A["Blog.jsx (Monolito)"] --> B["Firestore SDK (Llamadas Directas)"]
    A --> C["Estado Local (7 useState)"]
    A --> D["Lógica de Admin (Create, Update, Delete)"]
    A --> E["Renderizado de Catálogo (Cards Grid)"]
    A --> F["Formulario Editor (Inline Form)"]
    A --> G["Visor de Artículo (Modal Backdrop)"]
```

#### B. El Monolito de Orquestación `src/App.jsx` (85 líneas)
En lugar de actuar como un enrutador o layout declarativo ligero, `App.jsx`:
- Suscribe y desuscribe listeners de autenticación (`onAuthStateChanged`).
- Implementa los manejadores de Google Auth (`signInWithPopup`, `signOut`).
- Ejecuta la regla de autorización de administrador (`isAdmin = user && adminEmails.includes(user.email)`).
- Controla la visibilidad de dos modales globales (`isPrivacyOpen`, `isRegulationsOpen`).
- Instancia y monta en memoria simultáneamente todas las secciones del sitio (`Hero`, `About`, `Services`, `Blog`, `Contact`).

---

### 2.3. Manejo de Estado Global vs. Local y Prop Drilling

El proyecto adolece de una ausencia total de un gestor de estado global (como React Context, Zustand o Redux). Esto provoca un patrón agudo de **Prop Drilling**:

```text
[App.jsx]
  │  ├── state: user, isAdmin
  │  ├── handlers: handleGoogleLogin, handleLogout
  │  ├── state: isPrivacyOpen, isRegulationsOpen
  │
  ├──> <Navbar user={user} isAdmin={isAdmin} />
  │
  ├──> <Blog user={user} isAdmin={isAdmin} />
  │
  ├──> <Footer 
  │      user={user} 
  │      isAdmin={isAdmin} 
  │      handleLogin={handleGoogleLogin} 
  │      handleLogout={handleLogout} 
  │      onOpenPrivacy={...} 
  │      onOpenRegulations={...} 
  │    />
  │
  └──> <RegulationsModal isAdmin={isAdmin} ... />
```

#### Consecuencias en Renders:
- Cada cambio en el estado de autenticación (login, logout, refresco de token) fuerza la reconciliación del árbol completo en `App.jsx`, re-renderizando innecesariamente `Navbar`, `Hero`, `About`, `Services`, `Blog`, `Contact` y `Footer`.
- La apertura de cualquiera de los modales (`isPrivacyOpen`, `isRegulationsOpen`) recrea el render de la página completa.

---

## 3. EJE 2: AUDITORÍA DE INTEGRACIÓN CON FIREBASE (INFRAESTRUCTURA Y DATOS)

### 3.1. Detección de Acoplamiento y Violación de Capas

El análisis exhaustivo del código revela que el SDK cliente de Firebase está acoplado de forma rígida directamente dentro del JSX de los componentes:

#### Fragmento 1: `src/App.jsx` (Líneas 4-5, 28-50)
```javascript
import { auth } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
// ...
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  document.title = "Diana Ledesma | Psicóloga Clínica";
  return () => unsubscribe();
}, []);

const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Login failed", error);
    alert("Error al iniciar sesión. Verifica tu configuración de Firebase.");
  }
};
```
*Diagnóstico:* La vista maneja la instanciación de proveedores OAuth, llamadas asíncronas y alertas nativas del navegador acopladas al nombre de la tecnología ("Firebase").

#### Fragmento 2: `src/sections/Blog.jsx` (Líneas 3-4, 37-84)
```javascript
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
// ...
useEffect(() => {
  const q = query(collection(db, 'blog_posts'), orderBy('createdAt', 'desc'));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(postsData);
    setLoading(false);
  }, (err) => { console.error(err); setLoading(false); });
  return () => unsubscribe();
}, []);
```
*Diagnóstico:* El componente no puede ser probado unitariamente ni reutilizado en un entorno de pruebas visuales (Storybook) sin montar la infraestructura completa de Firebase.

---

### 3.2. Gestión de Estados Asíncronos, Conexiones y Riesgos de Fuga de Memoria

#### A. Persistencia Innecesaria de WebSockets (`onSnapshot` en One-Page)
- En `Blog.jsx`, se utiliza `onSnapshot` para escuchar en tiempo real la colección `blog_posts`.
- En una web informativa para una consulta psicológica, los artículos se publican esporádicamente (semanal o mensualmente).
- Dado que es una aplicación One-Page donde `Blog` permanece montado en el DOM durante toda la sesión del usuario, mantener una conexión activa (WebSocket / Long Polling) genera:
  1. Consumo innecesario de cuota de lectura en Firestore (cada reconnect o actualización remota computa lecturas).
  2. Retención de recursos en navegadores móviles.
- **Recomendación técnica:** Sustituir por lectura bajo demanda (`getDocs`) con caché en memoria o revalidación pasiva (SWR o TanStack Query).

#### B. Ausencia de Estado de Carga Inicial en Autenticación (`Auth Initialization`)
- En `App.jsx`, `const [user, setUser] = useState(null);` inicia en `null`.
- `onAuthStateChanged` es asíncrono. Durante los primeros 300 ms - 800 ms de carga inicial, la app asume que el usuario es un visitante anónimo, aun cuando haya una sesión activa persistida en `IndexedDB`.
- **Efecto visual (Flicker / Layout Shift):** El botón del footer muestra `"Acceso Psicóloga"`, y luego de un instante muta a `"Hola, Diana Ledesma (★ Administrador)"`, provocando un salto visual indeseado.
- Falta un estado `authLoading: boolean` que retrase los componentes dependientes de autorización hasta resolver el token inicial.

#### C. Silenciamiento de Errores Asíncronos (Silent Failures)
- En `Blog.jsx` (Línea 72):
  ```javascript
  } catch (err) { 
    setError('Error al guardar.'); 
  }
  ```
  La variable de estado `error` es actualizada con `setError('Error al guardar.')`, **pero la variable `error` no se renderiza en ningún lugar del JSX del componente**. Si la escritura en Firestore falla (por ejemplo, rechazo por Reglas de Seguridad), el usuario hace clic en "Publicar", el formulario no responde, no muestra mensaje alguno y el error queda completamente silenciado.
- En `Blog.jsx` (Línea 81):
  ```javascript
  const handleDelete = async (e, id) => { 
    // ...
    try { 
      await deleteDoc(doc(db, 'blog_posts', id)); 
    } catch (err) { 
      console.error(err); 
    } 
  };
  ```
  Si el borrado es rechazado por Firestore, no hay ninguna retroalimentación visual; el artículo simplemente no desaparece de la pantalla.

#### D. Bug en la Creación vs. Edición de Fechas (`serverTimestamp`)
- Al editar un post existente en `handleSavePost`:
  ```javascript
  const postData = { 
    // ...
    createdAt: serverTimestamp(), 
  };
  if (currentPost.id) { 
    await updateDoc(doc(db, 'blog_posts', currentPost.id), postData); 
  }
  ```
  Cada vez que un artículo existente es editado, su campo original `createdAt` es sobreescrito con la fecha actual, alterando el orden cronológico del blog y perdiendo la fecha histórica de publicación. Debe existir distinción entre `createdAt` y `updatedAt`.

---

### 3.3. Aislamiento de Configuración, Variables de Entorno y Seguridad

#### A. Credenciales Hardcodeadas en Código Fuente (`src/firebase.js`)
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCKQxD283QgSB7hotsQQIXhMDgVbLgR9j0",
  authDomain: "diana-psicologia.firebaseapp.com",
  projectId: "diana-psicologia",
  storageBucket: "diana-psicologia.firebasestorage.app",
  messagingSenderId: "713339277261",
  appId: "1:713339277261:web:d706901838cf6436243e84"
};
```
- Aunque las llaves públicas de Firebase identifican el proyecto en Google Cloud y no otorgan permisos por sí solas, quemarlas en el código fuente:
  1. Impide implementar entornos diferenciados (ej. `development` vs `production`).
  2. Viola el principio III de la metodología *The Twelve-Factor App* (Configuración en variables de entorno).
  3. No utiliza el estándar de Vite `import.meta.env.VITE_*`.

#### B. Vulnerabilidad Crítica: Autorización de Administrador Exclusivamente en el Cliente
En `src/config/constants.js`:
```javascript
export const adminEmails = [
  "carlos.mtzvelez@gmail.com", 
  "dianaledesma@gmail.com"
];
```
Y en `src/App.jsx`:
```javascript
const isAdmin = user && adminEmails.includes(user.email);
```
- **Riesgo Crítico de Seguridad:** Los correos electrónicos personales están expuestos en el bundle público de JavaScript accesible por cualquier usuario inspeccionando la pestaña Red/Sources.
- **Bypass Trivial:** Si la base de datos de Firestore no cuenta con `firestore.rules` estrictas desplegadas en la nube que verifiquen el token JWT del usuario (`request.auth.token.email in [...]` o Custom Claims), cualquier atacante puede abrir la consola de DevTools de Chrome e invocar directamente la SDK:
  ```javascript
  // Ejecutable directamente en consola por cualquier usuario autenticado con cualquier cuenta de Google
  deleteDoc(doc(db, 'blog_posts', 'ID_DEL_POST'));
  ```
- No existe en el repositorio ningún archivo `firestore.rules` ni `firebase.json` que declare formalmente las reglas de acceso a nivel backend.

---

## 4. EJE 3: RENDIMIENTO, UX Y ESTILOS

### 4.1. Análisis de Impacto de Renders en Arquitectura One-Page

#### A. Defecto de Rendimiento en `src/hooks/useOnScreen.js`
Examinando el hook de detección de visibilidad:
```javascript
export const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [ref, options]); // <--- RIESGO: 'options' se pasa por referencia

  return [ref, isVisible];
};
```
Y su invocación en `src/components/ui/Reveal.jsx`:
```javascript
const Reveal = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 }); // Objeto literal nuevo en cada render
  // ...
```
- **Mecanismo de Falla:** En cada render del componente `Reveal`, la expresión `{ threshold: 0.1 }` genera una nueva referencia de objeto en memoria heap.
- Esto provoca que el arreglo de dependencias `[ref, options]` del `useEffect` cambie en cada ciclo de render, **desconectando y volviendo a instanciar un nuevo `IntersectionObserver` continuamente**. En una página con decenas de elementos animados con `Reveal`, este patrón satura el recolector de basura del navegador.

#### B. Listener de Scroll Global No Estrangulado (Unthrottled Scroll) en `src/components/layout/Navbar.jsx`
```javascript
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 20);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```
- El evento `scroll` se ejecuta hasta 120 veces por segundo en pantallas con alta tasa de refresco (móviles y portátiles modernos).
- No se utiliza la bandera `{ passive: true }` en el `addEventListener`, impidiendo optimizaciones del compositor de hilos del navegador.
- Aunque `setScrolled` recibe un booleano, ejecutar la función en cada micro-scroll añade sobrecarga innecesaria en el hilo principal (Main Thread).

---

### 4.2. Análisis de Carga de Assets y Bundling

Ejecución de la compilación de producción (`npm run build`):
```text
dist/index.html                     0.53 kB │ gzip:   0.33 kB
dist/assets/logo-BxVWWkp-.png   2,328.59 kB
dist/assets/index-ChDiIDgM.css     32.26 kB │ gzip:   5.74 kB
dist/assets/index-VRhIVNyp.js     632.16 kB │ gzip: 162.06 kB
(!) Some chunks are larger than 500 kB after minification.
```

#### Hallazgos Críticos de Rendimiento:
1. **Activo Crítico Descomunal (`logo.png` de 2.33 MB):**
   - El archivo `src/assets/logo.png` pesa **2,328,589 bytes (2.33 Megabytes)**.
   - Se carga de forma síncrona en el `Navbar.jsx` en la parte superior del viewport inicial.
   - En redes móviles 3G o 4G con señal media, la descarga de este único logotipo demora más de 2.5 a 4 segundos, destruyendo las métricas de **Largest Contentful Paint (LCP)** y **First Contentful Paint (FCP)** de Core Web Vitals.
   - **Corrección requerida:** Redimensionar y convertir el logo a formato moderno `.webp` o `.svg` optimizado, reduciendo su peso por debajo de 30 KB (una reducción del 98.7% en peso).
2. **Chunk JavaScript Monolítico (>630 KB):**
   - Todo el código de React, React DOM, Lucide Icons y el SDK completo de Firebase (Auth + Firestore) está condensado en un único archivo `index-VRhIVNyp.js`.
   - No se utiliza carga perezosa (`React.lazy` / `Suspense`). El usuario que solo desea leer el número de teléfono o consultar los servicios descarga el código administrativo del editor de blog y el SDK de autenticación de Google.
3. **Favicon Roto en `index.html`:**
   - La etiqueta `<link rel="icon" type="image/svg+xml" href="/vite.svg" />` referencia a `/vite.svg`, archivo que no existe en el proyecto ni en `dist`, generando un error 404 en la consola del navegador.

---

### 4.3. Coherencia del Sistema de Diseño (Tailwind CSS)

Se detectó una discrepancia grave entre la configuración declarada en `tailwind.config.js` y las clases utilitarias utilizadas en el código:

#### A. Definición en `tailwind.config.js`:
```javascript
extend: {
  colors: {
    brand: {
      bg: '#FAF3E0',       // Crema de Té
      text: '#35322F',     // Carbón Vegetal
      accent: '#BC8A5F',   // Marrón Arcilla
      sage: '#828E82',     // Salvia
      glass: 'rgba(250, 243, 224, 0.6)', 
    }
  }
}
```

#### B. Definición Contradictoria en `src/config/constants.js`:
```javascript
export const colors = {
  bg: "bg-brand-cream",           // ⚠️ NO EXISTE EN TAILWIND
  primary: "text-brand-dark",     // ⚠️ NO EXISTE EN TAILWIND
  accent: "text-brand-terra",     // ⚠️ NO EXISTE EN TAILWIND
  accentBg: "bg-brand-terra",     // ⚠️ NO EXISTE EN TAILWIND
  secondaryBg: "bg-brand-sage/20",
  glass: "glass-panel",
};
```

#### C. Invocación en `src/App.jsx` (Línea 53):
```javascript
<div className={`min-h-screen ${colors.bg} font-sans text-brand-dark selection:bg-brand-terra/30 selection:text-brand-dark`}>
```
- **Falla Directa:** Las clases `bg-brand-cream`, `text-brand-dark` y `bg-brand-terra` **no están definidas en `tailwind.config.js`**.
- El compilador JIT de Tailwind simplemente las ignora y no genera CSS para ellas. La aplicación funciona visualmente únicamente porque en `src/index.css` existe una regla global de fallback sobre el tag `body`:
  ```css
  body {
    @apply bg-brand-bg text-brand-text antialiased ...;
  }
  ```
  Esto representa código muerto, engañoso y altamente propenso a romperse en futuras actualizaciones.

#### D. Plugin `@tailwindcss/typography` no Activado
- En `package.json` figura instalado `"@tailwindcss/typography": "^0.5.19"`.
- Sin embargo, en `tailwind.config.js`:
  ```javascript
  plugins: [],
  ```
  El arreglo `plugins` está vacío. Como consecuencia, las clases `prose prose-stone prose-lg` empleadas en `Blog.jsx` y `PrivacyModal.jsx` no son procesadas correctamente con los estilos por defecto de tipografía editorial.

#### E. Fuentes Tipográficas Ausentes
- `tailwind.config.js` declara:
  ```javascript
  fontFamily: {
    serif: ['Playfair Display', 'serif'],
    sans: ['Inter', 'sans-serif'],
  }
  ```
- **Diagnóstico:** Ni `Playfair Display` ni `Inter` están importadas en `index.html` (vía `<link rel="preconnect">` a Google Fonts) ni en `src/index.css` (vía `@import` o `@font-face`). Los navegadores de los usuarios están cayendo en las fuentes del sistema genéricas (Times New Roman / Arial), distorsionando la identidad visual diseñada para el proyecto.

---

### 4.4. Accesibilidad (a11y) y Semántica HTML

1. **Uso de Elementos No Semánticos para Acciones Interactivas:**
   - En `Blog.jsx`:
     ```javascript
     <article onClick={() => setSelectedPost(post)} className="... cursor-pointer">
     ```
     Un elemento `<article>` con evento `onClick` no es accesible por teclado (no recibe foco con tecla `Tab`, no responde a `Enter` o `Space`, y no anuncia rol semántico a lectores de pantalla). Debe encapsularse en un `<button>` o enlace accesible.
   - En `Navbar.jsx`: El contenedor del logo tiene `onClick={() => scrollToSection('home')}` sobre un `<div>`, sin atributo `role="button"` ni `tabIndex="0"`.
2. **Deficiencias en los Modales (WAI-ARIA Dialog):**
   - Ninguno de los modales (`PrivacyModal`, `RegulationsModal`, `Blog` modal de lectura) implementa:
     - Atributos `role="dialog"` y `aria-modal="true"`.
     - `aria-labelledby` apuntando al título del modal.
     - Atrapamiento de foco (*Focus Trap*): El usuario que navega por teclado puede seguir tabulando los elementos que están detrás del modal.
     - Cierre mediante la tecla `Escape`.
3. **Contraste de Color:**
   - Textos como `text-brand-bg/60` en el `Footer.jsx` sobre el fondo `bg-brand-sage` no superan la relación de contraste mínima recomendada por WCAG 2.1 AA (4.5:1), dificultando la legibilidad para usuarios con debilidad visual o en exteriores con luz solar directa.

---

## 5. EJE 4: DIAGNÓSTICO DE DEUDA TÉCNICA Y MATRIZ DE RIESGOS

### 5.1. Puntos Críticos con Mayor Riesgo de Romperse

1. **Riesgo 1: Escalada de Privilegios y Corrupción de Datos en Firestore**
   - *Severidad:* **Catastrófica**
   - *Causa:* Lógica de administrador client-side (`isAdmin` en React). Sin reglas seguras en Firebase Console, cualquier usuario autenticado puede borrar o modificar publicaciones mediante scripts en consola.
2. **Riesgo 2: Pérdida o Duplicación de Fechas en Publicaciones**
   - *Severidad:* **Alta**
   - *Causa:* La función de actualización en `Blog.jsx` reescribe `createdAt: serverTimestamp()`. Al corregir un typo ortográfico, la publicación pierde su antigüedad original y salta al primer lugar del blog.
3. **Riesgo 3: Desincronización y Runtime Crash por `user.uid` Nulo**
   - *Severidad:* **Alta**
   - *Causa:* En `handleSavePost`:
     ```javascript
     authorId: user.uid,
     ```
     Si la sesión de autenticación expira en segundo plano o el estado se desincroniza, al presionar "Publicar" la aplicación lanzará un `Uncaught TypeError: Cannot read properties of null (reading 'uid')`, dejando la interfaz en blanco para el administrador.
4. **Riesgo 4: Caída en Core Web Vitals por Asset de 2.33 MB**
   - *Severidad:* **Media-Alta**
   - *Causa:* El archivo `logo.png` penaliza el posicionamiento SEO en Google al disparar el tiempo de LCP por encima de 4.0 segundos en dispositivos móviles.
5. **Riesgo 5: Fuga de Memoria y Ciclos Inútiles en `useOnScreen`**
   - *Severidad:* **Media**
   - *Causa:* La referencia inestable del objeto `options` en `Reveal` fuerza la recreación continua del `IntersectionObserver` en cada render de la página.

---

### 5.2. Evaluación Cuantitativa del Acoplamiento

```text
[Bajo Acoplamiento: 1] ──── [Acoplamiento Moderado: 5] ──── [Acoplamiento Crítico: 10]
                                                                  ▲
                                                                  │
                                                          Calificación: 8.5
```

**Justificación del puntaje (8.5 / 10):**
- **Acoplamiento Directo UI-Infraestructura:** La vista conoce los nombres de colecciones, campos de base de datos y métodos del SDK de Firebase.
- **Acoplamiento de Estado Global mediante Prop Drilling:** Componentes de navegación y pie de página están íntimamente acoplados a la lógica de autenticación de la raíz.
- **Acoplamiento de Configuración:** Credenciales y reglas de autorización quemadas en archivos de lógica de presentación.

---

## 6. EJE 5: PROPUESTA DE ARQUITECTURA OBJETIVO (BLUEPRINT RECOMENDADO)

### 6.1. Patrón Arquitectónico: Service-Repository + Custom Hook Adapter

Se propone migrar a una arquitectura en tres capas bien delimitadas:

```mermaid
flowchart TD
    subgraph Presentation_Layer["Capa de Presentación (UI Pura)"]
        A["Sections (Hero, Services, BlogSection)"]
        B["UI Components (Button, Modal, Card)"]
    end

    subgraph Adapter_Layer["Capa de Adaptación y Estado (Hooks & Context)"]
        C["AuthContext (useAuth)"]
        D["useBlog (React State / Query)"]
    end

    subgraph Service_Layer["Capa de Infraestructura y Servicios"]
        E["authService.js"]
        F["blogService.js"]
        G["firebaseClient.js (Env Vars)"]
    end

    subgraph External_Cloud["Firebase Cloud Services"]
        H[("Cloud Firestore")]
        I["Firebase Auth"]
    end

    Presentation_Layer -->|Consume estado y handlers| Adapter_Layer
    Adapter_Layer -->|Llama métodos agnósticos de UI| Service_Layer
    Service_Layer -->|SDK Calls| External_Cloud
```

1. **Capa de Infraestructura (`src/services/`):**
   - Funciones asíncronas puras en JavaScript/TypeScript que se comunican con Firebase.
   - No tienen noción de JSX, estado de React ni componentes.
   - Retornan objetos limpios de dominio y propagan errores tipados.
2. **Capa de Adaptación / Estado (`src/context/` y `src/hooks/`):**
   - `AuthContext`: Provee `{ user, isAdmin, loading, loginWithGoogle, logout }` a cualquier componente del árbol sin prop drilling.
   - `useBlog`: Encapsula la obtención de posts, paginación, filtros y operaciones CRUD con sus respectivos estados (`isLoading`, `error`, `isSubmitting`).
3. **Capa de Presentación (`src/components/`, `src/features/`, `src/sections/`):**
   - Componentes declarativos puros ("dumb components"). Reciben props y renderizan UI.
   - Facilidad absoluta para pruebas unitarias con Jest/Vitest y desarrollo aislado en Storybook.

---

### 6.2. Árbol Canónico de Carpetas Recomendado

```text
src/
├── assets/
│   ├── images/
│   │   ├── logo.webp            # Logotipo optimizado (<30 KB)
│   │   └── default-categories/  # Imágenes locales optimizadas
│   └── icons/
├── config/
│   ├── env.js                   # Validación y lectura de import.meta.env
│   └── constants.js             # Constantes públicas de diseño y navegación
├── context/
│   ├── AuthContext.jsx          # Provider global de autenticación
│   └── UIModalContext.jsx       # Control centralizado de modales y diálogos
├── features/
│   └── blog/
│       ├── components/
│       │   ├── BlogCard.jsx
│       │   ├── BlogEditorModal.jsx
│       │   ├── BlogGrid.jsx
│       │   └── BlogReaderModal.jsx
│       ├── hooks/
│       │   └── useBlogPosts.js
│       └── utils/
│           └── blogFormatters.js
├── hooks/
│   ├── useAuth.js               # Consumo del AuthContext
│   ├── useIntersection.js       # Hook optimizado con ref estable
│   └── useScrollThrottle.js     # Scroll pasivo estrangulado
├── services/
│   └── firebase/
│       ├── client.js            # Inicialización aislada con env vars
│       ├── authService.js       # loginWithGoogle, logout, onAuthChange
│       └── blogService.js       # getPosts, createPost, updatePost, deletePost
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Modal.jsx            # Modal base accesible (WAI-ARIA)
│   │   ├── Section.jsx
│   │   ├── Reveal.jsx
│   │   └── Toast.jsx            # Notificaciones visuales de error/éxito
│   └── legal/
│       ├── PrivacyContent.jsx
│       └── RegulationsContent.jsx
├── sections/
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── BlogSection.jsx          # Orquestador del feature Blog
│   └── Contact.jsx
├── styles/
│   └── index.css
├── utils/
│   ├── dateUtils.js
│   └── scrollUtils.js
├── App.jsx                      # Orquestador limpio y minimalista
└── main.jsx
```

---

## 7. HOJA DE RUTA DE REFACTORIZACIÓN POR FASES SEGURAS (ROADMAP)

Para garantizar la estabilidad del negocio y no romper ninguna funcionalidad existente, la refactorización debe ejecutarse en 4 fases incrementales:

```mermaid
flowchart LR
    Fase0["Fase 0: Seguridad y Config"] --> Fase1["Fase 1: Capa de Servicios"]
    Fase1 --> Fase2["Fase 2: Desacoplar Blog & Auth"]
    Fase2 --> Fase3["Fase 3: Rendimiento & Assets"]
    Fase3 --> Fase4["Fase 4: Consolidar UI & a11y"]
```

### Fase 0: Seguridad, Entorno y Configuración Base
- [ ] Crear archivo `.env.example` y `.env` con las variables:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
  - `VITE_ADMIN_EMAILS`
- [ ] Configurar `src/config/env.js` para validar la existencia de estas variables al arrancar.
- [ ] Agregar `.DS_Store` y `.env` al `.gitignore`.
- [ ] Redactar el archivo `firestore.rules` en la raíz para validar la autorización de escritura a nivel de base de datos antes de refactorizar la UI:
  ```javascript
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      function isAdmin() {
        return request.auth != null && 
          request.auth.token.email in ['carlos.mtzvelez@gmail.com', 'dianaledesma@gmail.com'];
      }
      match /blog_posts/{postId} {
        allow read: if true;
        allow create, update, delete: if isAdmin();
      }
    }
  }
  ```

### Fase 1: Abstracción de Firebase y Capa de Servicios
- [ ] Crear `src/services/firebase/client.js` que inicialice Firebase usando `env.js`.
- [ ] Crear `src/services/firebase/authService.js` aislando `GoogleAuthProvider`, `signInWithPopup`, `signOut` y el listener `onAuthStateChanged`.
- [ ] Crear `src/services/firebase/blogService.js` con los métodos:
  - `fetchBlogPosts()` (usando `getDocs` con orden cronológico descendente).
  - `createBlogPost(postData, user)`.
  - `updateBlogPost(id, postData)`.
  - `deleteBlogPost(id)`.
- [ ] Implementar `AuthContext.jsx` y el hook `useAuth()` exponiendo `user`, `isAdmin` y `loading`.

### Fase 2: Desacoplamiento del Módulo de Blog y Eliminación de Prop Drilling
- [ ] Refactorizar `App.jsx` para envolver la aplicación en `<AuthProvider>` y `<UIModalProvider>`.
- [ ] Eliminar los props `user`, `isAdmin`, `handleLogin`, `handleLogout` de `Navbar`, `Footer` y `Blog`. Consumirlos mediante `useAuth()`.
- [ ] Modularizar `src/sections/Blog.jsx`:
  - Extraer el formulario de edición a `src/features/blog/components/BlogEditorModal.jsx`.
  - Extraer el modal de lectura a `src/features/blog/components/BlogReaderModal.jsx`.
  - Extraer la tarjeta a `src/features/blog/components/BlogCard.jsx`.
  - Crear el hook `useBlogPosts.js` que gestione los estados `posts`, `loading`, `error` y las operaciones CRUD.
- [ ] Corregir la actualización de fechas: registrar `updatedAt` sin sobreescribir `createdAt`.
- [ ] Añadir feedback visual en pantalla (Toasts/Banners) para errores en operaciones de guardado y borrado.

### Fase 3: Optimización de Rendimiento, Assets y Carga
- [ ] Optimizar `logo.png` convirtiéndolo a WebP de alta densidad (máximo 40 KB) y actualizar la importación en `Navbar.jsx`.
- [ ] Refactorizar `src/hooks/useOnScreen.js` para memoizar o comparar las opciones de entrada evitando la recreación infinita de `IntersectionObserver`.
- [ ] Implementar estrangulamiento (throttle) o flag pasiva en el listener de scroll de `Navbar.jsx`.
- [ ] Aplicar `React.lazy` para la carga diferida de los modales y del editor de blog, reduciendo el tamaño del bundle principal.
- [ ] Reemplazar la referencia al favicon `/vite.svg` en `index.html` por un favicon real del proyecto.

### Fase 4: Consolidación del Sistema de Diseño y Accesibilidad (a11y)
- [ ] Sincronizar `tailwind.config.js` y `src/config/constants.js`:
  - Eliminar referencias a `brand-cream`, `brand-dark` y `brand-terra`.
  - Consolidar los tokens reales (`brand-bg`, `brand-text`, `brand-accent`, `brand-sage`).
- [ ] Registrar el plugin `@tailwindcss/typography` en `tailwind.config.js`.
- [ ] Agregar la importación de las fuentes tipográficas `Playfair Display` e `Inter` en `index.html`.
- [ ] Crear un componente genérico accesible `<Modal>` con atributos `role="dialog"`, `aria-modal="true"`, foco atrapado (*Focus Trap*) y cierre con tecla `Escape`.
- [ ] Transformar los elementos interactivos `<article>` del blog en contenedores accesibles con navegación por teclado.

---
*Informe técnico elaborado por el Arquitecto de Software y Especialista Cloud. Documento oficial de diagnóstico de arquitectura para el proyecto Diana Ledesma Psicología.*
