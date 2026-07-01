import { createClient } from '@supabase/supabase-js';
import { supabaseSimulator } from './supabaseSimulator';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isRealSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseAnonKey.startsWith('eyJ'));
};

export const supabase = isRealSupabaseConfigured()
  ? createClient(
      supabaseUrl || 'https://placeholder.supabase.co',
      supabaseAnonKey || 'placeholder-anon-key'
    )
  : supabaseSimulator;

if (supabase === supabaseSimulator) {
  console.log("[Supabase] Configuration is not active or is invalid. Falling back to local storage simulator.");
}
