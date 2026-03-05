import { useMemo } from "react";

// ======= ANIMATED STARFIELD BACKGROUND =======
export default function Starfield() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: `${Math.random() * 4 + 2}s`,
      delay: `${Math.random() * 4}s`,
    }));
  }, []);

  return (
    <div className="starfield">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            "--duration": star.duration,
            "--delay": star.delay,
          }}
        />
      ))}
      {/* Nebula gradient blobs */}
      <div
        className="absolute rounded-full blur-3xl opacity-10"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, #6c3aed 0%, transparent 70%)",
          top: "10%",
          left: "-10%",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-10"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, #ff6bcd 0%, transparent 70%)",
          bottom: "5%",
          right: "-5%",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-5"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
