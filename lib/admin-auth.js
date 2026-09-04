import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * The dashboard never trusts a browser-supplied email. A magic-link session is
 * verified by Supabase on the server, then compared with the one owner address
 * configured privately in ADMIN_EMAIL.
 */
export async function requireOwner(request) {
  if (!supabaseAdmin) return { error:"The private database is not connected.", status:503 };
  const owner = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!owner) return { error:"Owner access is not configured yet.", status:503 };
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return { error:"Please sign in to the owner dashboard.", status:401 };
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  const email = data?.user?.email?.toLowerCase();
  if (error || !email) return { error:"Your dashboard session has expired.", status:401 };
  if (email !== owner) return { error:"This account is not allowed to edit the studio site.", status:403 };
  return { user:data.user };
}
