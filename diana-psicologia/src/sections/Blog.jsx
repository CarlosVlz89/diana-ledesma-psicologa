import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar as CalendarIcon, ArrowRight, X, User } from 'lucide-react';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from '../firebase'; 
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';

// --- IMÁGENES AUTOMÁTICAS ---
const categoryImages = {
  'Bienestar': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
  'Ansiedad': 'https://images.unsplash.com/photo-1499209974431-2761e25234d5?auto=format&fit=crop&q=80&w=800',
  'Depresión': 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?auto=format&fit=crop&q=80&w=800',
  'Crianza': 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=800',
  'Pareja': 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&q=80&w=800',
};

// Función auxiliar para fechas
const formatDate = (timestamp) => {
  if (!timestamp) return 'Reciente';
  return new Date(timestamp.seconds * 1000).toLocaleDateString('es-MX', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });
};

const Blog = ({ user, isAdmin }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados de control
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // <--- PARA EL MODAL DE LECTURA
  
  const [currentPost, setCurrentPost] = useState({ title: '', content: '', category: 'Bienestar', imageUrl: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'blog_posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
    }, (err) => { console.error(err); setLoading(false); });
    return () => unsubscribe();
  }, []);

  // --- LÓGICA DE GUARDADO/BORRADO (Igual que antes) ---
  const handleSavePost = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    setError('');
    try {
      const postData = {
        title: currentPost.title,
        content: currentPost.content,
        category: currentPost.category,
        imageUrl: currentPost.imageUrl,
        author: "Diana Ledesma",
        authorId: user.uid,
        createdAt: serverTimestamp(),
      };
      if (currentPost.id) {
        const docRef = doc(db, 'blog_posts', currentPost.id);
        await updateDoc(docRef, postData);
      } else {
        await addDoc(collection(db, 'blog_posts'), postData);
      }
      setIsEditing(false);
      setCurrentPost({ title: '', content: '', category: 'Bienestar', imageUrl: '' });
    } catch (err) {
      console.error(err);
      setError('Error al guardar.');
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Evita que se abra el modal al borrar
    if(!confirm("¿Borrar artículo?")) return;
    try { await deleteDoc(doc(db, 'blog_posts', id)); } catch (err) { console.error(err); }
  };

  const handleEditClick = (e, post) => {
    e.stopPropagation(); // Evita que se abra el modal de lectura
    setCurrentPost(post); 
    setIsEditing(true);
  };

  return (
    <Section id="blog" className="bg-brand-cream/50 relative">
      <Reveal>
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 border-b border-brand-sand pb-8">
          <div className="text-center md:text-left">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">Blog de Salud Mental</h2>
             <div className="h-1 w-20 bg-brand-terra mt-4 rounded-full mx-auto md:mx-0"></div>
          </div>
          {isAdmin && !isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              <Plus size={18} /> Nuevo Artículo
            </Button>
          )}
        </div>
      </Reveal>

      {/* --- EDITOR (ADMIN) --- */}
      {isEditing && isAdmin && (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-brand-sand mb-12 animate-fade-in ring-4 ring-brand-sand/30">
          <h3 className="text-xl font-bold mb-6 text-brand-dark flex items-center gap-2">
            <Edit2 size={20} className="text-brand-terra"/> Editor de Artículos
          </h3>
          <form onSubmit={handleSavePost} className="space-y-4">
             {/* ... Inputs del formulario ... */}
             <div className="col-span-2">
               <label className="block text-sm font-medium text-stone-600 mb-1">Imagen de Portada (URL)</label>
               <input 
                 type="text" 
                 value={currentPost.imageUrl || ''}
                 onChange={(e) => setCurrentPost({...currentPost, imageUrl: e.target.value})}
                 className="w-full p-3 border border-brand-sand rounded-lg bg-brand-cream/30 text-xs outline-none focus:border-brand-sage"
                 placeholder="URL de imagen..."
               />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Título</label>
              <input type="text" required value={currentPost.title} onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})} className="w-full p-3 border border-brand-sand rounded-lg bg-brand-cream/30 outline-none focus:border-brand-sage" />
            </div>
            <div>
               <label className="block text-sm font-medium text-stone-600 mb-1">Categoría</label>
               <select value={currentPost.category} onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})} className="w-full p-3 border border-brand-sand rounded-lg bg-brand-cream/30 outline-none focus:border-brand-sage">
                 {Object.keys(categoryImages).map(cat => <option key={cat}>{cat}</option>)}
               </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Contenido</label>
              <textarea required rows={6} value={currentPost.content} onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})} className="w-full p-3 border border-brand-sand rounded-lg bg-brand-cream/30 outline-none focus:border-brand-sage" />
            </div>
            
            <div className="flex gap-4 justify-end pt-4">
              <Button variant="outline" onClick={() => { setIsEditing(false); setCurrentPost({ title: '', content: '', category: 'Bienestar', imageUrl: '' }); }}>Cancelar</Button>
              <Button type="submit">Publicar</Button>
            </div>
          </form>
        </div>
      )}

      {/* --- LISTA DE POSTS --- */}
      {loading ? (
        <div className="text-center py-20 text-brand-sage animate-pulse font-serif">Cargando inspiración...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-brand-sand/20 rounded-2xl border-dashed border-2 border-brand-sand">
           <p className="text-stone-500">Aún no hay artículos.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 100}>
              {/* AL DAR CLIC EN EL ARTÍCULO, SE ABRE EL MODAL */}
              <article 
                onClick={() => setSelectedPost(post)} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-brand-sand/50 h-full flex flex-col cursor-pointer"
              >
                <div className="h-56 relative overflow-hidden">
                   <img 
                      src={post.imageUrl || categoryImages[post.category] || categoryImages['Bienestar']} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent opacity-60"></div>
                   <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-brand-dark shadow-sm">
                      {post.category}
                   </span>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                     <div className="flex items-center gap-2 text-xs text-brand-terra font-medium">
                        <CalendarIcon size={12}/> {formatDate(post.createdAt)}
                     </div>
                     {isAdmin && (
                        <div className="flex gap-1">
                          <button onClick={(e) => handleEditClick(e, post)} className="p-1.5 hover:bg-brand-sand rounded-full text-stone-400 hover:text-brand-dark transition-colors"><Edit2 size={14}/></button>
                          <button onClick={(e) => handleDelete(e, post.id)} className="p-1.5 hover:bg-red-50 rounded-full text-stone-400 hover:text-red-500 transition-colors"><Trash2 size={14}/></button>
                        </div>
                     )}
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-brand-dark mb-3 leading-tight group-hover:text-brand-terra transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-stone-600 text-sm line-clamp-3 mb-6 font-light leading-relaxed flex-1">
                    {post.content}
                  </p>
                  
                  <div className="pt-4 border-t border-brand-sand/30 flex justify-between items-center">
                      <span className="text-xs text-stone-400 font-medium">Por Diana Ledesma</span>
                      <span className="text-brand-terra text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Leer más <ArrowRight size={12}/>
                      </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      {/* --- MODAL DE LECTURA DE ARTÍCULO --- */}
      {selectedPost && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm transition-opacity" onClick={() => setSelectedPost(null)}></div>
          
          <div className="bg-brand-cream w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative z-10 animate-fade-in-up flex flex-col">
             
             {/* Imagen Grande */}
             <div className="h-64 sm:h-80 relative shrink-0">
                <img 
                  src={selectedPost.imageUrl || categoryImages[selectedPost.category] || categoryImages['Bienestar']} 
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 bg-white/50 hover:bg-white text-brand-dark p-2 rounded-full backdrop-blur-md transition-all"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-brand-dark/80 to-transparent p-6 sm:p-8 pt-20">
                   <span className="bg-brand-terra text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                      {selectedPost.category}
                   </span>
                   <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
                      {selectedPost.title}
                   </h2>
                </div>
             </div>

             {/* Contenido Completo */}
             <div className="p-6 sm:p-10 bg-brand-cream">
                <div className="flex items-center gap-4 text-sm text-stone-500 mb-8 border-b border-brand-sand pb-4">
                   <div className="flex items-center gap-2"><User size={16}/> Diana Ledesma</div>
                   <div className="flex items-center gap-2"><CalendarIcon size={16}/> {formatDate(selectedPost.createdAt)}</div>
                </div>
                
                <div className="prose prose-stone prose-lg max-w-none font-light leading-relaxed whitespace-pre-line text-brand-dark">
                   {selectedPost.content}
                </div>

                <div className="mt-12 pt-8 border-t border-brand-sand text-center">
                   <Button onClick={() => setSelectedPost(null)} variant="outline">
                      Cerrar Artículo
                   </Button>
                </div>
             </div>
          </div>
        </div>
      )}

    </Section>
  );
};

export default Blog;