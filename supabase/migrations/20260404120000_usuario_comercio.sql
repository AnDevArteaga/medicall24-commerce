-- Usuario de comercio (espejo Azure) + fuente de pago Wompi para prueba gratuita
CREATE TABLE IF NOT EXISTS public.usuario_comercio (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_usuario_medicall bigint NOT NULL,
  id_paciente bigint NOT NULL,
  email text,
  tipo_identificacion text,
  identificacion text,
  wompi_payment_source_id text,
  tarjeta_ultimos_4 char(4),
  wompi_payment_source_status text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT usuario_comercio_id_usuario_medicall_key UNIQUE (id_usuario_medicall),
  CONSTRAINT usuario_comercio_id_paciente_key UNIQUE (id_paciente)
);

CREATE INDEX IF NOT EXISTS idx_usuario_comercio_id_paciente
  ON public.usuario_comercio (id_paciente);

COMMENT ON TABLE public.usuario_comercio IS
  'Usuario autenticado en Azure + fuente de pago Wompi (prueba gratuita / cobro post-consulta).';

-- ID de cita en Medicall API (webhook cita completada)
ALTER TABLE IF EXISTS public.citas_external_provider
  ADD COLUMN IF NOT EXISTS id_cita_medicall bigint;

CREATE INDEX IF NOT EXISTS idx_citas_external_id_cita_medicall
  ON public.citas_external_provider (id_cita_medicall);
