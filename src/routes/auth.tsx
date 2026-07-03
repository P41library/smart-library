import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, EyeOff, BookOpen, Loader2 } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { MagneticButton } from "@/components/magnetic-button";
import { supabase } from "@/integrations/supabase/client";

const GENERIC_LOGIN_ERROR = "Unable to sign in. Please check your credentials and try again.";
const GENERIC_SIGNUP_ERROR = "Unable to create account. Please check your information and try again.";
const PASSWORD_REQUIREMENTS =
  "Password must be 8-128 characters and include uppercase, lowercase, number, and symbol.";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,128}$/;

function sanitizeInput(value: string, maxLength = 100) {
  return value.trim().replace(/<[^>]*>/g, "").slice(0, maxLength);
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function isValidEmail(value: string) {
  return emailRegex.test(value);
}

function isValidPassword(value: string) {
  return passwordRegex.test(value);
}

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Login or Sign Up — Libzy" },
      { name: "description", content: "Access your Libzy account to book and manage your study seats." },
      { property: "og:title", content: "Login or Sign Up — Libzy" },
      { property: "og:description", content: "Access your Libzy study account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const normalizedEmail = normalizeEmail(email);
    const sanitizedFullName = sanitizeInput(fullName, 80);
    const sanitizedPhone = sanitizeInput(phone, 20);

    if (!isValidEmail(normalizedEmail)) {
      toast.error(GENERIC_LOGIN_ERROR);
      setLoading(false);
      return;
    }

    if (!isValidPassword(password)) {
      toast.error(PASSWORD_REQUIREMENTS);
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }

      if (sanitizedFullName.length === 0) {
        toast.error("Please enter a valid name.");
        setLoading(false);
        return;
      }
    }

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (error) throw new Error(GENERIC_LOGIN_ERROR);

        toast.success("Welcome back to Libzy!");
        navigate({ to: "/" });
      } else {
        const { error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: {
              full_name: sanitizedFullName,
              phone: sanitizedPhone,
            },
          },
        });

        if (error) throw new Error(GENERIC_SIGNUP_ERROR);

        toast.success("Account created — welcome to Libzy!");
        navigate({ to: "/" });
      }
    } catch (error: any) {
      toast.error(error?.message || (mode === "login" ? GENERIC_LOGIN_ERROR : GENERIC_SIGNUP_ERROR));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 pb-20 pt-28">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2.5rem] shadow-glow lg:grid-cols-2">
        {/* Brand panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-cta p-10 text-primary-foreground lg:flex">
          <div className="absolute -right-10 top-10 h-52 w-52 rounded-full bg-white/10 blur-3xl animate-float" />
          <div className="absolute -left-8 bottom-10 h-52 w-52 rounded-full bg-white/10 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
            <BookOpen className="h-7 w-7" />
          </div>
          <div className="relative">
            <h2 className="text-3xl font-extrabold leading-tight">Your focus starts here.</h2>
            <p className="mt-3 max-w-xs text-primary-foreground/80">Book premium study seats, track your hours and study in peace — all in one place.</p>
            <ul className="mt-6 space-y-3">
              {[
                "Reserve a seat in under 30 seconds",
                "24×7 secure access to AC study halls",
                "High-speed WiFi & free unlimited refills",
                "Cancel or reschedule anytime, no fees",
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm text-primary-foreground/90">
                  <Check className="h-4 w-4 shrink-0 text-primary-foreground" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex items-center gap-4 text-sm text-primary-foreground/70">
            <div className="flex -space-x-2">
              {["A", "R", "S", "M"].map((i) => (
                <span key={i} className="grid h-8 w-8 place-items-center rounded-full border-2 border-white/40 bg-white/15 text-xs font-bold">
                  {i}
                </span>
              ))}
            </div>
            <span>Trusted by 10,000+ students</span>
          </div>
        </div>


        {/* Form panel */}
        <div className="glass p-8 sm:p-10">
          <div className="mb-6 flex gap-2 rounded-full bg-secondary/60 p-1">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                data-cursor="hover"
                className="relative flex-1 rounded-full py-2.5 text-sm font-semibold capitalize"
              >
                {mode === m && (
                  <motion.span layoutId="auth-tab" className="absolute inset-0 -z-10 rounded-full bg-gradient-primary" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <span className={mode === m ? "text-primary-foreground" : "text-muted-foreground"}>{m === "login" ? "Login" : "Sign Up"}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-3.5"
            >
              {mode === "signup" && (
                <input required placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={loading} className="lz-input" />
              )}
              <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} className="lz-input" />
              {mode === "signup" && (
                <input required placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={loading} className="lz-input" />
              )}
              <div className="relative">
                <input required type={show ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} className="lz-input pr-11" />
                <button type="button" onClick={() => setShow((s) => !s)} data-cursor="hover" disabled={loading} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground disabled:opacity-50">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {mode === "signup" && (
                <input required type={show ? "text" : "password"} placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} className="lz-input" />
              )}

              {mode === "login" && (
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <input type="checkbox" className="accent-primary" disabled={loading} /> Remember me
                  </label>
                  <a href="#" className="font-medium text-primary hover:underline">Forgot password?</a>
                </div>
              )}

              <MagneticButton type="submit" variant="primary" className="w-full relative overflow-hidden" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (mode === "login" ? "Login" : "Create Account")}
              </MagneticButton>
            </motion.form>
          </AnimatePresence>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or continue with <span className="h-px flex-1 bg-border" />
          </div>
          <button
            onClick={() => toast("Social login is a demo in this build")}
            data-cursor="hover"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-border bg-secondary/50 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"/></svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
