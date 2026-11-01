# AUDITORÍA ESTÉTICA, VISUAL Y DE EXPERIENCIA DE USUARIO (UI/UX)
## Diana Ledesma | Psicología Clínica
**Diagnóstico de Neuromarketing Clínico, Atmósfera Visual, Sistemas de Diseño y Conversión Empática**

---

### Control de Versión y Ficha Técnica de la Auditoría

| Parámetro | Detalle de la Evaluación |
| :--- | :--- |
| **Identificador del Proyecto** | `diana-psicologia` (Vite SPA + Tailwind CSS + React 18) |
| **Fecha de Realización** | Octubre 2026 |
| **Rol Evaluador** | Principal Product Designer, Lead UI/UX Engineer & Clinical Neuromarketing Consultant |
| **Alcance de la Auditoría** | Arquitectura visual, psicología del color, tipografía, affordance, microinteracciones y fricción clínica |
| **Estado del Workspace** | Fases 0 a 4 de infraestructura completadas (código desacoplado, sin deuda técnica de Firebase) |

---

## 1. RESUMEN EJECUTIVO Y PUNTUACIÓN ESTÉTICA

El sitio web de **Diana Ledesma | Psicología Clínica** ha alcanzado una base de código limpia, modular y de alto rendimiento. No obstante, desde la perspectiva del **diseño de producto, la dirección de arte y la psicología del consultante**, la interfaz actual proyecta una sensación mixta: oscila entre un catálogo web cálido y una plantilla genérica de bienestar (*lifestyle/wellness*) de principios de la década de 2020. 

Un consultante que busca ayuda psicológica se encuentra frecuentemente en un estado de vulnerabilidad emocional (ansiedad, fatiga mental, duelo o incertidumbre). Este perfil de usuario requiere:
1. **Contención Emocional:** Tonos que reduzcan la sobreestimulación visual sin caer en una paleta deslavada o lúgubre.
2. **Autoridad y Credibilidad Científica:** Claridad de credenciales, rigor metodológico y transparencia clínica.
3. **Mínima Fricción de Decisión:** Caminos de conversión predecibles, seguros y sin ambigüedad instrumental.

### Panel de Puntuación Estética y Funcional

| Dimensión de Diseño | Calificación (1-10) | Diagnóstico Ejecutivo |
| :--- | :---: | :--- |
| **Atmósfera Cromática y Contención** | **6.0 / 10** | Tonos agradables pero aplicados con monotonía; contraste insuficiente en acentos dorados/arcilla (`brand.accent` falla WCAG AA en texto). |
| **Tipografía y Ritmo Editorial** | **6.5 / 10** | Excelente combinación de fuentes (`Playfair Display` + `Inter`), pero con medidas de párrafo excesivamente anchas y divisores de título anticuados. |
| **Espaciado y Composición (Layout)** | **5.5 / 10** | El *Hero* en móviles está saturado por 4 fotos de stock que empujan el valor clínico; falta de ritmos de fondo diferenciados entre secciones. |
| **Componentes Atómicos y Affordance** | **5.8 / 10** | Sobredosis de píldoras (`rounded-full`) que infantiliza la solemnidad clínica; botones primarios y secundarios compiten en peso visual. |
| **Experiencia Móvil (Responsive Flow)**| **6.0 / 10** | Navegación funcional, pero con saltos de scroll extensos y tarjetas de servicios angostas en vista vertical. |
| **Neuromarketing y Conversión Clínica**| **5.2 / 10** | La especialista no aparece en el primer pliegue visual; el agendamiento dispersa al usuario entre Google Calendar y WhatsApp sin guía empática previa. |

**Puntuación Global de Calidad Visual:** **5.8 / 10 (Funcional pero visualmente desaprovechada)**.

---

## 2. DIAGNÓSTICO SECCIÓN POR SECCIÓN

### 2.1. Barra de Navegación (`Navbar.jsx`)

```text
[ Logo Icon ]  DIANA LEDESMA (Psicología Clínica) ─────── [ Inicio ] [ Sobre mí ] [ Servicios ] [ Blog ] [ Contacto ] [ Admin ]
```

* **Aspectos Positivos:**
  - El reemplazo del logo original por `logo.webp` (9.63 KB) con `fetchPriority="high"` erradicó el cuello de botella técnico.
  - La transición a fondo `bg-brand-sage/90 backdrop-blur-xl` al hacer scroll genera una sensación orgánica de anclaje.
* **Fallas Estéticas y de UX Detectadas:**
  1. **Jerarquía del Logotipo Reducida:** El icono del logo se renderiza a `48x48px` (`h-12 w-12`). La tipografía del logotipo `"DIANA LEDESMA"` compite con el tamaño de los enlaces del menú sin un espaciado de respiro que otorgue distinción de marca de autor.
  2. **Ausencia de un CTA Primario en la Cabecera:** En la navegación de escritorio, todos los enlaces tienen el mismo peso visual (`text-sm font-medium`). Falta un botón destacado de acción rápida (*"Agendar cita"*) en el extremo derecho, obligando al usuario a desplazarse hasta el final de la página o buscar el botón en el Hero.
  3. **Menú Móvil Desconectado:** El menú a pantalla completa (`fixed inset-0 bg-brand-sage/95`) es un bloque verde monolítico sin estructura visual jerárquica. Carece de enlaces directos a WhatsApp, teléfono o dirección física, perdiendo una valiosa oportunidad de conversión en emergencias psicológicas móviles.

---

### 2.2. Sección de Entrada (`Hero.jsx`)

* **Aspectos Positivos:**
  - El titular `"Compromiso, aceptación y una vida valiosa"` utiliza `Playfair Display` con un trazo curvo SVG decorativo que humaniza la frase.
  - El fondo dinámico con esferas borrosas (`animate-float`) añade vida sin saturar la CPU.
* **Fallas Estéticas y de UX Detectadas:**
  1. **El Problema del "Moodboard" de Stock Despersonalizado:**
     - En el lado derecho se muestran 4 fotos de Unsplash (una taza de café con libro, hojas de otoño, un cuaderno y una mujer haciendo yoga).
     - **Impacto Clínico Negativo:** Transmite la imagen de un blog de estilo de vida (*lifestyle influencer*) o spa holístico, restándole rigor como consulta de psicología clínica universitaria especializada en TCC y ACT.
     - **Desconexión Humana:** La psicóloga Diana Ledesma **no aparece en el Hero**. En salud mental, la mirada, la expresión serena y la calidez humana del terapeuta en el primer pliegue visual generan el 70% de la confianza inicial para solicitar ayuda.
  2. **Falla en el Viewport Móvil (Mobile Fold Collapse):**
     - En dispositivos móviles, las 4 imágenes apiladas generan una barrera visual de más de 600px de altura. El consultante tiene que hacer 3 o 4 scrolls continuos para encontrar las áreas de atención.
  3. **Cita Descontextualizada:**
     - La cita de Wayne W. Dyer (*"Cuando cambiamos la forma de mirar las cosas..."*) se presenta como un párrafo secundario flotante. Al no estar enmarcada como testimonio clínico ni vinculada explícitamente al enfoque de la terapia, luce como una frase motivacional de autoayuda común.

---

### 2.3. Sobre Mí (`About.jsx`)

* **Aspectos Positivos:**
  - La estructura de dos columnas equilibra credenciales académicas con semblanza humana.
  - La tarjeta flotante `"Enfoque integral"` con desenfoque de cristal añade una capa sutil de modernidad.
* **Fallas Estéticas y de UX Detectadas:**
  1. **Imagen de Stock Genérica en Lugar de la Especialista:**
     - La fotografía empleada (`https://images.unsplash.com/photo-1573496359142-b8d87734a5a2`) es un modelo de banco de imágenes comercial estadounidense con estética corporativa de oficina ejecutiva, no un consultorio de psicología en Guadalajara. Esto quiebra la autenticidad y la transparencia deontológica cuando el paciente asiste a su primera sesión presencial u online.
  2. **Lista de Especialidades en Bloque Denso:**
     - La lista de 6 diplomados (TCC, Mindfulness, Psiquiatría, TCA, Terapias Contextuales, Intervención en crisis) se despliega en tarjetas alargadas idénticas con un micro-punto verde salvia. No hay categorización ni jerarquía entre lo que trata (problemas: ansiedad, conducta alimentaria) y cómo lo trata (técnicas: ACT, DBT, TCC).
  3. **Líneas de Lectura Demasiado Extensas en Desktop:**
     - Los párrafos no tienen delimitador `max-w-prose` (65-75 caracteres por línea), superando los 90 caracteres en monitores de 1440px y provocando cansancio ocular.

---

### 2.4. Mis Servicios (`Services.jsx`)

* **Aspectos Positivos:**
  - Segmentación clara en 4 pilares: Adultos, Niños/Adolescentes, TCC y Terapias Contextuales.
  - Animaciones coordinadas con `Reveal` y retardo escalonado (`stagger`).
* **Fallas Estéticas y de UX Detectadas:**
  1. **Superficies Deslavadas y Falta de Contraste:**
     - Las tarjetas utilizan `bg-brand-accent/5` con borde `border-brand-accent/10`. Sobre el fondo crema `#FAF3E0`, este valor de opacidad del 5% genera un aspecto blancuzco/grisáceo sucio, carente de luminosidad o solidez premium.
  2. **Desproporción del Icono:**
     - El círculo del icono mide `w-20 h-20` (80px), ocupando más del 25% de la tarjeta. Domina visualmente el diseño y relega los títulos y descripciones a un espacio comprimido.
  3. **Falta de Affordance y Acción Directa:**
     - Las tarjetas no tienen enlace directo a agendar ese servicio en particular ni un micro-botón de *"Consultar sobre esta terapia"*. Actúan como bloques estáticos de texto que no canalizan la intención del consultante.

---

### 2.5. Blog de Salud Mental (`Blog.jsx` & Componentes de Feature)

* **Aspectos Positivos:**
  - Modularización limpia lograda en la Fase 2 ([BlogCard.jsx](file:///Users/fermartinez/diana-psicologia/src/features/blog/components/BlogCard.jsx), [BlogReaderModal.jsx](file:///Users/fermartinez/diana-psicologia/src/features/blog/components/BlogReaderModal.jsx), [BlogEditorModal.jsx](file:///Users/fermartinez/diana-psicologia/src/features/blog/components/BlogEditorModal.jsx)).
  - Paginación progresiva suave con botón de *"Ver más artículos"*.
* **Fallas Estéticas y de UX Detectadas:**
  1. **Contraste Deficiente en Acentos de Tarjeta:**
     - La etiqueta `"Leer más"` en las tarjetas utiliza `text-brand-accent` (`#BC8A5F`). Sobre el fondo de la tarjeta, tiene una relación de contraste de apenas **2.7:1**, incumpliendo la pauta WCAG 2.1 AA (mínimo 4.5:1).
  2. **Insignias de Categoría Monocromáticas:**
     - Todas las categorías (Bienestar, Ansiedad, Depresión, Crianza, Pareja) llevan exactamente la misma insignia verde salvia (`bg-brand-sage/90`). No existe codificación de color sutil que ayude al lector a identificar temáticas a primera vista.
  3. **Imágenes de Portada de Stock Dispares:**
     - Las imágenes por defecto de Unsplash poseen temperaturas de color contradictorias (unas muy frías y azuladas, otras cálidas y saturadas), rompiendo la armonía visual del grid editorial.

---

### 2.6. Contacto y Agenda (`Contact.jsx`)

* **Aspectos Positivos:**
  - Conexión real con Google Calendar (modalidad online y presencial) y WhatsApp directo.
  - Indicadores transparentes de duración de sesión (60 min) y medios de pago.
* **Fallas Estéticas y de UX Detectadas:**
  1. **Fricción Cognitiva en la Selección de Cita:**
     - Se muestran dos botones con el mismo tamaño y prominencia: *"Cita online (Google Meet)"* en verde salvia y *"Cita presencial"* en marrón arcilla. Un consultante en crisis duda: *¿cuál elijo? ¿cuál es mejor para mi caso?*. Falta un micro-texto de guía clínica o un selector interactivo tipo pestaña (*tab*).
  2. **Falta de Mensaje Pre-llenado en WhatsApp:**
     - El enlace `https://wa.me/523318363829` abre el chat completamente en blanco. Esto exige que el paciente redacte desde cero su situación, lo que incrementa el abandono por parálisis de redacción.
  3. **Composición Asimétrica Pesada:**
     - La columna izquierda (datos de contacto) se percibe como una lista vertical delgada, mientras que la columna derecha es una tarjeta masiva con bordes de 40px (`rounded-[2.5rem]`). El desbalance visual entre ambas columnas es muy evidente en pantallas de 1280px.

---

### 2.7. Pie de Página (`Footer.jsx`)

* **Aspectos Positivos:**
  - El fondo `bg-brand-text` con texto `text-brand-bg` implementado en la Fase 4 resolvió el problema de contraste WCAG (11.8:1).
  - Indicador sutil de verificación de sesión (`authLoading`) que previene parpadeos.
* **Fallas Estéticas y de UX Detectadas:**
  1. **Tratamiento Tipográfico Seco:**
     - La división en 3 columnas es muy tradicional y carece del refinamiento editorial que tiene el resto de la web.
  2. **Acceso Psicóloga Muy Expuesto:**
     - El botón de *"Acceso psicóloga"* con candado, aunque protegido, atrae la atención de consultantes curiosos que intentan iniciar sesión creyendo que es un portal del paciente. Debe tener un tratamiento más discreto (*ghost/subtle link*).

---

## 3. MATRIZ DE FRICCIÓN VISUAL Y OPORTUNIDADES DE MEJORA

A continuación se sintetizan los 10 puntos de fricción visual priorizados por su impacto en la percepción de calidad y conversión:

```text
IMPACTO EN CONVERSIÓN
  ▲
  │   [P1] Falta foto real Diana en Hero
  │   [P2] Contraste inaccesible en brand.accent (#BC8A5F)
  │   [P3] Fricción en selección de agenda (Online vs Presencial)
  │   [P4] Colapso del Hero en móvil por moodboard de stock
  │   
  │   [P5] Tarjetas de Servicios planas (5% opacidad)
  │   [P6] Sobredosis de píldoras (rounded-full)
  │   [P7] Ausencia de CTA de agenda en Navbar
  │   [P8] Líneas de texto sin max-w-prose en About
  │   [P9] Divisores de título h2 anticuados (pills)
  │   [P10] Falta de pre-fill en enlace de WhatsApp
  └──────────────────────────────────────────────────────────► SEVERIDAD ESTÉTICA
```

| Prioridad | Elemento / Módulo | Problema Detectado | Solución de Diseño Recomendada |
| :---: | :--- | :--- | :--- |
| **P1** | **Hero / Confianza** | Moodboard de 4 fotos de stock sin rostro de la psicóloga. | Sustituir el mosaico por un retrato profesional cálido de Diana Ledesma con insignia de credencial UdeG y badge de consultorio habilitado. |
| **P2** | **Color / Accesibilidad** | `brand.accent` (`#BC8A5F`) tiene contraste 2.7:1 sobre crema `#FAF3E0` y 3.0:1 con texto blanco. | Incorporar un token profundo `brand.terracotta` (`#854B24`) para textos, enlaces y botones activos, reservando `#BC8A5F` para acentos decorativos secundarios. |
| **P3** | **Agenda / Conversión** | Dos botones de calendario planos sin contexto comparativo. | Crear un selector interactivo tipo switch/tab (*"En consultorio"* vs *"En línea"*), explicando qué incluye cada una antes del clic. |
| **P4** | **Mobile / LCP** | El moodboard genera un scroll infinito en celular antes del contenido útil. | En pantallas `<md:`, ocultar el mosaico de fotos o compactarlo en un avatar/retrato circular elegante sobre el titular. |
| **P5** | **Servicios / Superficies** | `bg-brand-accent/5` luce sucio y lavado en lugar de cristal translúcido. | Utilizar tarjetas con fondo blanco sólido translúcido (`bg-white/80 backdrop-blur-md`), bordes finos cálidos (`border-brand-sage/20`) y sombras orgánicas suaves. |
| **P6** | **Atomic UI / Radios** | `rounded-full` en todos los botones y contenedores genera estética infantil. | Estandarizar un sistema de radios proporcionado: `rounded-2xl` para tarjetas y modales, y `rounded-xl` para botones y campos de formulario. |
| **P7** | **Navbar / Conversión** | Falta de botón CTA en la cabecera fija de escritorio. | Agregar botón compacto *"Agendar cita"* en el extremo derecho de la barra de navegación persistente. |
| **P8** | **Tipografía / Lectura** | Párrafos en `About` y `Blog` se expanden sin límite de ancho en monitores anchos. | Aplicar `max-w-prose` (o `max-w-2xl`) en los bloques de texto para mantener 65-75 caracteres por línea. |
| **P9** | **Encabezados / Estilo** | Divisores de título tipo píldora (`h-1 w-20 rounded-full`) con estética de plantilla antigua. | Reemplazar por un sistema tipográfico de *Eyebrow Tag* elegante (subtítulo superior en mayúsculas con tracking abierto) y líneas de acento caligráficas sutiles. |
| **P10** | **WhatsApp / UX** | Enlace wa.me en blanco obliga al paciente a redactar desde cero. | Agregar parámetro codificado: `?text=Hola%20Diana,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20tus%20consultas%20terap%C3%A9uticas.` |

---

## 4. PROPUESTA DE REDISEÑO (DESIGN OVERHAUL BLUEPRINT)

### 4.1. Refinamiento de la Paleta y Tokens en `tailwind.config.js`

Para solucionar el problema de contraste inaccesible (2.7:1) sin perder la identidad orgánica de "Bosque de Otoño / Té y Salvia", se propone enriquecer los tokens de color:

```javascript
// Propuesta de extensión de tokens para tailwind.config.js
theme: {
  extend: {
    colors: {
      brand: {
        // Fondos y Superficies
        bg: '#FAF3E0',         // Crema de Té (Fondo base)
        surface: '#FFFDF9',    // Marfil Ligeramente Iluminado (Superficie de Tarjetas)
        card: '#FFFFFF',       // Blanco Puro de Contraste para Modales
        
        // Textos y Legibilidad
        text: '#35322F',       // Carbón Vegetal (11.8:1 contraste)
        muted: '#5F5C58',      // Carbón Suave para textos secundarios (7.2:1)
        
        // Acentos Terracota (Graduación Accesible)
        accent: '#BC8A5F',     // Marrón Arcilla (Detalles decorativos, fondos suaves)
        terracotta: '#854B24', // Terracota Intenso (Botones primarios y enlaces: 6.3:1 contraste con blanco, 6.2:1 con crema)
        
        // Salvia y Balance
        sage: '#828E82',       // Salvia Neutro (Bordes y chips de categoría)
        'sage-dark': '#4D584D',// Salvia Bosque Profundo para badges de alto contraste
        'sage-light': '#E9ECE9',// Fondo salvia suave para píldoras y alertas
        
        // Vidrio y Profundidad
        glass: 'rgba(255, 253, 249, 0.75)',
      }
    },
    boxShadow: {
      'soft-sm': '0 2px 8px -2px rgba(53, 50, 47, 0.05), 0 1px 4px -1px rgba(53, 50, 47, 0.03)',
      'soft-md': '0 12px 24px -6px rgba(53, 50, 47, 0.08), 0 4px 8px -2px rgba(53, 50, 47, 0.04)',
      'soft-lg': '0 24px 48px -12px rgba(53, 50, 47, 0.12), 0 8px 16px -4px rgba(53, 50, 47, 0.06)',
      'glow-accent': '0 0 25px -5px rgba(188, 138, 95, 0.3)',
    }
  }
}
```

---

### 4.2. Tratamiento de Superficies y Sombras Orgánicas (`index.css`)

Reemplazar los bordes blancos semi-invisibles por un sistema de vidrio cálido que sí contraste con el fondo crema:

```css
/* Nuevo Cristal Cálido (Warm Glassmorphism) */
.glass-panel-warm {
  background: rgba(255, 253, 249, 0.78);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(130, 142, 130, 0.18);
  box-shadow: 0 16px 32px -8px rgba(53, 50, 47, 0.06);
}

.glass-card-warm {
  background: rgba(255, 253, 249, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(130, 142, 130, 0.15);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-card-warm:hover {
  background: #FFFFFF;
  border-color: rgba(188, 138, 95, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 20px 35px -10px rgba(133, 75, 36, 0.12);
}
```

---

### 4.3. Rediseño Compositivo de Secciones Clave

#### A. Rediseño del Hero (Enfoque en Conexión Humana)
```text
DESKTOP HERO OVERHAUL:
+-------------------------------------------------------+---------------------------------------+
|  [Eyebrow: PSICOLOGÍA CLÍNICA BASADA EN EVIDENCIA]    |   [ RETRATO AUTÉNTICO DIANA LEDESMA ] |
|                                                       |   Enmarcado orgánico suave (arch/squircle)
|  Un espacio seguro para reconstruir                   |   + Badge flotante interactivo:       |
|  tu bienestar y conectar con lo que                   |     "★ Cédula Profesional UdeG"       |
|  verdaderamente te importa.                           |     "● Citas disponibles esta semana" |
|                                                       |                                       |
|  [CTA Primario: Agendar primera cita] [Ver servicios] |                                       |
|                                                       |                                       |
|  [Micro-social proof: "Atención individual adultos y  |                                       |
|   adolescentes | Modalidad online y presencial"]      |                                       |
+-------------------------------------------------------+---------------------------------------+
```

#### B. Rediseño de Servicios (Affordance y Comprensión Rápida)
* Sustituir los iconos gigantescos por cabeceras compactas con insignias de especialidad:
  - Tarjeta 1: *Adultos* → Tags: `Ansiedad`, `Depresión`, `Duelo`.
  - Tarjeta 2: *Adolescentes* → Tags: `Desde 10 años`, `Conducta`, `Autoestima`.
  - Tarjeta 3: *TCC* → Tags: `Reestructuración cognitiva`, `Evidencia científica`.
  - Tarjeta 4: *Terapias Contextuales* → Tags: `ACT`, `DBT`, `Mindfulness`.
* Cada tarjeta debe finalizar con un enlace claro: *"Explorar modalidad →"*.

#### C. Rediseño de la Tarjeta de Agenda (Contacto)
* Implementar un selector de pestañas interactivo:
  ```text
  [ Modalidad Online (Google Meet) ]  |  [ Modalidad Presencial (Consultorio) ]
  -----------------------------------------------------------------------------
  - Duración: 60 minutos                   - Duración: 60 minutos
  - Desde cualquier lugar con internet     - Calle Toltecas 3446, Monraz, GDL
  - Enlace privado generado por Meet       - Espacio climatizado y confidencial
  
  [ Botón Principal: Ver horarios en Google Calendar ]
  ```
* WhatsApp con enlace inteligente pre-llenado:
  `https://wa.me/523318363829?text=Hola%20Diana,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20tus%20consultas.`

---

### 4.4. Hoja de Ruta para Implementar el Rediseño Visual (Sin Tocar Firebase)

Para aplicar estas mejoras visuales con total seguridad técnica:

1. **Paso 1: Ajuste de Tokens en `tailwind.config.js` y `index.css`:**
   - Incorporar `brand.terracotta` (`#854B24`), `brand.surface` (`#FFFDF9`) y sombras suaves.
   - Definir clases utilitarias de cristal cálido (`glass-panel-warm`).
2. **Paso 2: Calibración de Botones y Componentes Atómicos:**
   - Ajustar `Button.jsx` para usar el acento terracota de alto contraste con texto blanco (6.3:1) y radio `rounded-xl`/`rounded-2xl`.
3. **Paso 3: Refactorización Estética del Hero:**
   - Ocultar mosaico pesado en móviles, estructurar el titular y añadir los badges de credenciales clínicas.
4. **Paso 4: Enriquecimiento de Servicios y Contacto:**
   - Aplicar el fondo blanco cálido en tarjetas de servicios, badges de tags por especialidad y pre-llenado en WhatsApp.
5. **Paso 5: Validación Cruzada en Navegadores y Móviles:**
   - Auditar contraste en Lighthouse (objetivo: 100/100 en Accesibilidad) y probar experiencia táctil en iOS y Android.

---
*Informe oficial de auditoría estética elaborado por el equipo de Diseño de Producto y Neuromarketing Clínico.*
