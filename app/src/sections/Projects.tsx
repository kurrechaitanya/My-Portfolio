import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Folder, ExternalLink, Github } from 'lucide-react';
 
gsap.registerPlugin(ScrollTrigger);
 
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  status: string;
  statusColor: string;
  icon: string;
}
 
const projects: Project[] = [
  {
    id: 1,
    title: 'Cybersecurity Portfolio',
    description:
      'A hacker-terminal themed portfolio website built with offensive security aesthetics. Features interactive world map, GSAP animations, terminal-style UI components and cyber grid effects.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Vite'],
    github: 'https://github.com/kurrechaitanya/My-Portfolio',
    demo: 'https://kurrechaitanya.com/',
    status: 'LIVE',
    statusColor: '#00ff88',
    icon: '</>',
  },
];
 
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
 
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
 
    return () => ctx.revert();
  }, []);
 
  const project = projects[0];
 
  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-16"
    >
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
 
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
 
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-4">
            <Folder className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-mono-tech">PORTFOLIO</span>
          </div>
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white mb-4">
            ACTIVE <span className="text-cyan-400">PROJECTS</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-mono-tech text-sm">
            Security tools, research projects and development work in progress.
          </p>
        </div>
 
        {/* Project Card */}
        <div className="project-card glass-panel-strong rounded-xl overflow-hidden mb-8">
 
          {/* Card Top — Icon Area */}
          <div
            className="relative h-32 flex items-center justify-center"
            style={{ background: '#0a1018' }}
          >
            <div className="absolute inset-0 cyber-grid opacity-20" />
 
            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span
                className="font-mono-tech text-xs px-3 py-1 rounded-full border"
                style={{
                  color: project.statusColor,
                  borderColor: project.statusColor,
                  background: `${project.statusColor}15`,
                }}
              >
                {project.status}
              </span>
            </div>
 
            <div
              className="relative z-10 font-orbitron text-3xl font-black select-none"
              style={{
                color: '#00f0ff',
                textShadow: '0 0 30px #00f0ff, 0 0 60px rgba(0,240,255,0.4)',
              }}
            >
              {project.icon}
            </div>
          </div>
 
          {/* Card Content */}
          <div className="p-6">
            <h3 className="font-orbitron font-bold text-xl text-white mb-3">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              {project.description}
            </p>
 
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 text-xs font-mono-tech bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
 
            {/* Actions */}
            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-white"
                >
                  <Github className="w-4 h-4" />
                  <span>Code</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
 
        {/* View More Button */}
        <div className="text-center">
          <a
            href="https://github.com/kurrechaitanya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 neon-button px-8 py-3 rounded-lg font-orbitron font-bold text-sm tracking-wider"
          >
            <Github className="w-5 h-5" />
            VIEW MORE ON GITHUB
          </a>
        </div>
 
      </div>
    </section>
  );
}