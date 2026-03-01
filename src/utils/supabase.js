import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// src/utils/supabase.js dosyasının en altı:
export const storageBaseUrl = `${supabaseUrl}/storage/v1/object/public/portfolio-images/`;
