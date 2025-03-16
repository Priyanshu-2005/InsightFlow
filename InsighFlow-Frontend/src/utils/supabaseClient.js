import { createClient } from "@supabase/supabase-js";
// require("dotenv").config();
import { configDotenv } from "dotenv";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_KEY;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("supabaseUrl or supabaseAnonKey is not defined");
}
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
