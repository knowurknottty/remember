import { createClient } from "@supabase/supabase-js";

export const config = {
  path: "/api/log-session"
};

const json = (statusCode, body) =>
  new Response(JSON.stringify(body), {
    status: statusCode,
    headers: { "content-type": "application/json" }
  });

export default async (req) => {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return json(500, { error: "Missing Supabase env vars" });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  let payload;
  try { payload = await req.json(); }
  catch { return json(400, { error: "Invalid JSON" }); }

  const row = {
    category: payload.category ?? null,
    setup: payload.setup ?? null,
    duration_seconds: Number.isFinite(payload.duration_seconds) ? payload.duration_seconds : null,
    score: Number.isFinite(payload.score) ? payload.score : null,
    vars: payload.vars ?? null,
    notes: payload.notes ?? null,
    email: payload.email ?? null
  };

  if (!row.category || !row.setup) return json(400, { error: "category and setup are required" });

  const { data, error } = await supabase.from("sessions").insert(row).select().maybeSingle();
  if (error) return json(400, { error: error.message });

  return json(200, { ok: true, session: data });
};