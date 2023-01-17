import { createClient } from '@supabase/supabase-js'


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY
export const AUTH_TOKEN_KEY = 'quizrun-auth-token'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { storageKey: AUTH_TOKEN_KEY }
})