import { useEffect, useState } from 'react';        // add useState
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import ZeroDayScreen from './components/ZeroDayScreen';  // ← ADD

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [booted, setBooted] = useState(false)  // ← ADD

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* ← ADD this block */}
      {!booted && <ZeroDayScreen onComplete={() => setBooted(true)} />}

      <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
        <div className="noise-overlay" />
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </>
  );
}

export default App;