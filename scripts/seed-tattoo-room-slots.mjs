import nextEnv from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { ensureTattooRoomSlots } from "../lib/tattoo-room-schedule.js";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Supabase server credentials are required.");
}
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
console.log(`Created or retained ${await ensureTattooRoomSlots(supabase)} tattoo-room hourly slots.`);
