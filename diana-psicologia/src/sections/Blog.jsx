import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar as CalendarIcon, ArrowRight, X, User } from 'lucide-react';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from '../firebase'; 
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';

// Imágenes por defecto
const categoryImages = {
  'Bienestar': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
  'Ansiedad': 'https://images.unsplash.com/photo-1499209974431-2761e25234d5?auto=format&fit=crop&q=80&w=800',
  'Depresión': 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?auto=format&fit=crop&q=80&w=800',
  'Crianza': 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=800',
  'Pareja': 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&q=80&w=800',
};

const formatDate = (timestamp) => {
  if (!timestamp) return 'Reciente';
  return new Date(timestamp.seconds * 1000).toLocaleDateString('es-MX', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });
};

const Blog = ({ user, isAdmin }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPost, setCurrentPost] = useState({ title: '', content: '', category: 'Bienestar', imageUrl: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'blog_posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
      setLoading(false);
    }, (err) => { console.error(err); setLoading(false); });
    return () => unsubscribe();
  }, []);

  // ... (Funciones handleSavePost, handleDelete, handleEditClick se mantienen igual)
  const handleSavePost = async (e) => { e.preventDefault(); if (!isAdmin) return; try { const postData = { title: currentPost.title, content: currentPost.content, category: currentPost.category, imageUrl: currentPost.imageUrl, author: "Diana Ledesma", authorId: user.uid, createdAt: serverTimestamp(), }; if (currentPost.id) { await updateDoc(doc(db, 'blog_posts', currentPost.id), postData); } else { await addDoc(collection(db, 'blog_posts'), postData); } setIsEditing(false); setCurrentPost({ title: '', content: '', category: 'Bienestar', imageUrl: '' }); } catch (err) { setError('Error al guardar.'); } };
  const handleDelete = async (e, id) => { e.stopPropagation(); if(!confirm("¿Borrar artículo?")) return; try { await deleteDoc(doc(db, 'blog_posts', id)); } catch (err) { console.error(err); } };
  const handleEditClick = (e, post) => { e.stopPropagation(); setCurrentPost(post); setIsEditing(true); };


  return (
    <Section id="blog" className="relative">
      <Reveal>
        {/* Borde inferior sutil en Salvia */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 border-b border-brand-sage/20 pb-8">
          <div className="text-center md:text-left">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-text">Blog de Salud Mental</h2>
             {/* 1. Línea decorativa SALVIA */}
             <div className="h-1 w-20 bg-brand-sage mt-4 rounded-full mx-auto md:mx-0"></div>
          </div>
          {isAdmin && !isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              <Plus size={18} /> Nuevo Artículo
            </Button>
          )}
        </div>
      </Reveal>

      {/* Editor Admin (Se mantiene igual) */}
      {isEditing && isAdmin && (
        <div className="glass-panel p-8 mb-12 animate-fade-in bg-white/80">
          {/* ... Formulario del editor ... */}
          <h3 className="text-xl font-bold mb-6 text-brand-text flex items-center gap-2"><Edit2 size={20} className="text-brand-accent"/> Editor</h3><form onSubmit={handleSavePost} className="space-y-4"><div className="col-span-2"><label className="block text-sm font-medium text-brand-text mb-1">Imagen URL</label><input type="text" value={currentPost.imageUrl || ''} onChange={(e) => setCurrentPost({...currentPost, imageUrl: e.target.value})} className="w-full p-3 border border-brand-sage/30 rounded-xl bg-white/50 outline-none focus:border-brand-accent" placeholder="URL de imagen..." /></div><div><label className="block text-sm font-medium text-brand-text mb-1">Título</label><input type="text" required value={currentPost.title} onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})} className="w-full p-3 border border-brand-sage/30 rounded-xl bg-white/50 outline-none focus:border-brand-accent" /></div><div><label className="block text-sm font-medium text-brand-text mb-1">Categoría</label><select value={currentPost.category} onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})} className="w-full p-3 border border-brand-sage/30 rounded-xl bg-white/50 outline-none focus:border-brand-accent">{Object.keys(categoryImages).map(cat => <option key={cat}>{cat}</option>)}</select></div><div><label className="block text-sm font-medium text-brand-text mb-1">Contenido</label><textarea required rows={6} value={currentPost.content} onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})} className="w-full p-3 border border-brand-sage/30 rounded-xl bg-white/50 outline-none focus:border-brand-accent" /></div><div className="flex gap-4 justify-end pt-4"><Button variant="secondary" onClick={() => { setIsEditing(false); setCurrentPost({ title: '', content: '', category: 'Bienestar', imageUrl: '' }); }}>Cancelar</Button><Button type="submit">Publicar</Button></div></form>
        </div>
      )}

      {/* Lista de Posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <Reveal key={post.id} delay={i * 100}>
            <article 
              onClick={() => setSelectedPost(post)} 
              // 4. Borde hover SALVIA
              className="glass-card flex flex-col h-full group bg-white/30 border-white/40 hover:border-brand-sage/40"
            >
              <div className="h-56 relative overflow-hidden rounded-t-3xl">
                 <img src={post.imageUrl || categoryImages[post.category] || categoryImages['Bienestar']} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                 
                 {/* 2. Etiqueta de Categoría SALVIA (Fondo verde, texto claro) */}
                 <span className="absolute top-4 left-4 bg-brand-sage/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-brand-bg shadow-sm border border-white/20">
                    {post.category}
                 </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                   {/* 3. Icono de fecha SALVIA */}
                   <div className="flex items-center gap-2 text-xs text-brand-sage font-medium">
                      <CalendarIcon size={12}/> {formatDate(post.createdAt)}
                   </div>
                   {isAdmin && (
                      <div className="flex gap-1">
                        <button onClick={(e) => handleEditClick(e, post)} className="p-1.5 hover:bg-brand-sage/20 rounded-full text-brand-text"><Edit2 size={14}/></button>
                        <button onClick={(e) => handleDelete(e, post.id)} className="p-1.5 hover:bg-red-50 rounded-full text-brand-text hover:text-red-500"><Trash2 size={14}/></button>
                      </div>
                   )}
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-text mb-3 leading-tight group-hover:text-brand-accent transition-colors">{post.title}</h3>
                <p className="text-brand-text/80 text-sm line-clamp-3 mb-6 font-sans leading-relaxed flex-1">{post.content}</p>
                
                {/* Borde superior del footer sutil en Salvia */}
                <div className="pt-4 border-t border-brand-sage/10 flex justify-between items-center">
                    <span className="text-xs text-brand-text/50 font-medium">Por Diana Ledesma</span>
                    <span className="text-brand-accent text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">Leer más <ArrowRight size={12}/></span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Modal de Lectura (Se mantiene igual, ya usa la paleta base) */}
      {selectedPost && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-text/40 backdrop-blur-md transition-opacity" onClick={() => setSelectedPost(null)}></div>
          <div className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10 animate-fade-in-up flex flex-col bg-brand-bg">
             <div className="h-64 sm:h-80 relative shrink-0">
                <img src={selectedPost.imageUrl || categoryImages[selectedPost.category]} alt={selectedPost.title} className="w-full h-full object-cover"/>
                <button onClick={() => setSelectedPost(null)} className="absolute top-4 right-4 bg-white/50 hover:bg-white text-brand-text p-2 rounded-full backdrop-blur-md"><X size={24} /></button>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-brand-text/80 to-transparent p-6 sm:p-8 pt-20">
                   {/* Etiqueta en el modal también Salvia */}
                   <span className="bg-brand-sage/90 text-brand-bg px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block border border-white/20">{selectedPost.category}</span>
                   <h2 className="text-2xl sm:text-4xl font-serif font-bold text-brand-bg leading-tight">{selectedPost.title}</h2>
                </div>
             </div>
             <div className="p-6 sm:p-10 bg-brand-bg/95">
                <div className="flex items-center gap-4 text-sm text-brand-text/60 mb-8 border-b border-brand-sage/20 pb-4">
                   <div className="flex items-center gap-2"><User size={16}/> Diana Ledesma</div>
                   <div className="flex items-center gap-2 text-brand-sage"><CalendarIcon size={16}/> {formatDate(selectedPost.createdAt)}</div>
                </div>
                <div className="prose prose-stone prose-lg max-w-none font-sans leading-relaxed whitespace-pre-line text-brand-text/90">
                   {selectedPost.content}
                </div>
                <div className="mt-12 pt-8 border-t border-brand-sage/20 text-center">
                   <Button onClick={() => setSelectedPost(null)} variant="outline">Cerrar Artículo</Button>
                </div>
             </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Blog;