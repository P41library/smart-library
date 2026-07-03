import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/magnetic-button";
import { SEAT_PRICE } from "@/lib/seats";

interface BookingModalProps {
  open: boolean;
  seats: string[];
  onClose: () => void;
  onConfirmed: (seats: string[]) => void;
}

const durations = ["1 Hour", "Half Day (4h)", "Full Day (8h)", "Monthly Pass"];

export function BookingModal({ open, seats, onClose, onConfirmed }: BookingModalProps) {
  const [step, setStep] = useState<"form" | "loading" | "success">("form");
  const [form, setForm] = useState({ name: "", phone: "", email: "", duration: durations[1] });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setStep("form");
      setErrors({});
    }
  }, [open]);

  const fireConfetti = () => {
    const end = Date.now() + 800;
    const colors = ["#3b6fe0", "#73b8ff", "#1e3a8a", "#a5d8ff"];
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.4 }, colors });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name";
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) e.phone = "Enter a valid 10-digit phone";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStep("loading");
    setTimeout(() => {
      setStep("success");
      fireConfetti();
    }, 1300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative w-full max-w-md overflow-hidden rounded-3xl p-7"
          >
            <button
              onClick={onClose}
              data-cursor="hover"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-secondary/70 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            {step === "success" ? (
              <div className="py-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14 }}
                  className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500/15"
                >
                  <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                </motion.div>
                <h3 className="mt-5 text-2xl font-bold">Booking Confirmed!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Seat{seats.length > 1 ? "s" : ""}{" "}
                  <span className="font-semibold text-foreground">{seats.join(", ")}</span> reserved for {form.name.split(" ")[0]}.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">A confirmation has been sent to your email.</p>
                <MagneticButton
                  variant="primary"
                  className="mt-6 w-full"
                  onClick={() => onConfirmed(seats)}
                >
                  Done
                </MagneticButton>
              </div>
            ) : step === "loading" ? (
              <div className="grid place-items-center py-16">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="mt-4 text-sm text-muted-foreground">Securing your seat…</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold">Complete your booking</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Seat{seats.length > 1 ? "s" : ""}: <span className="font-semibold text-primary">{seats.join(", ")}</span>
                </p>

                <form onSubmit={submit} className="mt-5 space-y-3.5">
                  <Field label="Student Name" error={errors.name}>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="lz-input"
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Phone" error={errors.phone}>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="98765 43210"
                        className="lz-input"
                      />
                    </Field>
                    <Field label="Duration">
                      <select
                        value={form.duration}
                        onChange={(e) => setForm({ ...form, duration: e.target.value })}
                        className="lz-input"
                      >
                        {durations.map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Email" error={errors.email}>
                    <input
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@email.com"
                      className="lz-input"
                    />
                  </Field>

                  <div className="flex items-center justify-between rounded-2xl bg-secondary/60 px-4 py-3 text-sm">
                    <span className="text-muted-foreground">Estimated total</span>
                    <span className="text-lg font-bold text-gradient">₹{seats.length * SEAT_PRICE}</span>
                  </div>

                  <MagneticButton type="submit" variant="primary" className="w-full">
                    Proceed to Pay
                  </MagneticButton>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
