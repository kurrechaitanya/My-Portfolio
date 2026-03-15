import { useState, useEffect } from 'react';
 
const TOOLS = [
  { name: 'Burp Suite', desc: 'SQLi & XSS testing · OWASP testing' },
  { name: 'Metasploit', desc: 'Exploitation · Payload generation' },
  { name: 'Nmap',       desc: 'Port scanning · OS fingerprinting' },
  { name: 'Wireshark',  desc: 'Packet capture · Traffic analysis' },
  { name: 'Kali Linux', desc: 'Primary OS · Daily driver' },
  { name: 'Netcat',     desc: 'Reverse shells · Bind shells' },
];
 
const LANGS = [
  { name: 'Python', ctx: 'Exploit scripts · Recon automation · CTF solving' },
  { name: 'C',      ctx: 'Buffer overflows · Shellcode writing  · Memory exploitation' },
  { name: 'C++',    ctx: 'Process injection · Win32 API · Malware analysis' },
  { name: 'Java',   ctx: 'Secure code review · API security . Full stack context  ' },
  { name: 'SQL',    ctx: 'SQL injection · Database enumeration . Auth bypass' },
  { name: 'Bash',   ctx: 'Post exploitation · Tool automation · Reverse shells' },
];
 
const PLATFORMS = [
   { name: 'HackTheBox',  desc: 'Active ·  Machine exploitation' },
  { name: 'TryHackMe',   desc: 'Jr Penetration Tester path' },
  { name: 'VirtualBox',  desc: 'Isolated lab · Malware analysis' },
  { name: 'GitHub',      desc: 'Tool development · Daily commits' },
   { name: 'VS Code',  desc: 'Primary IDE · Security tooling' },
];
 
const CERTS = [
  { short: 'Security+', full: 'CompTIA SY0-701', year: '2026', status: 'IN PROGRESS', color: '#00f0ff', active: true },
  { short: 'eJPT',      full: 'eLearnSecurity',  year: '2026', status: 'PLANNED',     color: '#9ca3af', active: false },
  { short: 'OSCP',      full: 'OffSec PEN-200',  year: '2028', status: 'TARGET',      color: '#aa88ff', active: false },
  { short: 'CRTO',      full: 'Zero-Point Sec',  year: '2030', status: 'TARGET',      color: '#aa88ff', active: false },
];
 
const STATUS = [
  { dot: '#00ff88', text: 'SYSTEM ONLINE' },
  { dot: '#00f0ff', text: '6 LANGUAGES' },
  { dot: '#00f0ff', text: '6 TOOLS ACTIVE' },
  { dot: '#ffcc00', text: 'SECURITY+ IN PROGRESS' },
  { dot: '#ff3366', text: 'CTF MODE: ENABLED' },
];
 
function THead({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'rgba(0, 0, 0, 0.5)', borderBottom: '1px solid rgba(0, 240, 255,0.12)', flexShrink: 0 }}>
      {['#ff5f57', '#ffbd2e', '#28c940'].map((c, i) => (
        <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
      ))}
      <span style={{ marginLeft: 6, fontSize: 13, color: '#9ca3af', fontFamily: 'monospace', letterSpacing: '0.06em' }}>{label}</span>
    </div>
  );
}
 
function CTitle({ t }: { t: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexShrink: 0 }}>
      <span style={{ color: '#00f0ff', fontSize: 13 }}>$</span>
      <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 10, fontWeight: 700, color: '#00f0ff', letterSpacing: '0.12em' }}>{t}</span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(0, 240, 255,0.2),transparent)' }} />
    </div>
  );
}
 
export default function Skills() {
  const [hov, setHov] = useState<string | null>(null);
  const [hovPlatform, setHovPlatform] = useState<string | null>(null);
  const [hovCert, setHovCert] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
 
  const card: React.CSSProperties = {
    background: 'rgba(10, 10, 10, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(0, 240, 255,0.15)',
    borderRadius: 8,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  };
 
  const body: React.CSSProperties = {
    padding: '10px 14px',
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  };
 
  return (
    <section id="skills" style={{
  minHeight: '100vh',
  height: isMobile ? 'auto' : '100vh',
  overflow: isMobile ? 'auto' : 'hidden',
  background: 'transparent',
  padding: isMobile ? '62px 16px 20px' : '62px 40px 10px',
    fontFamily: "'Share Tech Mono', monospace",
      color: '#c8d8e8',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
 
      {/* TITLE */}
      <div style={{ textAlign: 'center', flexShrink: 0 }}>
        <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(18px,2.6vw,32px)', fontWeight: 900, letterSpacing: '0.1em', color: '#fff', margin: 0 }}>
          SKILL <span style={{ color: '#00f0ff', textShadow: '0 0 20px #00f0ff, 0 0 40px rgba(0, 240, 255,0.4)' }}>MATRIX.EXE</span>
        </h1>
        <p style={{ fontSize: 12, color: '#9ca3af', letterSpacing: '0.18em', margin: '3px 0 0' }}>
          // CAPABILITY SCAN COMPLETE
        </p>
      </div>
 
      {/* MAIN GRID */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'grid',
gridTemplateColumns: isMobile ? '1fr' : '1fr 1.8fr 1fr',
gridTemplateRows: isMobile ? 'auto' : '1fr 0.75fr',
gap: 8,
      }}>
 
        {/* CARD 1 — OFFENSIVE CORE — spans both rows */}
        <div style={{ ...card, gridRow: 'span 2' }}>
          <THead label="offensive_core.exe" />
          <div style={{ ...body, justifyContent: 'space-between', gap: 5 }}>
            <CTitle t="Offensive Core" />
            {TOOLS.map(tool => (
              <div
                key={tool.name}
                onMouseEnter={() => setHov(tool.name)}
                onMouseLeave={() => setHov(null)}
                style={{
                  padding: '7px 10px',
                  borderRadius: 5,
                  cursor: 'default',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  background: hov === tool.name ? 'rgba(0, 240, 255,0.07)' : '#0a1018',
                  border: `1px solid ${hov === tool.name ? 'rgba(0, 240, 255,0.5)' : 'rgba(0, 240, 255,0.1)'}`,
                  boxShadow: hov === tool.name ? '0 0 12px rgba(0, 240, 255,0.08)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 5px #00ff88', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#d1d5db', fontWeight: 700 }}>{tool.name}</span>
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af', paddingLeft: 14 }}>{tool.desc}</div>
              </div>
            ))}
          </div>
        </div>
 
        {/* CARD 2 — LANGUAGES — top center */}
        <div style={card}>
          <THead label="languages.sh" />
          <div style={body}>
            <CTitle t="Languages" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px', flex: 1, alignContent: 'space-evenly' }}>
              {LANGS.map(l => (
                <div key={l.name} style={{ borderLeft: '2px solid rgba(0, 240, 255,0.35)', paddingLeft: 10 }}>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#00f0ff', fontWeight: 700, marginBottom: 3 }}>{l.name}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.4 }}>{l.ctx}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
 
        {/* CARD 3 — PLATFORMS — top right */}
        <div style={card}>
          <THead label="platforms.sh" />
          <div style={{ ...body, justifyContent: 'space-between', gap: 5 }}>
            <CTitle t="Platforms" />
            {PLATFORMS.map(p => (
              <div
                key={p.name}
                onMouseEnter={() => setHovPlatform(p.name)}
                onMouseLeave={() => setHovPlatform(null)}
                style={{
                  padding: '5px 8px',
                  borderRadius: 4,
                  cursor: 'default',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: hovPlatform === p.name ? 'rgba(0, 240, 255,0.07)' : '#0a1018',
                  border: `1px solid ${hovPlatform === p.name ? 'rgba(0, 240, 255,0.5)' : 'rgba(0, 240, 255,0.1)'}`,
                  boxShadow: hovPlatform === p.name ? '0 0 8px rgba(0, 240, 255,0.06)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 4px #00ff88', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
 
        {/* CARD 4 — CERTIFICATIONS — bottom spans 2 cols */}
        <div style={{ ...card, gridColumn: 'span 2' }}>
          <THead label="certifications.exe — roadmap" />
          <div style={body}>
            <CTitle t="Certifications & Roadmap" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, flex: 1, minHeight: 0 }}>
              {CERTS.map(c => (
                <div 
                  key={c.short}
                  onMouseEnter={() => setHovCert(c.short)}
                  onMouseLeave={() => setHovCert(null)}
                  style={{
                    background: '#0a1018',
                    border: `1px solid ${hovCert === c.short ? 'rgba(0, 240, 255,0.5)' : c.active ? 'rgba(0, 240, 255,0.4)' : 'rgba(0, 240, 255,0.1)'}`,
                    borderRadius: 6,
                    padding: '6px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'default',
                    minHeight: 0,
                    transition: 'all 0.2s ease',
                  }}>
                  {c.active && (
                    <div style={{ position: 'absolute', top: 8, right: -18, background: '#00f0ff', color: '#000', fontSize: 7, fontWeight: 700, padding: '2px 22px', transform: 'rotate(45deg)', letterSpacing: '0.04em' }}>
                      ACTIVE
                    </div>
                  )}
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{c.year}</div>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 14, fontWeight: 700, color: '#00f0ff' }}>{c.short}</div>
                  <div style={{ fontSize: 13, color: '#c8d8e8', textAlign: 'center' }}>{c.full}</div>
                  <span style={{ fontSize: 13, padding: '2px 7px', borderRadius: 3, border: `1px solid ${c.color}`, color: c.color, background: c.active ? 'rgba(0, 240, 255,0.08)' : 'transparent' }}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
 
      </div>
 
      {/* STATUS BAR */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '5px 16px', background: 'rgba(10, 10, 10, 0.7)', border: '1px solid rgba(0, 240, 255,0.15)', borderRadius: 5, fontSize: 12, color: '#9ca3af', flexShrink: 0 }}>
        {STATUS.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {i > 0 && <span style={{ color: 'rgba(0, 240, 255,0.15)', marginRight: 4 }}>|</span>}
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: s.dot, boxShadow: `0 0 4px ${s.dot}` }} />
            <span>{s.text}</span>
          </div>
        ))}
        
      </div>
 
    </section>
  );
}
 
















