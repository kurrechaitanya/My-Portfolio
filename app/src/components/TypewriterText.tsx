import { useEffect, useState } from "react";

export default function TypewriterText({ lines }: { lines: string[] }) {
  const [displayed, setDisplayed] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const full = lines[lineIdx];

    if (charIdx < full.length) {
      const t = setTimeout(() => {
        setDisplayed(prev => prev + full[charIdx]);
        setCharIdx(c => c + 1);
      }, 45);
      return () => clearTimeout(t);
    }

    if (charIdx === full.length && lineIdx < lines.length - 1) {
      const t = setTimeout(() => {
        setDisplayed(prev => prev + '\n');
        setLineIdx(i => i + 1);
        setCharIdx(0);
      }, 400);
      return () => clearTimeout(t);
    }

    if (charIdx === full.length && lineIdx === lines.length - 1) {
      setDone(true);
    }
  }, [charIdx, lineIdx, done]);

  return (
    <p style={{
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: '14px',
      letterSpacing: '0.05em',
      color: '#c8d8e8',
      whiteSpace: 'pre',
      lineHeight: '1.6',
    }}>
      {displayed}
      <span style={{
        color: '#00d4ff',
        animation: 'blink 1s step-end infinite',
      }}>█</span>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </p>
  );
}