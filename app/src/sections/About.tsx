import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, User, BookOpen, Target, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = `Second-year B.Tech Cybersecurity student at Hindustan Institute of Technology, Chennai.
Proficient in Python, C, C++, Java, HTML, CSS and SQL with hands-on experience using Wireshark, Nmap, Burp Suite, Metasploit and Kali Linux across real lab environments.
Competed and won at college-level CTF events — actively sharpening offensive skills through hands-on challenges in web exploitation, network analysis and binary tasks.
Currently preparing for CompTIA Security+ while building security tools that combine red team thinking with secure full stack development.
Driven by one principle — understand how systems break in order to build ones that don't.`;


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Terminal entrance animation
      gsap.fromTo(
        terminalRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const startTyping = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(startTyping, 20);
      }
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      onEnter: () => {
        setDisplayedText('');
        currentIndex = 0;
        startTyping();
      },
    });

    return () => {
      clearTimeout(timeout);
      scrollTrigger.kill();
    };
  }, []);

  const highlights = [
    { icon: BookOpen, label: 'Education', value: 'B.Tech Cybersecurity-HIT\nCGPA 9.68 · Graduating 2028' },
    { icon: Target, label: 'Focus', value: 'Offensive Security \n AI-Assisted Red Teaming' },
    { icon: Rocket, label: 'Goal', value: 'OSCP 2027|Red Team Engineer-28' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center py-15"
    >
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-4">
            <User className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-mono-tech">ABOUT ME</span>
          </div>
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white">
            WHO <span className="text-cyan-400">AMI</span>.EXE
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Terminal Window */}
          <div className="lg:col-span-2">
            <div
              ref={terminalRef}
              className="terminal-window p-6 pt-12 h-full"
            >
              {/* Terminal Header */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-black/50 border-b border-cyan-500/20 rounded-t-lg flex items-center px-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-4 text-xs text-gray-500 font-mono-tech">
                  about_me.exe — bash — 80×24
                </span>
              </div>

              {/* Terminal Content */}
              <div
                ref={textRef}
                className="font-mono-tech text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-wrap"
              >
                <span className="text-cyan-400">$</span>{' '}
                <span className="text-green-400">cat</span> about_me.txt
                {'\n'}
                {'\n'}
                {displayedText}
<span className="inline-block w-[2px] h-4 bg-cyan-400 ml-1 animate-blink" />              </div>

              {/* Terminal Footer */}
              <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between text-xs text-gray-500 font-mono-tech">
                <span>UTF-8</span>
                <span>Line 1, Col 1</span>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="space-y-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="glass-panel rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <item.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{item.label}</div>
<div className="font-mono-tech text-sm text-gray-300 whitespace-pre-line leading-relaxed">                      {item.value}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Stats */}
            <div className="glass-panel rounded-lg p-6">
              <h3 className="font-orbitron font-bold text-white mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                QUICK STATS
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'CGPA', value: '9.68' },
                  { label: 'Languages', value: ' 6' },
                  { label: 'Security+ ', value: 'In Progress' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-400">{stat.label}</span>
                    <span className="font-mono-tech text-cyan-400">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
