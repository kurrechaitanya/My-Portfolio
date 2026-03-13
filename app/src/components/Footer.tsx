import { Heart, Terminal, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full py-8 border-t border-cyan-500/20">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50">
                <Terminal className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-orbitron font-bold text-white text-sm tracking-wider">
                ALEX<span className="text-cyan-400">.DEV</span>
              </span>
            </div>
            <span className="text-gray-500 text-sm hidden sm:inline">|</span>
            <span className="text-gray-500 text-sm">
              &copy; {currentYear} All rights reserved.
            </span>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>and</span>
            <span className="text-cyan-400 font-mono-tech">&lt;Code/&gt;</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Twitter, href: '#', label: 'Twitter' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/50 border border-transparent transition-all duration-300 group"
              >
                <social.icon className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Terminal-style status bar */}
        <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 font-mono-tech">
          <span>STATUS: ONLINE</span>
          <span className="text-cyan-500/50">|</span>
          <span>LATENCY: 12ms</span>
          <span className="text-cyan-500/50">|</span>
          <span>UPTIME: 99.9%</span>
          <span className="text-cyan-500/50">|</span>
          <span>BUILD: v2.0.0</span>
        </div>
      </div>
    </footer>
  );
}
