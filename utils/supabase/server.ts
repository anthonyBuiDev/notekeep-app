'use server';

import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';
import { Database } from '../types/database.types';

async function getSupabaseServer() {
  const { userId, getToken } = auth();
  if (!userId) throw new Error('User not authenticated');

  const accessToken = await getToken({ template: 'supabase' });

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );
}

export default getSupabaseServer;