// src/lib/auth-client.ts - Client-side Authentication
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Client-side auth - browser'da çalışır
export const createClient = () => createClientComponentClient()