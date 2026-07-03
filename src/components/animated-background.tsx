import { useEffect, useRef } from "react";

/**
 * Dynamic animated background: glowing blue blobs, a subtle gradient mesh,
 * and a lightweight floating-particles canvas. GPU/idle friendly.
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const count = Math.min(60, Math.floor(window.innerWidth / 24));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      a: Math.random() * 0.4 + 0.15,
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth * devicePixelRatio;
      h = canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const dark = document.documentElement.classList.contains("dark");
      const color = dark ? "120, 170, 255" : "70, 110, 240";
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.a})`;
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute -left-32 top-[-10%] h-[42rem] w-[42rem] rounded-full bg-primary/20 blur-3xl animate-blob" />
      <div className="absolute right-[-15%] top-1/3 h-[38rem] w-[38rem] rounded-full bg-sky/25 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
      <div className="absolute bottom-[-20%] left-1/3 h-[34rem] w-[34rem] rounded-full bg-cyan/20 blur-3xl animate-blob" style={{ animationDelay: "-12s" }} />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />
    </div>
  );
}
