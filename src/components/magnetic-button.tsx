import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ComponentPropsWithoutRef, useRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "glass" | "outline" | "navy";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow",
  navy: "bg-navy text-background shadow-soft hover:shadow-glow",
  glass: "glass text-foreground hover:bg-card/60",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-secondary",
};

interface MagneticButtonProps extends ComponentPropsWithoutRef<typeof motion.button> {
  variant?: Variant;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  strength = 0.4,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });
  const tx = useTransform(sx, (v) => v);
  const ty = useTransform(sy, (v) => v);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      data-cursor="hover"
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: tx, y: ty }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
