-- Migración: Gestión de Pago a Gestores Comerciales
-- Ejecutar en el SQL Editor de Supabase (Dashboard)

-- 1. Tabla ordenes_pago_gestores
CREATE TABLE IF NOT EXISTS ordenes_pago_gestores (
  id BIGSERIAL PRIMARY KEY,
  numero_orden INTEGER NOT NULL,
  id_gestor BIGINT NOT NULL REFERENCES gestor_comercial(id_gestor),
  total_orden NUMERIC(18, 2) NOT NULL DEFAULT 0,
  fecha_generacion TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  comentarios TEXT,
  -- Snapshot bancario (histórico)
  banco_nombre TEXT,
  tipo_cuenta TEXT,
  numero_cuenta TEXT,
  titular_cuenta TEXT,
  nit_titular TEXT,
  estado TEXT NOT NULL DEFAULT 'GENERADA',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices útiles
CREATE INDEX IF NOT EXISTS idx_ordenes_pago_gestor ON ordenes_pago_gestores(id_gestor);
CREATE INDEX IF NOT EXISTS idx_ordenes_pago_numero ON ordenes_pago_gestores(numero_orden);
CREATE UNIQUE INDEX IF NOT EXISTS idx_ordenes_pago_numero_orden ON ordenes_pago_gestores(numero_orden);

-- 2. Agregar columna id_orden_pago a registro_compra (nullable FK)
ALTER TABLE registro_compra
  ADD COLUMN IF NOT EXISTS id_orden_pago BIGINT NULL REFERENCES ordenes_pago_gestores(id);

CREATE INDEX IF NOT EXISTS idx_registro_compra_id_orden_pago ON registro_compra(id_orden_pago);

-- 3. RLS (opcional): habilitar políticas según tu seguridad
-- ALTER TABLE ordenes_pago_gestores ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE registro_compra ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE ordenes_pago_gestores IS 'Órdenes de pago agrupadas por gestor comercial';
COMMENT ON COLUMN registro_compra.id_orden_pago IS 'FK a ordenes_pago_gestores cuando la compra ya fue incluida en una orden de pago';
