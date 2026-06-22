// src/supabase.js
// Replace these two values with your own from https://supabase.com
// Project Settings → API → Project URL and anon/public key

export const SUPABASE_URL = "https://fboroiqklryquxbwuyip.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZib3JvaXFrbHJ5cXV4Ynd1eWlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMjM0MzAsImV4cCI6MjA5NzY5OTQzMH0.UMChfFZn3HMbeUdQQK20Dv1RgmmIcm6QK5yxbuhF5ow";

const headers = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_ANON_KEY,
  "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
  "Prefer": "return=representation",
};

const base = () => `${SUPABASE_URL}/rest/v1`;

// ── Results ──────────────────────────────────────────────
export async function fetchResults() {
  const res = await fetch(`${base()}/results?order=date.desc`, { headers });
  if (!res.ok) throw new Error("Failed to fetch results");
  return res.json();
}

export async function insertResult(result) {
  const { id, ...data } = result;
  const res = await fetch(`${base()}/results`, {
    method: "POST", headers, body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to insert result");
  const rows = await res.json();
  return rows[0];
}

export async function updateResult(result) {
  const { id, ...data } = result;
  const res = await fetch(`${base()}/results?id=eq.${id}`, {
    method: "PATCH", headers, body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update result");
  const rows = await res.json();
  return rows[0];
}

export async function deleteResult(id) {
  const res = await fetch(`${base()}/results?id=eq.${id}`, {
    method: "DELETE", headers,
  });
  if (!res.ok) throw new Error("Failed to delete result");
}

// ── Teams ─────────────────────────────────────────────────
export async function fetchTeams() {
  const res = await fetch(`${base()}/teams?order=name.asc`, { headers });
  if (!res.ok) throw new Error("Failed to fetch teams");
  return res.json();
}

export async function insertTeam(team) {
  const { id, ...data } = team;
  const res = await fetch(`${base()}/teams`, {
    method: "POST", headers, body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to insert team");
  const rows = await res.json();
  return rows[0];
}

export async function updateTeam(team) {
  const { id, ...data } = team;
  const res = await fetch(`${base()}/teams?id=eq.${id}`, {
    method: "PATCH", headers, body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update team");
  const rows = await res.json();
  return rows[0];
}

export async function deleteTeam(id) {
  const res = await fetch(`${base()}/teams?id=eq.${id}`, {
    method: "DELETE", headers,
  });
  if (!res.ok) throw new Error("Failed to delete team");
}

// ── Fixtures ──────────────────────────────────────────────
export async function fetchFixtures() {
  const res = await fetch(`${base()}/fixtures?order=date.asc`, { headers });
  if (!res.ok) throw new Error("Failed to fetch fixtures");
  return res.json();
}

export async function insertFixture(fixture) {
  const { id, ...data } = fixture;
  const res = await fetch(`${base()}/fixtures`, {
    method: "POST", headers, body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to insert fixture");
  const rows = await res.json();
  return rows[0];
}

export async function updateFixture(fixture) {
  const { id, ...data } = fixture;
  const res = await fetch(`${base()}/fixtures?id=eq.${id}`, {
    method: "PATCH", headers, body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update fixture");
  const rows = await res.json();
  return rows[0];
}

export async function deleteFixture(id) {
  const res = await fetch(`${base()}/fixtures?id=eq.${id}`, {
    method: "DELETE", headers,
  });
  if (!res.ok) throw new Error("Failed to delete fixture");
}

// ── Settings ──────────────────────────────────────────────
export async function fetchSettings() {
  const res = await fetch(`${base()}/settings?id=eq.1`, { headers });
  if (!res.ok) throw new Error("Failed to fetch settings");
  const rows = await res.json();
  return rows[0] || null;
}

export async function upsertSettings(data) {
  const res = await fetch(`${base()}/settings?id=eq.1`, {
    method: "PATCH",
    headers: { ...headers, "Prefer": "return=representation,resolution=merge-duplicates" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save settings");
}
