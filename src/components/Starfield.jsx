import { useMemo } from "react";

export default function Starfield() {
  const stars = useMemo(() =>
    Array.from({ length: 70 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 0.8,
      dur: `${Math.random() * 4 + 2}s`,
      del: `${Math.random() * 4}s`,
    })), []);

  return (
    <div className="starfield">
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          left: s.left, top: s.top,
          width: `${s.size}px`, height: `${s.size}px`,
          "--dur": s.dur, "--del": s.del,
        }} />
      ))}
      <div className="absolute rounded-full blur-3xl opacity-[0.07]"
        style={{ width: 550, height: 550, background: "radial-gradient(circle,#6366f1 0%,transparent 70%)", top: "8%", left: "-8%" }} />
      <div className="absolute rounded-full blur-3xl opacity-[0.06]"
        style={{ width: 450, height: 450, background: "radial-gradient(circle,#ec4899 0%,transparent 70%)", bottom: "5%", right: "-6%" }} />
      <div className="absolute rounded-full blur-3xl opacity-[0.04]"
        style={{ width: 350, height: 350, background: "radial-gradient(circle,#06b6d4 0%,transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
    </div>
  );
}
