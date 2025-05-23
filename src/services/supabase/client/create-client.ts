import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API;

export const supabase = createClient(supabaseUrl, supabaseKey);
