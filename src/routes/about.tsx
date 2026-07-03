import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Compass, Flame, Gauge, MessageCircle, Sparkles, Target, TrendingUp } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { WHATSAPP_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import founderImg from "@/assets/founder.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Libzy — Spaces Built for Focus" },
      { name: "description", content: "Our mission, vision, values and journey building premium study spaces for students." },
      { property: "og:title", content: "About Libzy" },
      { property: "og:description", content: "Premium study spaces designed to help students focus and grow." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Gauge, title: "Discipline", desc: "Structure that turns intention into daily progress." },
  { icon: Target, title: "Focus", desc: "Distraction-free zones tuned for deep concentration." },
  { icon: TrendingUp, title: "Growth", desc: "Environments that help you level up consistently." },
  { icon: Flame, title: "Consistency", desc: "A space you return to, building unstoppable momentum." },
  { icon: Award, title: "Excellence", desc: "Premium standards in every detail, every day." },
];

const timeline = [
  { year: "2021", title: "The first seat", desc: "Libzy opened with 20 seats and a simple promise — peaceful focus." },
  { year: "2022", title: "100 seats & 24×7", desc: "Demand grew. We expanded to 100 ergonomic seats with round-the-clock access." },
  { year: "2023", title: "Smart booking", desc: "Launched real-time seat booking so students reserve in seconds." },
  { year: "2024", title: "10,000 students", desc: "Crossed ten thousand students achieving their goals at Libzy." },
];


function AboutPage() {
  return (
    <div className="px-5 pb-24 pt-32">
      <div className="mx-auto max-w-6xl">
        <Reveal type="blur" className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Our Story</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Spaces built for focused minds</h1>
          <p className="mt-4 text-muted-foreground">
            Libzy began with a belief: where you study shapes how you study. We craft calm, premium spaces so students can do their best work.
          </p>
        </Reveal>

        {/* Mission & Vision */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {[
            { icon: Sparkles, t: "Our Mission", d: "Provide a peaceful and productive study environment where every student can focus, free of distraction and discomfort." },
            { icon: Compass, t: "Our Vision", d: "Empower students everywhere with focused learning spaces that make ambitious goals feel achievable." },
          ].map((x, i) => (
            <Reveal key={x.t} type={i === 0 ? "left" : "right"}>
              <div className="glass h-full rounded-3xl p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
                  <x.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-2xl font-bold">{x.t}</h2>
                <p className="mt-3 text-muted-foreground">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Values */}
        <Reveal type="blur" className="mt-20 text-center">
          <h2 className="text-3xl font-bold">What we stand for</h2>
        </Reveal>
        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <motion.div whileHover={{ y: -6 }} className="glass h-full rounded-3xl p-6 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{v.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{v.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Timeline */}
        <Reveal type="blur" className="mt-20 text-center">
          <h2 className="text-3xl font-bold">Our journey</h2>
        </Reveal>
        <div className="relative mx-auto mt-12 max-w-3xl">
          <div className="absolute left-4 top-0 h-full w-px bg-border sm:left-1/2" />
          {timeline.map((t, i) => (
            <Reveal key={t.year} type={i % 2 === 0 ? "left" : "right"}>
              <div className={`relative mb-8 flex sm:w-1/2 ${i % 2 === 0 ? "sm:pr-8" : "sm:ml-auto sm:pl-8"}`}>
                <span className="absolute left-4 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-primary shadow-glow sm:left-0" style={{ left: i % 2 === 0 ? "auto" : "-0.375rem", right: i % 2 === 0 ? "-2.375rem" : "auto" }} />
                <div className="glass ml-10 rounded-2xl p-5 sm:ml-0">
                  <p className="text-sm font-bold text-primary">{t.year}</p>
                  <h3 className="mt-1 font-semibold">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Founder */}
        <Reveal type="blur" className="mt-20 text-center">
          <h2 className="text-3xl font-bold">Meet the founder</h2>
        </Reveal>
        <Reveal type="up" className="mx-auto mt-10 max-w-4xl">
          <div className="glass grid gap-8 rounded-[2rem] p-8 md:grid-cols-[280px_1fr] md:items-center">
            <div className="relative mx-auto w-full max-w-[280px]">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-primary opacity-20 blur-2xl" />
              <img
                src={founderImg}
                alt="Dave Darshan Kumar Tribhovanbhai, Founder of Libzy"
                loading="lazy"
                width={1024}
                height={1024}
                className="relative aspect-square w-full rounded-[1.75rem] object-cover object-top shadow-soft"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Founder</p>
              <h3 className="mt-2 text-2xl font-bold">Dave Darshan Kumar Tribhovanbhai</h3>
              <p className="mt-4 text-muted-foreground">
                Dave Darshan Kumar Tribhovanbhai is the founder of Libzy. With 5 years of experience observing library
                operations and student needs, he created Libzy to simplify library management, seat booking, and
                membership tracking through technology.
              </p>
              <p className="mt-3 text-muted-foreground">
                His vision is to give every student access to a calm, premium and reliable place to focus — backed by
                technology that makes booking a seat effortless.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a
                  href={`tel:${PHONE_TEL}`}
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

    </div>
  );
}
