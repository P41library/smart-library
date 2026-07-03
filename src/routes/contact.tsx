import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/reveal";
import { MagneticButton } from "@/components/magnetic-button";
import { WHATSAPP_URL, PHONE_DISPLAY, EMAIL, ADDRESS } from "@/lib/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Libzy — Get in Touch" },
      { name: "description", content: "Reach the Libzy team. Questions about seats, memberships or visits? We're here to help." },
      { property: "og:title", content: "Contact Libzy" },
      { property: "og:description", content: "Get in touch with the Libzy study space team." },
    ],
  }),
  component: ContactPage,
});

const details = [
  { icon: Phone, label: "Phone", value: PHONE_DISPLAY },
  { icon: Mail, label: "Email", value: EMAIL },
  { icon: MapPin, label: "Address", value: ADDRESS },
  { icon: Clock, label: "Working Hours", value: "Open 24×7, all days" },
];


const faqs = [
  { q: "How do I reserve a seat?", a: "Head to the Seat Booking page, pick an available seat from the live map, fill in your details and confirm — it takes seconds." },
  { q: "Is Libzy really open 24×7?", a: "Yes. Members get round-the-clock secure access every day of the year, including holidays." },
  { q: "Can I cancel or change my booking?", a: "Absolutely. You can modify or cancel from your account up to 30 minutes before your slot starts." },
  { q: "Do you offer monthly passes?", a: "Yes, we offer hourly, daily and monthly passes. Choose your duration during booking." },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="px-5 pb-24 pt-32">
      <div className="mx-auto max-w-6xl">
        <Reveal type="blur" className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Contact</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Let's talk</h1>
          <p className="mt-4 text-muted-foreground">Have a question or want a tour? Send us a message and we'll respond within a day.</p>
        </Reveal>

        {/* Trust / value strip */}
        <Reveal type="up" className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "< 1 hr", label: "Avg. response" },
            { value: "10,000+", label: "Happy students" },
            { value: "24×7", label: "Support access" },
            { value: "4.9★", label: "Student rating" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center">
              <p className="text-2xl font-extrabold text-gradient">{s.value}</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </Reveal>



        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal type="left" className="glass rounded-[2rem] p-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Message sent! We'll get back to you soon.");
                setForm({ name: "", email: "", phone: "", message: "" });
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="lz-input" />
                <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="lz-input" />
              </div>
              <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="lz-input" />
              <textarea required rows={5} placeholder="Your message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="lz-input resize-none" />
              <MagneticButton type="submit" variant="primary" className="w-full">Send Message</MagneticButton>
            </form>
          </Reveal>

          <Reveal type="right" className="space-y-4">
            <div className="glass grid grid-cols-2 gap-4 rounded-[2rem] p-6">
              {details.map((d) => (
                <div key={d.label} className="rounded-2xl bg-secondary/50 p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                    <d.icon className="h-4 w-4" />
                  </span>
                  <p className="mt-3 text-xs font-medium text-muted-foreground">{d.label}</p>
                  <p className="text-sm font-semibold">{d.value}</p>
                </div>
              ))}
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="flex items-center justify-center gap-2 rounded-[2rem] bg-[#25D366] px-6 py-4 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-5 w-5" /> Chat with us on WhatsApp
            </a>
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-soft">
              <iframe
                title="Libzy location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.58%2C12.96%2C77.62%2C12.99&layer=mapnik"
                className="h-56 w-full grayscale-[0.2]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>

        {/* FAQ */}
        <Reveal type="blur" className="mt-20 text-center">
          <h2 className="text-3xl font-bold">Frequently asked questions</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} type="up">
              <div className="glass overflow-hidden rounded-2xl">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  data-cursor="hover"
                  className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold"
                >
                  {f.q}
                  <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-2xl text-primary">+</motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm text-muted-foreground">{f.a}</p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
