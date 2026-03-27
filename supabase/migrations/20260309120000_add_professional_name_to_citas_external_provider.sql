ALTER TABLE IF EXISTS public.citas_external_provider
ADD COLUMN IF NOT EXISTS professional_name TEXT;
