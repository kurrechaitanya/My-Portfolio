import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LucideIcon } from 'lucide-react';
import {
  Code2,
  Database,
  GitBranch,
  Container,
  Cloud,
  Brain,
  Layout,
  Server,
  FileCode,
  Layers,
  Zap,
  Cpu,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: LucideIcon;
  level: number;
  orbit: number;
}

const skills: Skill[] = [
  { name: 'Python', icon: FileCode, level: 90, orbit: 0 },
  { name: 'JavaScript', icon: Code2, level: 85, orbit: 0 },
  { name: 'React', icon: Layout, level: 88, orbit: 1 },
  { name: 'Node.js', icon: Server, level: 82, orbit: 1 },
  { name: 'MongoDB', icon: Database, level: 78, orbit: 1 },
  { name: 'SQL', icon: Database, level: 80, orbit: 2 },
  { name: 'Git', icon: GitBranch, level: 85, orbit: 2 },
  { name: 'Docker', icon: Container, level: 70, orbit: 2 },
  { name: 'AWS', icon: Cloud, level: 65, orbit: 0 },
  { name: 'Machine Learning', icon: Brain, level: 75, orbit: 1 },
  { name: 'TypeScript', icon: Layers, level: 80, orbit: 2 },
  { name: 'System Design', icon: Cpu, level: 72, orbit: 0 },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Core animation
      gsap.fromTo(
        coreRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Orbits animation
      gsap.fromTo(
        '.orbit-ring',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Skill nodes animation
      gsap.fromTo(
        '.skill-node',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Continuous orbit rotation
      gsap.to('.orbit-ring-0', {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.orbit-ring-1', {
        rotation: -360,
        duration: 40,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.orbit-ring-2', {
        rotation: 360,
        duration: 50,
        repeat: -1,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Group skills by orbit
  const skillsByOrbit = [0, 1, 2].map((orbitIndex) =>
    skills.filter((skill) => skill.orbit === orbitIndex)
  );

  const orbitRadii = [140, 220, 300];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen w-full flex items-center justify-center py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Radial gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-4">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-mono-tech">EXPERTISE</span>
          </div>
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white mb-4">
            SKILL <span className="text-cyan-400">GALAXY</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        {/* Orbital System */}
        <div
          ref={orbitsRef}
          className="relative w-full max-w-[700px] h-[700px] mx-auto"
        >
          {/* Orbit Rings */}
          {orbitRadii.map((radius, index) => (
            <div
              key={index}
              className={`orbit-ring orbit-ring-${index} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20`}
              style={{
                width: radius * 2,
                height: radius * 2,
              }}
            />
          ))}

          {/* Core */}
          <div
            ref={coreRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Cpu className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -inset-4 rounded-full border-2 border-cyan-500/30 animate-pulse" />
              <div className="absolute -inset-8 rounded-full border border-cyan-500/20" />
            </div>
          </div>

          {/* Skill Nodes */}
          {skillsByOrbit.map((orbitSkills, orbitIndex) =>
            orbitSkills.map((skill, skillIndex) => {
              const angle =
                (skillIndex / orbitSkills.length) * 360 +
                orbitIndex * 30;
              const radius = orbitRadii[orbitIndex];
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <div
                  key={skill.name}
                  className="skill-node absolute top-1/2 left-1/2 z-10"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <div className="group relative">
                    {/* Node */}
                    <div className="w-16 h-16 rounded-xl glass-panel flex items-center justify-center cursor-pointer hover:border-cyan-500/60 transition-all duration-300 hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
                      <skill.icon className="w-7 h-7 text-cyan-400" />
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="glass-panel-strong rounded-lg px-4 py-2 whitespace-nowrap">
                        <div className="font-orbitron font-bold text-white text-sm">
                          {skill.name}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                          <span className="text-xs text-cyan-400 font-mono-tech">
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Connection line to center */}
                    <div
                      className="absolute top-1/2 left-1/2 w-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 origin-left -z-10"
                      style={{
                        width: radius,
                        transform: `rotate(${angle + 180}deg)`,
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Skills List (Mobile) */}
        <div className="lg:hidden mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="glass-panel rounded-lg p-4 flex items-center gap-3"
            >
              <skill.icon className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-white">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
