import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  AirVent,
  ArrowRight,
  Armchair,
  Camera,
  Clock,
  Droplets,
  PlugZap,
  Quote,
  Star,
  Volume2,
  Wifi,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { MagneticButton } from "@/components/magnetic-button";
import { useEffect, useState } from "react";
import g1 from "@/assets/gallery-1.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const features = [
  { icon: AirVent, title: "AC Study Hall", desc: "Climate-controlled halls kept at the perfect focus temperature." },
  { icon: Wifi, title: "High Speed WiFi", desc: "Blazing fibre internet for research, classes and uploads." },
  { icon: Armchair, title: "Individual Seats", desc: "Ergonomic, partitioned desks designed for deep work." },
  { icon: PlugZap, title: "Power Backup", desc: "Every seat powered, with instant backup — never lose work." },
  { icon: Camera, title: "CCTV Security", desc: "24/7 monitored premises so your belongings stay safe." },
  { icon: Volume2, title: "Quiet Environment", desc: "Acoustically treated zones for absolute silence." },
  { icon: Droplets, title: "Drinking Water", desc: "Filtered RO water and refreshment corners on every floor." },
  { icon: Clock, title: "24x7 Access", desc: "Study on your schedule — open round the clock, every day." },
];

const counters = [
  { label: "Total Seats", to: 100, suffix: "" },
  { label: "Available Seats", to: 37, suffix: "" },
  { label: "Occupied Seats", to: 63, suffix: "" },
  { label: "Daily Visitors", to: 540, suffix: "+" },
];

const testimonials = [
  { name: "Ananya Sharma", role: "NEET Aspirant", text: "The quietest, cleanest study space I've found. Booking a seat takes seconds and I always get my favourite corner.", rating: 5 },
  { name: "Rahul Verma", role: "CA Final", text: "24x7 access changed my prep completely. The AC halls and fast WiFi make Libzy feel premium yet affordable.", rating: 5 },
  { name: "Sneha Patel", role: "UPSC Aspirant", text: "Loved the ambience and the focus. The seat-booking system is exactly like booking movie tickets — effortless.", rating: 5 },
  { name: "Karan Mehta", role: "GATE Aspirant", text: "Power backup at every desk saved me during long sessions. The team genuinely cares about students.", rating: 5 },
];

export function Features() {
  return (
    <section className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal type="blur" className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Why choose us</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Everything you need to focus</h2>
          <p className="mt-3 text-muted-foreground">Premium amenities crafted around one goal — your most productive study sessions.</p>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <motion.div
                whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
                className="glass group h-full rounded-3xl p-6 transition-shadow hover:shadow-glow"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

export function Occupancy() {
  return (
    <section className="relative px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal type="scale">
          <div className="glass relative overflow-hidden rounded-[2rem] p-10">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              {counters.map((c) => (
                <div key={c.label}>
                  <p className="text-4xl font-extrabold text-gradient sm:text-5xl">
                    <CountUp to={c.to} suffix={c.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative px-5 py-24">
      <div className="mx-auto max-w-4xl">
        <Reveal type="blur" className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Loved by students</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Stories from focused minds</h2>
        </Reveal>

        <div className="relative mt-12 h-64 sm:h-56">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={false}
              animate={{
                opacity: i === index ? 1 : 0,
                scale: i === index ? 1 : 0.94,
                y: i === index ? 0 : 16,
              }}
              transition={{ duration: 0.5 }}
              className={`glass absolute inset-0 rounded-3xl p-8 ${i === index ? "z-10" : "pointer-events-none z-0"}`}
            >
              <Quote className="h-8 w-8 text-primary/40" />
              <p className="mt-3 text-lg font-medium leading-relaxed">{t.text}</p>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              data-cursor="hover"
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-gradient-primary" : "w-2 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function GalleryPreview() {
  const imgs = [g1, g6, g5, g3];
  return (
    <section className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal type="blur" className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Gallery</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A glimpse inside Libzy</h2>
          </div>
          <Link to="/gallery" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {imgs.map((src, i) => (
            <StaggerItem key={i} type="scale" className={i === 0 ? "row-span-2" : ""}>
              <div className="group h-full overflow-hidden rounded-3xl">
                <img
                  src={src}
                  alt="Libzy study space"
                  loading="lazy"
                  className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i === 0 ? "min-h-[20rem]" : "aspect-[4/3]"}`}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

export function HomeCTA() {
  return (
    <section className="relative px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal type="scale">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-cta px-8 py-16 text-center text-primary-foreground shadow-glow sm:px-16">
            <div className="absolute -left-10 top-0 h-52 w-52 rounded-full bg-white/10 blur-3xl animate-float" />
            <div className="absolute -right-8 bottom-0 h-52 w-52 rounded-full bg-white/10 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
            <h2 className="relative text-3xl font-extrabold sm:text-5xl">Start Your Focus Journey Today</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base text-primary-foreground/80">
              Join thousands of students who study smarter at Libzy. Your perfect seat is one tap away.
            </p>
            <Link to="/booking" className="relative mt-8 inline-block">
              <MagneticButton variant="glass" className="bg-white/20 px-9 py-4 text-base text-primary-foreground hover:bg-white/30">
                Reserve Your Seat <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
