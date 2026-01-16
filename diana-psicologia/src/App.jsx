import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Calendar, Phone, MapPin, Instagram, 
  Brain, Heart, BookOpen, User, Lock, 
  LogOut, Plus, Trash2, Edit2, CheckCircle, ArrowRight
} from 'lucide-react';

// IMPORTANTE: Importamos la configuración desde tu archivo local firebase.js
import { auth, db } from './firebase'; 

import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  updateDoc
} from "firebase/firestore";

// --- SEGURIDAD: LISTA VIP ---
// ¡OJO! Aquí pon tu correo y el de Diana. Solo estos correos verán los botones de editar.
const adminEmails = [
  "carlos.mtzvelez@gmail.com", // Pon aquí tu correo real para probar
 // El correo de Diana
];

// --- ESTILOS GLOBALES & UTILIDADES ---

const colors = {
  bg: "bg-stone-50",
  primary: "text-stone-800",
  accent: "text-indigo-600",
  accentBg: "bg-indigo-600",
  secondaryBg: "bg-sky-100",
};

// Función para scroll suave
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`py-20 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

const Button = ({ children, onClick, variant = "primary", className = "", type="button" }) => {
  const baseStyle = "px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-md flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-stone-800 text-white hover:bg-stone-700",
    secondary: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
    outline: "border-2 border-stone-800 text-stone-800 hover:bg-stone-50",
    whatsapp: "bg-green-600 text-white hover:bg-green-700"
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// --- MODAL DE PRIVACIDAD ---
const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop (Fondo oscuro) */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Contenido del Modal */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto relative z-10 animate-fade-in-up">
        <div className="sticky top-0 bg-white border-b border-stone-100 p-4 flex justify-between items-center">
          <h3 className="text-xl font-serif font-bold text-stone-800">Aviso de Privacidad</h3>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full text-stone-500">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 prose prose-stone text-stone-600">
          <p className="text-sm text-stone-400 mb-4">Última actualización: Enero 2026</p>
          <p>
            <strong>Diana Ledesma</strong>, con domicilio en Guadalajara, Jalisco, es la responsable del uso y protección de sus datos personales, y al respecto le informa lo siguiente:
          </p>
          
          <h4 className="font-bold text-stone-800 mt-4">¿Para qué fines utilizaremos sus datos personales?</h4>
          <p>
            Los datos personales que recabamos de usted (Nombre, Teléfono, Correo Electrónico) los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Agendar y confirmar sus citas terapéuticas.</li>
            <li>Contactarlo en caso de cambios de horario o emergencias.</li>
            <li>Facturación (en caso de requerirla).</li>
          </ul>

          <h4 className="font-bold text-stone-800 mt-6">¿Dónde puedo consultar el aviso de privacidad integral?</h4>
          <p>
            Para conocer mayor información sobre los términos y condiciones en que serán tratados sus datos personales, y la forma en que podrá ejercer sus derechos ARCO, puede solicitar el aviso de privacidad integral enviando un correo a contacto@dianaledesma.com.
          </p>
        </div>
        
        <div className="p-6 border-t border-stone-100 bg-stone-50 text-right">
          <Button onClick={onClose} variant="primary">Entendido</Button>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTES DE PÁGINA ---

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { name: 'Inicio', id: 'home' },
    { name: 'Sobre Mí', id: 'about' },
    { name: 'Servicios', id: 'services' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contacto', id: 'contact' },
  ];

  const handleNavClick = (id) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <Brain className={`h-8 w-8 ${scrolled ? 'text-indigo-600' : 'text-indigo-700'}`} />
            <div>
              <h1 className={`text-xl font-serif font-bold tracking-wide ${scrolled ? 'text-stone-800' : 'text-stone-900'}`}>DIANA LEDESMA</h1>
              <p className={`text-[10px] tracking-wider uppercase ${scrolled ? 'text-stone-500' : 'text-stone-600'}`}>Psicología Clínica</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium hover:text-indigo-600 transition-colors ${scrolled ? 'text-stone-600' : 'text-stone-800'}`}
              >
                {link.name}
              </button>
            ))}
            {user && (
               <span className="flex items-center text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full border border-green-200">
                 Admin Activo
               </span>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-800">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="block w-full text-left px-3 py-4 text-lg font-medium text-stone-600 hover:bg-stone-50 hover:text-indigo-600 border-b border-stone-50"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <div id="home" className="relative overflow-hidden bg-stone-50 min-h-screen flex items-center pt-20">
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-100 opacity-50 blur-3xl"></div>
    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-sky-100 opacity-50 blur-3xl"></div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold tracking-wide mb-2">
            Psicología Cognitivo Conductual y Contextual
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-800 leading-tight">
            Compromiso, aceptación y una <span className="text-indigo-600">vida valiosa</span>.
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-lg">
            "Cuando cambiamos la forma de mirar las cosas, las cosas que miramos cambian."
            <br/> <span className="text-sm italic text-stone-500">— Wayne W. Dyer</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => scrollToSection('contact')}>
              Agendar Cita <Calendar size={18} />
            </Button>
            <Button variant="outline" onClick={() => scrollToSection('services')}>
              Conocer Terapia <ArrowRight size={18} />
            </Button>
          </div>
        </div>
        
        {/* Placeholder para Foto Principal */}
        <div className="relative mt-8 md:mt-0">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-stone-200 relative group max-w-md mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Psicóloga Diana Ledesma" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent"></div>
          </div>
          {/* Decorative Card */}
          <div className="absolute -bottom-6 -right-4 md:-left-6 md:right-auto bg-white p-6 rounded-xl shadow-lg max-w-xs hidden md:block border border-stone-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-full text-green-600">
                <CheckCircle size={20} />
              </div>
              <span className="font-bold text-stone-800">Enfoque Integral</span>
            </div>
            <p className="text-sm text-stone-600">Herramientas prácticas para construir bienestar real.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const About = () => (
  <Section id="about" className="bg-white">
    <div className="text-center mb-16 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">Sobre Mí</h2>
      <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full mb-6"></div>
      <p className="text-stone-600 text-lg">
        Mi propósito es acompañarte en un proceso terapéutico personalizado, brindándote herramientas para construir un bienestar psicológico integral.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-center">
       <div className="order-2 md:order-1 space-y-6">
          <h3 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
            <User className="text-indigo-600" /> Diana Ledesma
          </h3>
          <div className="space-y-4 text-stone-700 leading-relaxed">
            <p>
              Soy <strong>Licenciada en Psicología</strong> por la Universidad de Guadalajara, con intercambio académico en la Universidad de Murcia, España.
            </p>
            <p>
              Mi formación académica es continua y apasionada. Cuento con diplomados y cursos especializados en:
            </p>
            <ul className="grid gap-3 mt-4">
              {[
                "Terapia Cognitivo Conductual (TCC)",
                "Terapia Cognitiva basada en Mindfulness",
                "Psiquiatría y Salud Mental",
                "Trastornos de la Conducta Alimentaria (TCA)",
                "Terapias Contextuales (DBT y ACT)",
                "Intervención en crisis y prevención del suicidio"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-stone-50 p-3 rounded-lg border border-stone-100">
                  <div className="mt-1 h-2 w-2 bg-indigo-400 rounded-full flex-shrink-0"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
       </div>
       <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
         <div className="space-y-4">
            <div className="bg-stone-100 h-48 rounded-2xl overflow-hidden">
               <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400" alt="Consultorio detalle" className="w-full h-full object-cover"/>
            </div>
            <div className="bg-indigo-100 h-64 rounded-2xl overflow-hidden">
               <img src="https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&fit=crop&q=80&w=400" alt="Atmósfera de calma" className="w-full h-full object-cover"/>
            </div>
         </div>
         <div className="space-y-4 pt-8">
            <div className="bg-sky-100 h-64 rounded-2xl overflow-hidden">
               <img src="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?auto=format&fit=crop&q=80&w=400" alt="Espacio de escucha" className="w-full h-full object-cover"/>
            </div>
            <div className="bg-stone-100 h-48 rounded-2xl overflow-hidden">
               <img src="https://images.unsplash.com/photo-1499209974431-2761e25234d5?auto=format&fit=crop&q=80&w=400" alt="Bienestar" className="w-full h-full object-cover"/>
            </div>
         </div>
       </div>
    </div>
  </Section>
);

const Services = () => {
  const services = [
    {
      title: "Terapia Individual Adultos",
      desc: "Espacio seguro para abordar ansiedad, depresión, duelo o crecimiento personal.",
      icon: <User className="w-8 h-8 text-indigo-600" />,
      color: "bg-indigo-50"
    },
    {
      title: "Niños y Adolescentes",
      desc: "Atención especializada a partir de los 10 años. Manejo emocional y conductual.",
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      color: "bg-rose-50"
    },
    {
      title: "Enfoque Cognitivo Conductual",
      desc: "Trabajamos en identificar y cambiar patrones de pensamiento que afectan tu bienestar.",
      icon: <Brain className="w-8 h-8 text-sky-600" />,
      color: "bg-sky-50"
    },
    {
      title: "Terapias Contextuales",
      desc: "DBT y ACT. Enfocadas en la aceptación, mindfulness y valores de vida.",
      icon: <BookOpen className="w-8 h-8 text-teal-600" />,
      color: "bg-teal-50"
    }
  ];

  return (
    <div className="bg-stone-50">
      <Section id="services">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">Mis Servicios</h2>
          <div className="h-1 w-20 bg-sky-400 mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-stone-600">
            Un enfoque profesional y cálido, adaptado a tus necesidades específicas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 hover:-translate-y-2">
              <div className={`w-16 h-16 rounded-2xl ${s.color} flex items-center justify-center mb-6`}>
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-3">{s.title}</h3>
              <p className="text-stone-600 leading-relaxed text-sm">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

const Blog = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState({ title: '', content: '', category: 'Bienestar' });
  const [error, setError] = useState('');

  useEffect(() => {
    // --- CAMBIO PARA PRODUCCIÓN: Ruta simplificada ---
    const q = query(
      collection(db, 'blog_posts'), 
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSavePost = async (e) => {
    e.preventDefault();
    if (!user) return;
    setError('');

    try {
      const postData = {
        title: currentPost.title,
        content: currentPost.content,
        category: currentPost.category,
        author: "Diana Ledesma",
        authorId: user.uid,
        createdAt: serverTimestamp(),
      };

      if (currentPost.id) {
        // --- CAMBIO PARA PRODUCCIÓN: Ruta simplificada ---
        const docRef = doc(db, 'blog_posts', currentPost.id);
        await updateDoc(docRef, { 
          title: currentPost.title, 
          content: currentPost.content,
          category: currentPost.category 
        });
      } else {
        // --- CAMBIO PARA PRODUCCIÓN: Ruta simplificada ---
        await addDoc(collection(db, 'blog_posts'), postData);
      }
      setIsEditing(false);
      setCurrentPost({ title: '', content: '', category: 'Bienestar' });
    } catch (err) {
      console.error(err);
      setError('Error al guardar. Intenta de nuevo.');
    }
  };

  const handleDelete = async (id) => {
    if(!confirm("¿Seguro que quieres borrar este artículo?")) return;
    try {
      // --- CAMBIO PARA PRODUCCIÓN: Ruta simplificada ---
      await deleteDoc(doc(db, 'blog_posts', id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Section id="blog" className="bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <div className="text-center md:text-left">
           <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800">Blog de Salud Mental</h2>
           <div className="h-1 w-20 bg-indigo-500 mt-4 rounded-full mx-auto md:mx-0"></div>
        </div>
        {user && !isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Plus size={18} /> Nuevo Artículo
          </Button>
        )}
      </div>

      {isEditing && user && (
        <div className="bg-stone-50 p-8 rounded-2xl shadow-xl border border-indigo-100 mb-12 animate-fade-in">
          <h3 className="text-xl font-bold mb-6 text-stone-800">Editor de Artículos</h3>
          <form onSubmit={handleSavePost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Título</label>
              <input 
                type="text" 
                required
                value={currentPost.title}
                onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Ej: ¿Qué es la ansiedad?"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Categoría</label>
                  <select 
                    value={currentPost.category}
                    onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})}
                    className="w-full p-3 border border-stone-200 rounded-lg"
                  >
                    <option>Bienestar</option>
                    <option>Ansiedad</option>
                    <option>Depresión</option>
                    <option>Crianza</option>
                    <option>Pareja</option>
                  </select>
               </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Contenido</label>
              <textarea 
                required
                rows={8}
                value={currentPost.content}
                onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Escribe aquí tu artículo..."
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-4 justify-end pt-4">
              <Button variant="outline" onClick={() => { setIsEditing(false); setCurrentPost({ title: '', content: '', category: 'Bienestar' }); }}>
                Cancelar
              </Button>
              <Button type="submit">
                Publicar Artículo
              </Button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-stone-400">Cargando pensamientos...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-stone-50 rounded-2xl border-dashed border-2 border-stone-200">
           <p className="text-stone-500">Aún no hay artículos publicados.</p>
           {user && <p className="text-indigo-600 mt-2 text-sm">¡Sé la primera en escribir!</p>}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-stone-100 flex flex-col h-full group">
              <div className="h-48 bg-indigo-50 flex items-center justify-center overflow-hidden">
                 <span className="text-indigo-200 text-6xl opacity-50 group-hover:scale-110 transition-transform duration-500">
                   {post.category === 'Ansiedad' ? <Brain size={64}/> : post.category === 'Pareja' ? <Heart size={64}/> : <BookOpen size={64}/>}
                 </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-3">
                   <span className="text-xs font-bold tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase">
                     {post.category}
                   </span>
                   {user && (
                     <div className="flex gap-2">
                       <button onClick={() => { setCurrentPost(post); setIsEditing(true); }} className="text-stone-400 hover:text-indigo-600"><Edit2 size={16}/></button>
                       <button onClick={() => handleDelete(post.id)} className="text-stone-400 hover:text-red-500"><Trash2 size={16}/></button>
                     </div>
                   )}
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-3">{post.title}</h3>
                <p className="text-stone-600 text-sm line-clamp-3 mb-4 flex-1">
                  {post.content}
                </p>
                <div className="pt-4 border-t border-stone-100 flex justify-between items-center text-xs text-stone-400">
                   <span>Por {post.author}</span>
                   <span>Lectura breve</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
};

const Contact = () => (
  <div className="bg-gradient-to-br from-stone-50 to-indigo-50/30">
    <Section id="contact">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-6">Contacto y Agenda</h2>
          <p className="text-stone-600 text-lg mb-8">
            Dar el primer paso es lo más importante. Estoy aquí para resolver tus dudas y acompañarte en el proceso.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm text-indigo-600">
                <MapPin />
              </div>
              <div>
                <h4 className="font-bold text-stone-800">Consultorio</h4>
                <p className="text-stone-600">Colonia Providencia / Zona Centro<br/>Guadalajara, Jalisco.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm text-green-600">
                <Phone />
              </div>
              <div>
                <h4 className="font-bold text-stone-800">WhatsApp</h4>
                <p className="text-stone-600 mb-2">33 1836 3829</p>
                <a href="https://wa.me/523318363829" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-green-700 hover:underline">
                  Enviar mensaje directo →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm text-pink-600">
                <Instagram />
              </div>
              <div>
                <h4 className="font-bold text-stone-800">Instagram</h4>
                <p className="text-stone-600 mb-2">@dianaledesma.psic</p>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-pink-700 hover:underline">
                  Ver contenido y tips →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Calendario */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-stone-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <h3 className="text-2xl font-bold text-stone-800 mb-6">Agenda tu Sesión</h3>
          
          <div className="bg-indigo-50 rounded-xl p-6 text-center mb-8">
            <Calendar className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
            <p className="text-stone-700 font-medium mb-4">
              Consulta disponibilidad en tiempo real a través de Google Calendar.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200">
               Ver Horarios Disponibles
            </Button>
            <p className="text-xs text-stone-500 mt-3">
              Serás redirigido al sistema seguro de citas.
            </p>
          </div>

          <div className="border-t border-stone-100 pt-6">
            <h4 className="font-bold text-stone-800 mb-2">Dudas rápidas</h4>
             <ul className="text-sm text-stone-600 space-y-2">
               <li>• Duración de sesión: 50 minutos.</li>
               <li>• Modalidad: Presencial y Online (Zoom).</li>
               <li>• Pago: Efectivo o Transferencia.</li>
             </ul>
          </div>
        </div>
      </div>
    </Section>
  </div>
);

const Footer = ({ onOpenPrivacy, handleLogin, user, handleLogout }) => (
  <footer className="bg-stone-900 text-stone-400 py-12">
    <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-8 text-sm">
      
      <div>
        <h3 className="text-white font-serif font-bold text-lg mb-4">Diana Ledesma</h3>
        <p className="mb-4">Psicología Clínica Cognitivo Conductual y Contextual.</p>
        <p>"Construyendo bienestar integral."</p>
      </div>

      <div>
        <h4 className="text-white font-bold mb-4">Navegación</h4>
        <ul className="space-y-2">
          <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition">Inicio</button></li>
          <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition">Servicios</button></li>
          <li><button onClick={() => scrollToSection('blog')} className="hover:text-white transition">Blog</button></li>
          <li><button onClick={onOpenPrivacy} className="hover:text-white transition">Aviso de Privacidad</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-4">Administración</h4>
        {user ? (
          <div>
            <p className="mb-2">Hola, {user.displayName || 'Admin'}</p>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 flex items-center gap-2">
              <LogOut size={14}/> Cerrar Sesión
            </button>
          </div>
        ) : (
          <button onClick={handleLogin} className="flex items-center gap-2 hover:text-white transition">
            <Lock size={14} /> Acceso Psicóloga
          </button>
        )}
        <p className="mt-8 text-xs opacity-50">
          © {new Date().getFullYear()} Diana Ledesma. Todos los derechos reservados.
        </p>
      </div>

    </div>
  </footer>
);

// --- COMPONENTE PRINCIPAL (APP) ---

const App = () => {
  const [user, setUser] = useState(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    // --- CAMBIO PARA PRODUCCIÓN: Autenticación limpia ---
    // Ya no usamos signInAnonymously ni tokens temporales
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

  const handleLogout = () => signOut(auth);

  return (
    <div className={`min-h-screen ${colors.bg} font-sans text-stone-800 selection:bg-indigo-100`}>
      <Navbar user={user} />
      
      <main className="animate-fade-in">
        {/* Todas las secciones en una sola página */}
        <Hero />
        <About />
        <Services />
        <Blog user={user} />
        <Contact />
      </main>

      <Footer 
        onOpenPrivacy={() => setIsPrivacyOpen(true)} 
        handleLogin={handleGoogleLogin} 
        user={user} 
        handleLogout={handleLogout}
      />

      {/* Modal de Privacidad */}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
};

export default App;