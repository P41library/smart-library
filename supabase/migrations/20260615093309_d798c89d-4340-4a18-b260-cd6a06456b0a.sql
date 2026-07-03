
-- SEATS TABLE
CREATE TABLE public.seats (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code text NOT NULL UNIQUE,
  row_label text NOT NULL,
  col_num int NOT NULL,
  floor text NOT NULL DEFAULT 'First Floor',
  status text NOT NULL DEFAULT 'available',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT seats_status_check CHECK (status IN ('available','booked','maintenance'))
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.seats TO authenticated;
GRANT ALL ON public.seats TO service_role;
ALTER TABLE public.seats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view seats" ON public.seats FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert seats" ON public.seats FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update seats" ON public.seats FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete seats" ON public.seats FOR DELETE TO authenticated USING (true);

-- BOOKINGS TABLE
CREATE TABLE public.bookings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seat_id uuid REFERENCES public.seats(id) ON DELETE SET NULL,
  seat_code text NOT NULL,
  full_name text NOT NULL,
  mobile text NOT NULL,
  start_date date,
  end_date date,
  amount numeric NOT NULL DEFAULT 0,
  payment_type text NOT NULL DEFAULT 'cash',
  status text NOT NULL DEFAULT 'active',
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT bookings_payment_type_check CHECK (payment_type IN ('cash','online')),
  CONSTRAINT bookings_status_check CHECK (status IN ('active','cancelled','completed'))
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view bookings" ON public.bookings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert bookings" ON public.bookings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update bookings" ON public.bookings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete bookings" ON public.bookings FOR DELETE TO authenticated USING (true);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_seats_updated_at BEFORE UPDATE ON public.seats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- SEED 100 seats: rows A-J, cols 1-10
INSERT INTO public.seats (code, row_label, col_num, floor, status)
SELECT
  r.label || lpad(c.num::text, 2, '0') AS code,
  r.label AS row_label,
  c.num AS col_num,
  'First Floor' AS floor,
  'available' AS status
FROM (VALUES ('A'),('B'),('C'),('D'),('E'),('F'),('G'),('H'),('I'),('J')) AS r(label)
CROSS JOIN generate_series(1,10) AS c(num);
