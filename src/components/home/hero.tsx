import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Armchair, ArrowRight, BookOpen, Clock, TrendingUp, Users } from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";
const floatingCards = [
  { icon: Armchair, label: "Available Seats", value: "37", tone: "from-emerald-400/30", pos: "left-[-2rem] top-10" },
  { icon: TrendingUp, label: "Today's Occupancy", value: "63%", tone: "from-sky/40", pos: "right-[-1rem] top-24" },
  { icon: Clock, label: "Study Hours", value: "24/7", tone: "from-cyan/40", pos: "left-2 bottom-12" },
  { icon: Users, label: "Active Students", value: "1,280", tone: "from-primary/30", pos: "right-2 bottom-4" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-32">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Live seats updating in real time
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Your Perfect <span className="text-gradient">Study Space</span> Awaits
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg"
          >
            Reserve your seat instantly and study in a peaceful, productive environment built for deep focus.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link to="/booking">
              <MagneticButton variant="primary" className="px-8 py-3.5 text-base">
                Book Seat <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
            <Link to="/gallery">
              <MagneticButton variant="glass" className="px-8 py-3.5 text-base">
                Explore Library
              </MagneticButton>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex items-center gap-6 text-sm text-muted-foreground"
          >
            <div>
              <p className="text-2xl font-bold text-foreground">100+</p>
              <p>Premium seats</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="text-2xl font-bold text-foreground">4.9★</p>
              <p>Student rating</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="text-2xl font-bold text-foreground">24/7</p>
              <p>Open access</p>
            </div>
          </motion.div>
        </div>

        {/* Right visual with floating glass cards */}
        <div className="relative mx-auto hidden h-[30rem] w-full max-w-md lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="absolute inset-8 rounded-[2rem] bg-gradient-primary opacity-20 blur-2xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="glass absolute inset-10 grid place-items-center rounded-[2rem]"
          >
            <div className="flex h-40 w-40 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-soft">
              <BookOpen className="h-20 w-20" />
            </div>
          </motion.div>

          {floatingCards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
              className={`glass absolute ${c.pos} flex items-center gap-3 rounded-2xl p-3 animate-float`}
              style={{ animationDelay: `${i * 0.8}s` }}
            >
              <span className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${c.tone} to-transparent`}>
                <c.icon className="h-4 w-4 text-primary" />
              </span>
              <div className="leading-tight">
                <p className="text-base font-bold">{c.value}</p>
                <p className="text-[11px] text-muted-foreground">{c.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
