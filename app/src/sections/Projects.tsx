import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Folder, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AI Chatbot',
    description:
      'An intelligent conversational AI powered by natural language processing. Features context awareness, sentiment analysis, and multi-language support.',
    image: '/project-1.jpg',
    tags: ['Python', 'TensorFlow', 'NLP', 'React'],
    github: '#',
    demo: '#',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description:
      'Full-stack web application with real-time inventory, secure payments, and personalized recommendations. Built with modern architecture.',
    image: '/project-2.jpg',
    tags: ['Node.js', 'MongoDB', 'Express', 'React'],
    github: '#',
    demo: '#',
  },
  {
    id: 3,
    title: 'Data Visualizer',
    description:
      'Interactive dashboard for big data analytics with real-time updates, customizable charts, and export capabilities.',
    image: '/project-3.jpg',
    tags: ['D3.js', 'Python', 'PostgreSQL', 'Vue'],
    github: '#',
    demo: '#',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 50, rotateX: 45 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.2,
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

  const nextProject = () => {
    setIsFlipped(false);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setIsFlipped(false);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen w-full flex items-center justify-center py-20"
    >
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-4">
            <Folder className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-mono-tech">PORTFOLIO</span>
          </div>
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white mb-4">
            LATEST <span className="text-cyan-400">PROJECTS</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Showcasing my recent work and technical achievements
          </p>
        </div>

        {/* Projects Carousel */}
        <div className="relative perspective-1000">
          {/* Navigation Buttons */}
          <button
            onClick={prevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-cyan-400" />
          </button>
          <button
            onClick={nextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-cyan-400" />
          </button>

          {/* Cards Container */}
          <div className="flex justify-center items-center gap-6 py-8">
            {projects.map((project, index) => {
              const offset = index - activeIndex;
              const isActive = index === activeIndex;
              const isVisible = Math.abs(offset) <= 1;

              if (!isVisible) return null;

              return (
                <div
                  key={project.id}
                  className={`project-card absolute w-full max-w-lg transition-all duration-500 preserve-3d cursor-pointer ${
                    isActive ? 'z-10' : 'z-0 opacity-50 scale-90'
                  }`}
                  style={{
                    transform: `
                      translateX(${offset * 60}%) 
                      translateZ(${isActive ? 0 : -200}px) 
                      rotateY(${offset * -15}deg)
                    `,
                  }}
                  onClick={() => isActive && setIsFlipped(!isFlipped)}
                >
                  <div
                    className={`relative w-full transition-transform duration-500 preserve-3d ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front of Card */}
                    <div className="backface-hidden">
                      <div className="glass-panel-strong rounded-xl overflow-hidden hologram-border group">
                        {/* Image */}
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          
                          {/* Holographic overlay */}
                          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Scanline effect */}
                          <div className="absolute inset-0 scanline opacity-30" />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="font-orbitron font-bold text-xl text-white mb-2 group-hover:text-cyan-400 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {project.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
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
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Github className="w-4 h-4" />
                                <span>Code</span>
                              </a>
                            )}
                            {project.demo && (
                              <a
                                href={project.demo}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors text-sm"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="w-4 h-4" />
                                <span>Demo</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsFlipped(false);
                  setActiveIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-cyan-400 w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <a
            href="https://github.com"
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
