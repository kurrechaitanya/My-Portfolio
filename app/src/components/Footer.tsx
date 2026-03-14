import { Terminal, Github, Linkedin } from 'lucide-react';
 
export default function Footer() {
  return (
    <footer className="relative w-full py-6 border-t border-cyan-500/20">
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
 
          <div className="flex items-center gap-3">
            
            <span className="text-gray-500 text-sm hidden sm:inline">|</span>
            <span className="text-gray-500 text-sm">
              &copy; 2026 Kurre Chaitanya
            </span>
          </div>
 
          <span className="text-gray-500 text-xs font-mono">
            B.Tech Cybersecurity · Hindustan Institute of Technology
          </span>
 
          <div className="flex items-center gap-3">
            <a href="https://github.com/kurrechaitanya" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 border border-transparent hover:border-cyan-500/50 transition-all duration-300 group">
              <Github className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </a>
            <a href="https://linkedin.com/in/kurrechaitanya" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 border border-transparent hover:border-cyan-500/50 transition-all duration-300 group">
              <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </a>
          </div>
 
        </div>
      </div>
    </footer>
  );
}
 
















