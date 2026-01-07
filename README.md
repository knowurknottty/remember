# Remember (static + serverless)

Astro static site + Netlify Functions + Supabase.

## Local dev

```bash
npm i
npm run dev
```

## Netlify deploy

- Connect repo
- Build: `npm run build`
- Publish dir: `dist`
- Env vars:
  - SUPABASE_URL
  - SUPABASE_SERVICE_ROLE_KEY

## Supabase schema

Run in Supabase SQL editor:

```sql
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  category text not null,
  setup text not null,
  duration_seconds int,
  score numeric,
  vars jsonb,
  notes text,
  email text
);

create index if not exists sessions_created_at_idx on public.sessions(created_at desc);
create index if not exists sessions_category_idx on public.sessions(category);
```

Note: This demo uses the Service Role key inside serverless functions.
Add anti-spam + auth before going viral.