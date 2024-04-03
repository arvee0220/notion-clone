import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Please add Supabase URL and API key');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
