import React, { useState, useEffect } from 'react';

// Configuración y Utilidades
import { auth } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { colors, adminEmails } from './config/constants';

// Componentes de Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Secciones
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Blog from './sections/Blog';
import Contact from './sections/Contact';

// Modales
import PrivacyModal from './components/ui/PrivacyModal';
import RegulationsModal from './components/ui/RegulationsModal'; // <--- Importamos

const App = () => {
  const [user, setUser] = useState(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isRegulationsOpen, setIsRegulationsOpen] = useState(false); // <--- Estado para el reglamento

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    document.title = "Diana Ledesma | Psicóloga Clínica";
    return () => unsubscribe();
  }, []);

  // LÓGICA DE SEGURIDAD
  const isAdmin = user && adminEmails.includes(user.email);

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
    <div className={`min-h-screen ${colors.bg} font-sans text-brand-dark selection:bg-brand-terra/30 selection:text-brand-dark`}>
      <Navbar user={user} isAdmin={isAdmin} />
      
      <main className="animate-fade-in">
        <Hero />
        <About />
        <Services />
        <Blog user={user} isAdmin={isAdmin} />
        <Contact />
      </main>

      <Footer 
        onOpenPrivacy={() => setIsPrivacyOpen(true)} 
        onOpenRegulations={() => setIsRegulationsOpen(true)} // <--- Conectamos el footer
        handleLogin={handleGoogleLogin} 
        user={user}
        isAdmin={isAdmin}
        handleLogout={handleLogout}
      />

      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      
      {/* AQUÍ PASAMOS 'isAdmin' AL MODAL */}
      <RegulationsModal 
        isOpen={isRegulationsOpen} 
        onClose={() => setIsRegulationsOpen(false)} 
        isAdmin={isAdmin} 
      />
    </div>
  );
};

export default App;