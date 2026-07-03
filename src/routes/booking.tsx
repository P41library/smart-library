import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Armchair, Info, Ticket } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/reveal";
import { MagneticButton } from "@/components/magnetic-button";
import { BookingModal } from "@/components/booking/booking-modal";
import {
  buildSeats,
  COLS,
  MAX_SELECT,
  ROWS,
  SEAT_PRICE,
  STATUS_META,
  type Seat,
} from "@/lib/seats";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Study Seat — Libzy" },
      { name: "description", content: "Pick your seat from our live 100-seat study hall map and reserve instantly." },
      { property: "og:title", content: "Book a Study Seat — Libzy" },
      { property: "og:description", content: "Choose and reserve your study seat in seconds." },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  const [seats, setSeats] = useState<Seat[]>(() => buildSeats());
  const [selected, setSelected] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const selectedSeats = useMemo(() => selected, [selected]);

  const toggle = (seat: Seat) => {
    if (seat.status === "booked" || seat.status === "reserved") return;
    setSelected((prev) => {
      if (prev.includes(seat.id)) return prev.filter((s) => s !== seat.id);
      if (prev.length >= MAX_SELECT) {
        toast.error(`You can select up to ${MAX_SELECT} seats at a time`);
        return prev;
      }
      return [...prev, seat.id];
    });
  };

  const confirm = (ids: string[]) => {
    setSeats((prev) => prev.map((s) => (ids.includes(s.id) ? { ...s, status: "booked" } : s)));
    setSelected([]);
    setModalOpen(false);
    toast.success("Seat booked successfully!");
  };

  return (
    <div className="px-5 pb-24 pt-32">
      <div className="mx-auto max-w-6xl">
        <Reveal type="blur" className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Seat Booking</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Choose your perfect seat</h1>
          <p className="mt-3 text-muted-foreground">Tap an available seat on the map. Select up to {MAX_SELECT} seats.</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          {/* Seat map */}
          <Reveal type="scale" className="glass rounded-[2rem] p-6 sm:p-8">
            <div className="mx-auto mb-6 w-full rounded-full bg-gradient-primary py-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground shadow-glow">
              Entrance / Reception
            </div>

            <div className="overflow-x-auto">
              <div className="mx-auto w-max">
                {/* Column numbers */}
                <div className="mb-2 flex gap-1.5 pl-7">
                  {Array.from({ length: COLS }).map((_, c) => (
                    <span key={c} className="grid h-7 w-7 place-items-center text-[11px] font-medium text-muted-foreground sm:h-8 sm:w-8">
                      {c + 1}
                    </span>
                  ))}
                </div>

                {ROWS.map((row) => (
                  <div key={row} className="mb-1.5 flex items-center gap-1.5">
                    <span className="w-5 text-center text-xs font-semibold text-muted-foreground">{row}</span>
                    {Array.from({ length: COLS }).map((_, c) => {
                      const seat = seats.find((s) => s.row === row && s.col === c + 1)!;
                      const isSel = selectedSeats.includes(seat.id);
                      const status = isSel ? "selected" : seat.status;
                      const meta = STATUS_META[status];
                      const clickable = seat.status === "available" || isSel;
                      return (
                        <motion.button
                          key={seat.id}
                          onClick={() => toggle(seat)}
                          whileHover={clickable ? { scale: 1.18, y: -2 } : {}}
                          whileTap={clickable ? { scale: 0.9 } : {}}
                          data-cursor="hover"
                          title={`Seat ${seat.id} — ${meta.label}`}
                          className={`lz-seat h-8 w-8 border text-[8px] font-semibold sm:h-9 sm:w-9 sm:text-[9px] ${meta.cell}`}
                        >
                          {seat.id}
                        </motion.button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
              {(["available", "selected", "booked", "reserved"] as const).map((s) => (
                <span key={s} className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full ${STATUS_META[s].dot}`} />
                  {STATUS_META[s].label}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Summary sidebar */}
          <Reveal type="right" className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass rounded-[2rem] p-6">
              <div className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">Booking Summary</h2>
              </div>

              {selected.length === 0 ? (
                <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-border py-10 text-center">
                  <Armchair className="h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">No seats selected yet</p>
                </div>
              ) : (
                <div className="mt-5 space-y-2">
                  {selected.map((id) => (
                    <div key={id} className="flex items-center justify-between rounded-xl bg-secondary/60 px-4 py-2.5 text-sm">
                      <span className="font-semibold">Seat {id}</span>
                      <span className="text-muted-foreground">₹{SEAT_PRICE}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Timing</span>
                  <span className="text-foreground">Open 24×7</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Seats</span>
                  <span className="text-foreground">{selected.length} / {MAX_SELECT}</span>
                </div>
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-gradient">₹{selected.length * SEAT_PRICE}</span>
                </div>
              </div>

              <MagneticButton
                variant="primary"
                className="mt-5 w-full disabled:opacity-50"
                disabled={selected.length === 0}
                onClick={() => setModalOpen(true)}
              >
                Reserve {selected.length > 0 ? `${selected.length} Seat${selected.length > 1 ? "s" : ""}` : "Seat"}
              </MagneticButton>

              <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Selected seats are held while you complete booking. Pricing shown per hour.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <BookingModal open={modalOpen} seats={selected} onClose={() => setModalOpen(false)} onConfirmed={confirm} />
    </div>
  );
}
