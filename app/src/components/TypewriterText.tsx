import { useEffect, useState } from "react";

export default function TypewriterText({ lines }: { lines: string[] }) {
  const [displayed, setDisplayed] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const full = lines[lineIdx];
    if (charIdx < full.length) {
      const t = setTimeout(() => {
        setDisplayed((prev) => prev + full[charIdx]);
        setCharIdx((c) => c + 1);
      }, 45);
      return () => clearTimeout(t);
    } else if (lineIdx < lines.length - 1) {
      const t = setTimeout(() => {
        setDisplayed((prev) => prev + "\n");
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [charIdx, lineIdx]);

  return (
    <p className="text-cyan-300 tracking-widest whitespace-pre font-mono text-sm">
      {displayed}
      <span className="animate-pulse text-cyan-400">█</span>
    </p>
  );
}