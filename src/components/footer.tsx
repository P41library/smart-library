import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "./logo";
import { WHATSAPP_URL, PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS } from "@/lib/contact";

export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Premium study spaces designed for deep focus. Reserve your seat and study in a calm, productive environment.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>


        <div>
          <h4 className="text-sm font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {[
              { to: "/", l: "Home" },
              { to: "/about", l: "About" },
              { to: "/booking", l: "Seat Booking" },
              { to: "/gallery", l: "Gallery" },
              { to: "/contact", l: "Contact" },
            ].map((x) => (
              <li key={x.l}>
                <Link to={x.to} className="transition-colors hover:text-primary">
                  {x.l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Services</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {["AC Study Hall", "High Speed WiFi", "24x7 Access", "Power Backup", "CCTV Security"].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Stay in the loop</h4>
          <p className="mt-4 text-sm text-muted-foreground">Subscribe for seat availability & offers.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              toast.success("Subscribed! Welcome to Libzy.");
              setEmail("");
            }}
            className="mt-3 flex gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full rounded-full border border-border bg-secondary/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              data-cursor="hover"
              className="rounded-full bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Join
            </button>
          </form>
          <div className="mt-5 space-y-2 text-sm text-muted-foreground">
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 transition-colors hover:text-primary"><Phone className="h-4 w-4 text-primary" /> {PHONE_DISPLAY}</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-primary"><MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp us</a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 transition-colors hover:text-primary"><Mail className="h-4 w-4 text-primary" /> {EMAIL}</a>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {ADDRESS}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Libzy — Smart Library Management. Crafted for focused minds.
      </div>
    </footer>
  );
}
