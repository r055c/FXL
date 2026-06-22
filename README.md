# Samba Snackers FC — PWA

Same setup as Leon FC. Follow these steps:

## Step 1 — Supabase
Create a NEW Supabase project (separate from Leon FC) and run this SQL:

```sql
create table results (
  id bigint generated always as identity primary key,
  date text, opposition text,
  "homeScore" integer, "awayScore" integer,
  scorers text[], result text, competition text,
  motm text, "oppMotm" text, "oppLogo" text
);
create table teams (
  id bigint generated always as identity primary key,
  name text not null, logo text
);
create table fixtures (
  id bigint generated always as identity primary key,
  date text, "rawDate" text,
  opposition text, competition text, venue text, notes text
);
create table settings (
  id integer primary key default 1,
  team_name text default 'FC',
  competitions text[] default array['Sunday League']
);
insert into settings (id) values (1) on conflict do nothing;

alter table results enable row level security;
alter table teams enable row level security;
alter table fixtures enable row level security;
alter table settings enable row level security;
create policy "Public" on results for all using (true) with check (true);
create policy "Public" on teams for all using (true) with check (true);
create policy "Public" on fixtures for all using (true) with check (true);
create policy "Public" on settings for all using (true) with check (true);
```

## Step 2 — Add keys
Open `src/supabase.js` and add your Samba Snackers Supabase URL and anon key.

## Step 3 — Deploy to Netlify
Upload to a new GitHub repo called `samba-snackers-fc` and connect to Netlify.
You'll get a separate link e.g. `samba-snackers.netlify.app`

## Colour scheme
- Primary: #005c1f (dark green)
- Accent: #FFD700 (yellow)
- Highlight: #003087 (royal blue)
