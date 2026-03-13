import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Terminal, Shield, Search, Cpu, Database, 
  Globe, Lock, Zap, Code2, FileCode, 
  Layers, Container, Box, Github
} from 'lucide-react';

// Refined Data from your Skill Matrix
const languages = [
  { name: 'Python', level: 88, color: '#00d4ff' },
  { name: 'C / C++', level: 82, color: '#00d4ff' },
  { name: 'Java', level: 70, color: '#00d4ff' },
  { name: 'SQL', level: 73, color: '#00d4ff' },
  { name: 'Bash', level: 65, color: '#00d4ff' },
];

const securityTools = [
  { name: 'Kali Linux', icon: Terminal },
  { name: 'Wireshark', icon: Search },
  { name: 'Nmap', icon: Globe },
  { name: 'Burp Suite', icon: Lock },
  { name: 'Metasploit', icon: Shield },
  { name: 'Netcat', icon: Zap },
];

const roadmap = [
  { name: 'Security+', status: 'In Progress', year: '2026', color: 'text-green-400' },
  { name: 'eJPT', status: 'Planned', year: '2026', color: 'text-cyan-400' },
  { name: 'OSCP', status: 'Target', year: '2027', color: 'text-purple-400' },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animations for cards
      gsap.from(".skill-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
      // Progress bar fill animation
      gsap.from(".progress-bar", {
        width: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "power4.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills" 
      ref={containerRef} 
      className="relative h-screen w-full bg-[#020408] text-[#c8d8e8] font-mono overflow-hidden flex flex-col p-6 lg:p-10"
    >
      {/* Background Orbs & Grid to match About Page */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/5 blur-[100px] rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full" />

      {/* Header Segment */}
      <div className="relative z-10 mb-8 text-center">
        <h1 className="font-orbitron text-4xl font-black tracking-widest text-white uppercase">
          SKILL <span className="text-cyan-400 drop-shadow-[0_0_10px_#00d4ff]">MATRIX</span>
        </h1>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-2" />
        <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mt-3">
          // Capability Scan: Initializing Profile Kurre Chaitanya
        </p>
      </div>

      {/* Main Grid: Balanced to fit one screen */}
      <div className="relative z-10 flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* LEFT: Languages & Core Stats (4 Cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="skill-card flex-1 bg-[#080d12]/80 border border-white/10 rounded-lg p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-tighter text-white font-orbitron">Programming</h2>
            </div>
            <div className="space-y-5">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-[11px] mb-1.5 font-bold uppercase">
                    <span>{lang.name}</span>
                    <span className="text-cyan-400">{lang.level}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="progress-bar h-full bg-cyan-400 shadow-[0_0_10px_#00d4ff]"
                      style={{ width: `${lang.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER: Security Tools & Knowledge Base (5 Cols) */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
          <div className="skill-card flex-1 bg-[#080d12]/80 border border-white/10 rounded-lg p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-tighter text-white font-orbitron">Security Arsenal</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {securityTools.map((tool) => (
                <div key={tool.name} className="flex items-center gap-3 bg-[#0a1018] border border-white/5 p-3 rounded group hover:border-cyan-500/50 transition-all">
                  <tool.icon className="w-5 h-5 text-cyan-500 group-hover:text-cyan-300" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">{tool.name}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-[10px] text-slate-500 uppercase mb-4 tracking-widest border-l-2 border-cyan-500 pl-2">Knowledge Base</h3>
              <div className="flex flex-wrap gap-2">
                {['OWASP Top 10', 'TCP/IP', 'SQLi', 'XSS', 'Linux Internals', 'Cryptography'].map(tag => (
                  <span key={tag} className="text-[9px] px-2 py-1 bg-cyan-500/5 border border-cyan-500/20 text-cyan-300 rounded uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Roadmap & Stats (3 Cols) */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <div className="skill-card flex-1 bg-[#080d12]/80 border border-white/10 rounded-lg p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-tighter text-white font-orbitron">Roadmap</h2>
            </div>
            <div className="space-y-4">
              {roadmap.map((cert) => (
                <div key={cert.name} className="border-l-2 border-white/10 pl-4 py-1 hover:border-cyan-500 transition-colors">
                  <div className="text-[11px] font-bold text-white uppercase">{cert.name}</div>
                  <div className={`text-[9px] font-bold ${cert.color} uppercase tracking-widest mt-0.5`}>
                    {cert.status} • {cert.year}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="skill-card bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-5">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-black text-white font-orbitron">9.68</div>
                <div className="text-[9px] text-cyan-500 uppercase font-bold mt-1">CGPA</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white font-orbitron">130+</div>
                <div className="text-[9px] text-cyan-500 uppercase font-bold mt-1">Lab Hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="relative z-10 mt-8 bg-[#080d12] border border-white/5 p-2 px-6 rounded-md flex justify-between items-center text-[10px] text-slate-500">
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5 uppercase font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]" />
            System Ready
          </span>
          <span className="hidden md:inline uppercase tracking-widest">Environment: Kali-Linux</span>
        </div>
        <div className="text-cyan-500/80 font-bold font-mono tracking-tighter">
          KURRE_CHAITANYA@HIT:~/skills$_
        </div>
      </div>
    </section>
  );
}