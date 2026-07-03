export type SeatStatus = "available" | "booked" | "reserved" | "selected";

export interface Seat {
  id: string;
  row: string;
  col: number;
  status: SeatStatus;
}

export const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
export const COLS = 10;
export const MAX_SELECT = 4;
export const SEAT_PRICE = 49; // per hour, optional



export function buildSeats(): Seat[] {
  const seats: Seat[] = [];
  ROWS.forEach((row) => {
    for (let c = 1; c <= COLS; c++) {
      // Every seat starts available.
      seats.push({ id: `${row}${c}`, row, col: c, status: "available" });
    }
  });
  return seats;
}

export const STATUS_META: Record<SeatStatus, { label: string; dot: string; cell: string }> = {
  available: {
    label: "Available",
    dot: "bg-emerald-500",
    cell: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30",
  },
  booked: {
    label: "Booked",
    dot: "bg-rose-500",
    cell: "bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/40 cursor-not-allowed opacity-70",
  },
  reserved: {
    label: "Reserved",
    dot: "bg-amber-500",
    cell: "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40 cursor-not-allowed opacity-70",
  },
  selected: {
    label: "Selected",
    dot: "bg-primary",
    cell: "bg-gradient-primary text-primary-foreground border-transparent shadow-glow",
  },
};
