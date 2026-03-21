-- Cron con pg_cron + pg_net: invocar check-pending-wompi cada 2 minutos
--
-- Requisitos:
-- 1. Habilitar extensiones en Dashboard: Database → Extensions → pg_cron, pg_net
-- 2. Guardar secretos en Vault (SQL Editor o Dashboard → Vault):
--      vault.create_secret('https://TU_PROJECT_REF.supabase.co', 'project_url');
--      vault.create_secret('TU_SERVICE_ROLE_KEY', 'service_role_key');
-- 3. Ejecutar esta migración

select cron.schedule(
  'check-pending-wompi-every-2-min',
  '*/2 * * * *',
  $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'project_url') || '/functions/v1/swift-action',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'service_role_key')
    ),
    body := '{}'::jsonb
  ) as request_id;
  $$
);
