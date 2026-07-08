// root/js/services/supabaseClient.js

// CONFIG SUPABASE: Bersih dari sub-rute internal
const SUPABASE_URL = "https://iqvkcevgspvrmiyxoqpd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdmtjZXZnc3B2cm1peXhvcXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MjAzMTcsImV4cCI6MjA5ODk5NjMxN30.DkJuryUJhqpwq_hsfY0BpDnyELv-8ZeduU37BA1LuiQ";

// Memanfaatkan library global dari CDN (@supabase/supabase-js)
if (!window.supabase) {
    console.error("Supabase CDN belum dimuat! Pastikan script tag CDN diletakkan sebelum file ini.");
}

export const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
