import { useEffect, useState, useRef } from 'react'

interface Props {
  onComplete: () => void
}

interface AlertLine {
  id: number
  text: string
  type: 'normal' | 'warning' | 'critical' | 'identity' | 'success' | 'dim'
}

export default function ZeroDayScreen({ onComplete }: Props) {

  const [phase, setPhase]               = useState<1|2|3|4|5|6>(1)
  const [alerts, setAlerts]             = useState<AlertLine[]>([])
  const [exiting, setExiting]           = useState(false)
  const [identityLines, setIdentityLines] = useState<string[]>([])
  const [demoLines, setDemoLines]       = useState<string[]>([])
  const [cveVisible, setCveVisible]     = useState(false)
  const alertIdRef                      = useRef(0)
  const audioCtx                        = useRef<AudioContext | null>(null)

  // ── Real browser data ──────────────────────────────────────────
  const browserData = {
    browser: (() => {
      const ua = navigator.userAgent
      if (ua.includes('Chrome'))  return 'CHROME'
      if (ua.includes('Firefox')) return 'FIREFOX'
      if (ua.includes('Safari'))  return 'SAFARI'
      if (ua.includes('Edge'))    return 'EDGE'
      return 'UNKNOWN'
    })(),
    os: (() => {
      const ua = navigator.userAgent
      if (ua.includes('Windows')) return 'WINDOWS'
      if (ua.includes('Mac'))     return 'MACOS'
      if (ua.includes('Linux'))   return 'LINUX'
      if (ua.includes('Android')) return 'ANDROID'
      if (ua.includes('iPhone'))  return 'IOS'
      return 'UNKNOWN'
    })(),
    time: new Date().toLocaleTimeString('en-US', { hour12: false }),
    lang: navigator.language.toUpperCase(),
    cores: navigator.hardwareConcurrency || 4,
  }

  // ── Sound engine ───────────────────────────────────────────────
  function playGlitch() {
    try {
      if (!audioCtx.current) {
        audioCtx.current = new AudioContext()
      }
      const ctx = audioCtx.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(440, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.15)
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.15)
    } catch {}
  }

  function playBeep(freq = 880, dur = 0.08) {
    try {
      if (!audioCtx.current) audioCtx.current = new AudioContext()
      const ctx = audioCtx.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.06, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + dur)
    } catch {}
  }

  // ── Add alert helper ───────────────────────────────────────────
  function addAlert(text: string, type: AlertLine['type'] = 'normal', sound = true) {
    if (sound) {
      if (type === 'critical') playGlitch()
      else playBeep(type === 'warning' ? 660 : 440)
    }
    setAlerts(prev => [...prev, { id: alertIdRef.current++, text, type }])
  }

  // ── Main sequence ──────────────────────────────────────────────
  useEffect(() => {

    // PHASE 1 — Corporate dashboard (1.5s)
    const t: ReturnType<typeof setTimeout>[] = []

    t.push(setTimeout(() => setPhase(2), 1500))

    // PHASE 2 — First anomaly
    t.push(setTimeout(() => {
      addAlert('⚠  ANOMALY DETECTED — NODE 7749', 'warning')
    }, 2000))

    t.push(setTimeout(() => {
      addAlert(`   ORIGIN:         VIJAYAWADA, IN`, 'dim', false)
    }, 2300))

    t.push(setTimeout(() => {
      addAlert(`   BROWSER:        ${browserData.browser} / ${browserData.os}`, 'dim', false)
    }, 2500))

    t.push(setTimeout(() => {
      addAlert(`   ENTRY TIME:     ${browserData.time}`, 'dim', false)
    }, 2700))

    t.push(setTimeout(() => {
      addAlert('   THREAT LEVEL:   CALCULATING...', 'dim', false)
    }, 2900))

    // PHASE 3 — Escalation
    t.push(setTimeout(() => setPhase(3), 3200))

    t.push(setTimeout(() => {
      addAlert('🔴 FIREWALL LAYER 1.............. BYPASSED', 'critical')
    }, 3400))

    t.push(setTimeout(() => {
      addAlert('🔴 FIREWALL LAYER 2.............. BYPASSED', 'critical')
    }, 3800))

    t.push(setTimeout(() => {
      addAlert('🔴 IDS SIGNATURE................. UNKNOWN', 'critical')
    }, 4200))

    t.push(setTimeout(() => {
      addAlert('🔴 ENCRYPTION OVERRIDE........... COMPLETE', 'critical')
    }, 4600))

    t.push(setTimeout(() => {
      addAlert('🔴 ROOT ACCESS................... GRANTED', 'critical')
    }, 5000))

    t.push(setTimeout(() => {
      addAlert('', 'normal', false)
      addAlert('   OPERATOR: WHO ARE YOU?', 'warning', false)
    }, 5400))

    // PHASE 4 — Identity reveal
    t.push(setTimeout(() => {
      setPhase(4)
      setAlerts([])
    }, 6000))

    const identitySequence = [
      'I am Kurre Chaitanya.',
      '',
      'And I just owned your network',
      'in 3.4 seconds.',
    ]
    identitySequence.forEach((line, i) => {
      t.push(setTimeout(() => {
        setIdentityLines(prev => [...prev, line])
        if (line) playBeep(i === 0 ? 523 : 440, 0.1)
      }, 6200 + i * 600))
    })

    // PHASE 5 — Controlled demo
    t.push(setTimeout(() => {
      setPhase(5)
      setIdentityLines([])
    }, 9000))

    const demoSequence = [
      '> This was a controlled demonstration.',
      '> No actual systems were harmed.',
      '> No laws were violated.',
      '>',
      '> But now you know what I can do.',
      '>',
      '> Welcome to my portfolio.',
    ]
    demoSequence.forEach((line, i) => {
      t.push(setTimeout(() => {
        setDemoLines(prev => [...prev, line])
        if (line !== '>') playBeep(330, 0.05)
      }, 9200 + i * 400))
    })

    // CVE easter egg
    t.push(setTimeout(() => setCveVisible(true), 11500))

    // PHASE 6 — Exit
    t.push(setTimeout(() => {
      setExiting(true)
      setTimeout(onComplete, 800)
    }, 12500))

    return () => t.forEach(clearTimeout)
  }, [])

  // ── Color map ──────────────────────────────────────────────────
  const alertColor = (type: AlertLine['type']) => {
    if (type === 'critical') return '#ff3b3b'
    if (type === 'warning')  return '#ffdd00'
    if (type === 'success')  return '#00ff88'
    if (type === 'identity') return '#00ffff'
    if (type === 'dim')      return '#4a7a8a'
    return '#00ffff'
  }

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 z-[9999] font-mono overflow-hidden"
      style={{
        background: '#000',
        opacity: exiting ? 0 : 1,
        transition: exiting ? 'opacity 0.8s ease-in' : 'none',
      }}
    >

      {/* Scanline overlay — always present */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.015) 2px, rgba(0,255,255,0.015) 4px)',
        }}
      />

      {/* ── PHASE 1 — Corporate dashboard ── */}
      {phase === 1 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-full max-w-3xl px-8"
            style={{ color: '#4a7a8a' }}
          >
            {/* Header */}
            <div className="mb-8 border-b border-[#1a3a4a] pb-4">
              <div className="text-xs tracking-widest text-[#2a5a6a] mb-1">
                NEXUS CORP — INTERNAL NETWORK MONITOR v4.2.1
              </div>
              <div className="text-xs text-[#1a3a4a]">
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              </div>
            </div>

            {/* Stats */}
            {[
              ['NODES ONLINE',        '2,847'],
              ['FIREWALL STATUS',     'ACTIVE'],
              ['INTRUSION DETECTION', 'RUNNING'],
              ['ACTIVE THREATS',      '0'],
              ['LAST BREACH',         'NEVER'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm mb-3">
                <span className="text-[#2a5a6a] tracking-widest">{label}</span>
                <span className="text-[#3a7a5a]">{value}</span>
              </div>
            ))}

            <div className="mt-8 text-xs text-[#1a3a4a] tracking-widest">
              ALL SYSTEMS NOMINAL. ■
              <span className="animate-pulse ml-1">_</span>
            </div>
          </div>
        </div>
      )}

      {/* ── PHASE 2 & 3 — Alert feed ── */}
      {(phase === 2 || phase === 3) && (
        <div className="absolute inset-0 flex flex-col justify-center px-16">

          {/* Top bar */}
          <div
            className="text-xs tracking-widest mb-8 pb-4 border-b"
            style={{
              color: phase === 3 ? '#ff3b3b' : '#ffdd00',
              borderColor: phase === 3 ? '#ff3b3b44' : '#ffdd0044',
            }}
          >
            {phase === 2
              ? '⚠  NEXUS CORP — ANOMALY DETECTED'
              : '🔴 NEXUS CORP — ACTIVE BREACH IN PROGRESS'}
          </div>

          {/* Alert lines */}
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="text-sm tracking-wider"
                style={{
                  color: alertColor(alert.type),
                  textShadow: alert.type === 'critical'
                    ? '0 0 8px #ff3b3b'
                    : alert.type === 'warning'
                    ? '0 0 6px #ffdd00'
                    : 'none',
                }}
              >
                {alert.text}
              </div>
            ))}

            {/* Blinking cursor */}
            <div style={{ color: '#00ffff' }} className="animate-pulse">_</div>
          </div>

          {/* Breach progress bar — phase 3 only */}
          {phase === 3 && (
            <div className="mt-12">
              <div className="flex justify-between text-xs text-[#ff3b3b] mb-2 tracking-widest">
                <span>BREACH PROGRESS</span>
                <span className="animate-pulse">CRITICAL</span>
              </div>
              <div className="w-full h-px bg-[#1a0000]">
                <div
                  className="h-full"
                  style={{
                    background: '#ff3b3b',
                    boxShadow: '0 0 10px #ff3b3b',
                    width: '100%',
                    animation: 'expand 1.8s linear forwards',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── PHASE 4 — Identity reveal ── */}
      {phase === 4 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {identityLines.map((line, i) => (
              <div
                key={i}
                className="mb-2"
                style={{
                  color: i === 0 ? '#00ffff'
                       : i >= 2  ? '#ffffff'
                       : 'transparent',
                  fontSize: i === 0 ? '1.5rem'
                          : i >= 2  ? '2.5rem'
                          : '1rem',
                  fontWeight: i >= 2 ? 900 : 400,
                  textShadow: i === 0 ? '0 0 20px #00ffff'
                            : i >= 2  ? '0 0 30px #ffffff'
                            : 'none',
                  letterSpacing: i >= 2 ? '0.15em' : '0.05em',
                  opacity: identityLines.length > i ? 1 : 0,
                  transition: 'opacity 0.3s',
                }}
              >
                {line || '\u00A0'}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PHASE 5 — Controlled demo ── */}
      {phase === 5 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-xl w-full px-8">

            {/* Divider */}
            <div
              className="w-full h-px mb-8"
              style={{
                background: 'linear-gradient(to right, transparent, #00ffff44, transparent)',
              }}
            />

            {/* Demo lines */}
            <div className="space-y-2">
              {demoLines.map((line, i) => (
                <div
                  key={i}
                  className="text-sm tracking-wider"
                  style={{
                    color: line === '>'        ? 'transparent'
                         : i >= 4              ? '#00ffff'
                         : '#4a8a6a',
                    textShadow: i >= 4 ? '0 0 10px #00ffff' : 'none',
                  }}
                >
                  {line || '\u00A0'}
                </div>
              ))}

              {demoLines.length > 0 && (
                <span
                  className="animate-pulse text-sm"
                  style={{ color: '#00ffff' }}
                >
                  █
                </span>
              )}
            </div>

            <div
              className="w-full h-px mt-8"
              style={{
                background: 'linear-gradient(to right, transparent, #00ffff44, transparent)',
              }}
            />
          </div>
        </div>
      )}

      {/* ── CVE Easter Egg ── */}
      {cveVisible && (
        <div
          className="absolute bottom-4 right-6 text-[10px] tracking-widest"
          style={{
            color: '#1a3a4a',
            opacity: cveVisible ? 1 : 0,
            transition: 'opacity 1s',
          }}
        >
          CVE-2024-CHAITANYA: PATCH NOT AVAILABLE
        </div>
      )}

      {/* ── Corner brackets ── */}
      {[
        { top: 16,    left: 16,    borderTop: '1px solid #00ffff44',    borderLeft: '1px solid #00ffff44'    },
        { top: 16,    right: 16,   borderTop: '1px solid #00ffff44',    borderRight: '1px solid #00ffff44'   },
        { bottom: 16, left: 16,    borderBottom: '1px solid #00ffff44', borderLeft: '1px solid #00ffff44'    },
        { bottom: 16, right: 16,   borderBottom: '1px solid #00ffff44', borderRight: '1px solid #00ffff44'   },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute w-6 h-6"
          style={s as React.CSSProperties}
        />
      ))}

    </div>
  )
}