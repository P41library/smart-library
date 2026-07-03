
-- Drop admin-scoped policies that depend on has_role
DROP POLICY IF EXISTS "Admins manage seats" ON public.seats;
DROP POLICY IF EXISTS "Admins manage bookings" ON public.bookings;

-- Drop exposed SECURITY DEFINER helpers
DROP FUNCTION IF EXISTS public.claim_admin();
DROP FUNCTION IF EXISTS public.admin_exists();
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- Recreate policies with an inline membership check (no exposed functions)
CREATE POLICY "Admins manage seats" ON public.seats
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE POLICY "Admins manage bookings" ON public.bookings
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
