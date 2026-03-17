import { useEffect, useRef } from "react"
import WorldMapNetwork from "../components/3d/WorldMapNetwork"
import NeuralNetworkBackground from "../components/NeuralNetworkBackground"
import ParticleBackground from "../components/ParticleBackground"
import { startCyberAttacks } from "../components/CyberAttackEngine"
import TypewriterText from "../components/TypewriterText"

export default function Hero() {

  const sectionRef = useRef(null)
  const nameRef = useRef(null)
  const profileRef = useRef(null)

useEffect(() => {
  const timer = setTimeout(() => {
    const svg = document.getElementById("attack-layer") as SVGSVGElement | null
    startCyberAttacks(svg)
  }, 2000)
  return () => clearTimeout(timer)
}, [])
  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >

      <ParticleBackground />
<NeuralNetworkBackground />

      <div
        className="absolute inset-0 z-[-10]"
        
      />

<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-[0]" />      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* MAP + ATTACK LAYER */}
      <div className="network-layer"> 
<div
  className="absolute z-[15] opacity-85"
  style={{
    left: "30%",
    top: "67%",
    transform: "translateY(-50%)",
    width: "1200px",
    height: "800px",
    overflow: "hidden"
  }}
>  <svg
    id="attack-layer"
    viewBox="0 0 1200 800"
    className="absolute inset-0 w-full h-full z-30"
    preserveAspectRatio="xMidYMid meet"
  />

  <div className="relative w-full h-full" 
  style={{ zIndex: 10,  overflow: "hidden" }}>
    <WorldMapNetwork />
  </div>

        </div>
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 w-full max-w-7xl py-24 pl-10">

        {/* ── 3 COUNTERS (replaces old single counter) ── */}
        <div className="absolute top-6 right-10 font-mono text-sm tracking-widest flex gap-6">
          <div>
            <span className="text-gray-500">ATTACKS </span>
            <span id="attack-counter" className="text-red-400 font-bold">0</span>
          </div>
          <div>
            <span className="text-gray-500">BLOCKED </span>
            <span id="defend-counter" className="text-cyan-400 font-bold">0</span>
          </div>
          <div>
            <span className="text-gray-500">CRITICAL </span>
            <span id="critical-counter" className="text-fuchsia-400 font-bold animate-pulse">0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div>

            {/* PROFILE IMAGE */}
            <div
  ref={profileRef}
  className="relative w-44 h-44 mb-6 ml-6"
>
  {/* Rotating dashed outer ring */}
  <div
    className="absolute inset-[-8px] rounded-full"
    style={{
      border: '1px dashed #00ffff44',
      animation: 'spin 8s linear infinite',
    }}
  />

  {/* Counter-rotating outer ring */}
  <div
    className="absolute inset-[-16px] rounded-full"
    style={{
      border: '1px dashed #00ffff22',
      animation: 'spin 12s linear infinite reverse',
    }}
  />

  {/* Fast cyan arc */}
  <svg
    className="absolute inset-[-12px] w-[calc(100%+24px)] h-[calc(100%+24px)]"
    style={{ animation: 'spin 3s linear infinite' }}
    viewBox="0 0 200 200"
  >
    <defs>
      <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00ffff" stopOpacity="0"/>
        <stop offset="100%" stopColor="#00ffff" stopOpacity="1"/>
      </linearGradient>
    </defs>
    <circle
      cx="100" cy="100" r="96"
      fill="none"
      stroke="url(#arcGrad)"
      strokeWidth="3"
      strokeDasharray="80 520"
      strokeLinecap="round"
    />
  </svg>

  

  {/* Pulse glow ring */}
  <div
    className="absolute inset-[-4px] rounded-full"
    style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
  />

  {/* 4 tick marks */}
  {[0, 90, 180, 270].map((deg) => (
    <div
      key={deg}
      className="absolute w-2 h-2"
      style={{
        top: '50%',
        left: '50%',
        transform: `rotate(${deg}deg) translateY(-84px) translateX(-4px)`,
      }}
    >
      <div style={{
        width: '8px',
        height: '2px',
        background: '#00ffff',
        boxShadow: '0 0 6px #00ffff',
      }}/>
    </div>
  ))}

  {/* Profile image — same src, same styling */}
  <div
    className="relative w-full h-full rounded-full overflow-hidden"
    style={{
      border: '2px solid #00ffff99',
boxShadow: '0 0 30px #00ffff66, 0 0 60px #00ffff22, inset 0 0 20px #00ffff22',    }}
  >
    <img  src="/profile.png" className="w-full h-full object-cover"/>

    {/* Scan sweep over image */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'linear-gradient(to bottom, transparent 0%, #00ffff08 50%, transparent 100%)',
        animation: 'scan-sweep 3s ease-in-out infinite',
      }}  
    />
  </div>

  {/* ONLINE badge */}
  <div
    className="absolute bottom-1 right-1 flex items-center gap-1 px-2 py-0.5 rounded-full font-mono tracking-widest"
    style={{
      fontSize: '9px',
      background: 'rgba(0,0,0,0.8)',
      border: '1px solid #00ffff44',
      color: '#00ff88',
    }}
  >
    <div
      className="w-1.5 h-1.5 rounded-full animate-pulse"
      style={{
        background: '#00ff88',
        boxShadow: '0 0 6px #00ffff',
      }}
    />
    ONLINE
  </div>

</div>
            {/* NAME */}
            <h1
              ref={nameRef}
              className="font-orbitron text-7xl font-black mb-4"
            >
              <span className="text-white">KURRE </span>
              <span className="text-cyan-400 drop-shadow-[0_0_15px_#00ffff]">
                CHAITANYA
              </span>
            </h1>

            {/* ── TYPEWRITER (replaces old <p>) ── */}
            <div className="mb-8">
              <TypewriterText lines={[
                "B.TECH CYBERSECURITY | HINDUSTAN INSTITUTE OF TECHNOLOGY |",
                "Offensive Security Developer | Red Team Tool Builder"
              ]} />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4">
<a href="#projects" className="neon-button px-8 py-3">VIEW PROJECTS</a>
<a href="#contact" className="px-8 py-3 border border-white/30 rounded">CONTACT ME</a>            </div>

            {/* ── STATS BAR (new) ── */}
            <div className="flex gap-8 mt-8 font-mono text-xs border-t border-cyan-900/40 pt-6">
              {[
               { label: "CGPA",         value: "9.68",        color: "#00ff88" },
{ label: "SECURITY+",    value: "IN PROGRESS", color: "#00ffff" },
{ label: "CTF WINS",     value: "2",     color: "#00ffff" },
{ label: "GITHUB", value: "ACTIVE", color: "#00ff88", blink: false }
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-gray-500 tracking-widest text-[10px]">{stat.label}</span>
                  <span
                    className={stat.blink ? "animate-pulse" : ""}
                    style={{
                      color: stat.color,
                      textShadow: `0 0 10px ${stat.color}`,
                      fontSize: "1rem",
                      fontWeight: 700
                    }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />

    </section>
  )
}