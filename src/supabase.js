// src/supabase.js
export const SUPABASE_URL = "https://fboroiqklryquxbwuyip.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZib3JvaXFrbHJ5cXV4Ynd1eWlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMjM0MzAsImV4cCI6MjA5NzY5OTQzMH0.UMChfFZn3HMbeUdQQK20Dv1RgmmIcm6QK5yxbuhF5ow";

const headers = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_ANON_KEY,
  "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
  "Prefer": "return=representation",
};
const base = () => `${SUPABASE_URL}/rest/v1`;

export async function fetchResults() {
  const res = await fetch(`${base()}/results?order=date.desc`, { headers });
  if (!res.ok) throw new Error("Failed to fetch results");
  return res.json();
}
export async function insertResult(result) {
  const { id, ...data } = result;
  const res = await fetch(`${base()}/results`, { method: "POST", headers, body: JSON.stringify(data) });
  if (!res.ok) throw new Error("Failed to insert result");
  return (await res.json())[0];
}
export async function updateResult(result) {
  const { id, ...data } = result;
  const res = await fetch(`${base()}/results?id=eq.${id}`, { method: "PATCH", headers, body: JSON.stringify(data) });
  if (!res.ok) throw new Error("Failed to update result");
  return (await res.json())[0];
}
export async function deleteResult(id) {
  const res = await fetch(`${base()}/results?id=eq.${id}`, { method: "DELETE", headers });
  if (!res.ok) throw new Error("Failed to delete result");
}

export async function fetchTeams() {
  const res = await fetch(`${base()}/teams?order=name.asc`, { headers });
  if (!res.ok) throw new Error("Failed to fetch teams");
  return res.json();
}
export async function insertTeam(team) {
  const { id, ...data } = team;
  const res = await fetch(`${base()}/teams`, { method: "POST", headers, body: JSON.stringify(data) });
  if (!res.ok) throw new Error("Failed to insert team");
  return (await res.json())[0];
}
export async function updateTeam(team) {
  const { id, ...data } = team;
  const res = await fetch(`${base()}/teams?id=eq.${id}`, { method: "PATCH", headers, body: JSON.stringify(data) });
  if (!res.ok) throw new Error("Failed to update team");
  return (await res.json())[0];
}
export async function deleteTeam(id) {
  const res = await fetch(`${base()}/teams?id=eq.${id}`, { method: "DELETE", headers });
  if (!res.ok) throw new Error("Failed to delete team");
}

export async function fetchFixtures() {
  const res = await fetch(`${base()}/fixtures?order=date.asc`, { headers });
  if (!res.ok) throw new Error("Failed to fetch fixtures");
  return res.json();
}
export async function insertFixture(fixture) {
  const { id, ...data } = fixture;
  const res = await fetch(`${base()}/fixtures`, { method: "POST", headers, body: JSON.stringify(data) });
  if (!res.ok) throw new Error("Failed to insert fixture");
  return (await res.json())[0];
}
export async function updateFixture(fixture) {
  const { id, ...data } = fixture;
  const res = await fetch(`${base()}/fixtures?id=eq.${id}`, { method: "PATCH", headers, body: JSON.stringify(data) });
  if (!res.ok) throw new Error("Failed to update fixture");
  return (await res.json())[0];
}
export async function deleteFixture(id) {
  const res = await fetch(`${base()}/fixtures?id=eq.${id}`, { method: "DELETE", headers });
  if (!res.ok) throw new Error("Failed to delete fixture");
}

export async function fetchSettings() {
  const res = await fetch(`${base()}/settings?id=eq.1`, { headers });
  if (!res.ok) throw new Error("Failed to fetch settings");
  return (await res.json())[0] || null;
}
export async function upsertSettings(data) {
  const res = await fetch(`${base()}/settings?id=eq.1`, {
    method: "PATCH",
    headers: { ...headers, "Prefer": "return=representation,resolution=merge-duplicates" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save settings");
}

export async function fetchSeasons() {
  const res = await fetch(`${base()}/seasons?order=id.desc`, { headers });
  if (!res.ok) throw new Error("Failed to fetch seasons");
  return res.json();
}
export async function insertSeason(season) {
  const { id, ...data } = season;
  const res = await fetch(`${base()}/seasons`, { method: "POST", headers, body: JSON.stringify(data) });
  if (!res.ok) throw new Error("Failed to insert season");
  return (await res.json())[0];
}
export async function updateSeason(season) {
  const { id, ...data } = season;
  const res = await fetch(`${base()}/seasons?id=eq.${id}`, { method: "PATCH", headers, body: JSON.stringify(data) });
  if (!res.ok) throw new Error("Failed to update season");
  return (await res.json())[0];
}
export async function setActiveSeason(id) {
  await fetch(`${base()}/seasons`, { method: "PATCH", headers, body: JSON.stringify({ is_active: false }) });
  const res = await fetch(`${base()}/seasons?id=eq.${id}`, { method: "PATCH", headers, body: JSON.stringify({ is_active: true }) });
  if (!res.ok) throw new Error("Failed to set active season");
}

export async function fetchPlayers() {
  const res = await fetch(`${base()}/players?order=squad_number.asc`, { headers });
  if (!res.ok) throw new Error("Failed to fetch players");
  return res.json();
}
export async function insertPlayer(player) {
  const { id, ...data } = player;
  const res = await fetch(`${base()}/players`, { method: "POST", headers, body: JSON.stringify(data) });
  if (!res.ok) throw new Error("Failed to insert player");
  return (await res.json())[0];
}
export async function updatePlayer(player) {
  const { id, ...data } = player;
  const res = await fetch(`${base()}/players?id=eq.${id}`, { method: "PATCH", headers, body: JSON.stringify(data) });
  if (!res.ok) throw new Error("Failed to update player");
  return (await res.json())[0];
}
export async function deletePlayer(id) {
  const res = await fetch(`${base()}/players?id=eq.${id}`, { method: "DELETE", headers });
  if (!res.ok) throw new Error("Failed to delete player");
}

export async function fetchAppearances() {
  const res = await fetch(`${base()}/appearances?order=id.desc`, { headers });
  if (!res.ok) throw new Error("Failed to fetch appearances");
  return res.json();
}
export async function insertAppearances(records) {
  const res = await fetch(`${base()}/appearances`, { method: "POST", headers, body: JSON.stringify(records) });
  if (!res.ok) throw new Error("Failed to insert appearances");
  return res.json();
}
export async function deleteAppearancesByResult(resultId) {
  const res = await fetch(`${base()}/appearances?result_id=eq.${resultId}`, { method: "DELETE", headers });
  if (!res.ok) throw new Error("Failed to delete appearances");
}

// ── Storage: images (team logos) ─────────────────────────
// Phone photos can be several MB, so shrink to max 400px before upload.
// Clears a plain background touching the edges (white, or one solid colour in all four corners),
// keeping anything inside the badge, then trims the empty margins. Returns the original if it looks wrong.
function removeBackground(canvas) {
  try {
    const w = canvas.width, h = canvas.height, ctx = canvas.getContext("2d");
    const im = ctx.getImageData(0, 0, w, h), px = im.data;
    const at = (x, y) => { const i = (y * w + x) * 4; return [px[i], px[i + 1], px[i + 2], px[i + 3]]; };
    const cs = [at(1, 1), at(w - 2, 1), at(1, h - 2), at(w - 2, h - 2)], k = cs[0];
    const near = (p, q, t) => Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) + Math.abs(p[2] - q[2]) < t;
    const solid = cs.every(p => p[3] > 200 && near(p, k, 30)) ? k : null;
    const bg = n => { const i = n * 4, p = [px[i], px[i + 1], px[i + 2]];
      return px[i + 3] < 20 || (p[0] > 228 && p[1] > 228 && p[2] > 228) || (solid && near(p, solid, 60)); };
    const seen = new Uint8Array(w * h), st = [];
    const push = (x, y) => { if (x < 0 || y < 0 || x >= w || y >= h) return; const n = y * w + x; if (seen[n] || !bg(n)) return; seen[n] = 1; st.push(n); };
    for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
    for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
    let cleared = 0;
    while (st.length) { const n = st.pop(), x = n % w, y = (n - x) / w; px[n * 4 + 3] = 0; cleared++; push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1); }
    if (cleared < w * h * 0.01 || cleared > w * h * 0.9) return canvas;
    // Soften the cut edge by one pixel so it doesn't look jagged.
    for (let n = 0; n < w * h; n++) {
      if (seen[n]) continue;
      const x = n % w, y = (n - x) / w;
      if ((x > 0 && seen[n - 1]) || (x < w - 1 && seen[n + 1]) || (y > 0 && seen[n - w]) || (y < h - 1 && seen[n + w])) px[n * 4 + 3] = Math.min(px[n * 4 + 3], 140);
    }
    ctx.putImageData(im, 0, 0);
    let x0 = w, y0 = h, x1 = 0, y1 = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (px[(y * w + x) * 4 + 3] > 20) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    if (x1 <= x0 || y1 <= y0) return canvas;
    const out = document.createElement("canvas");
    out.width = x1 - x0 + 1; out.height = y1 - y0 + 1;
    out.getContext("2d").drawImage(canvas, x0, y0, out.width, out.height, 0, 0, out.width, out.height);
    return out;
  } catch (e) { return canvas; }
}

async function resizeImage(file, max = 400, cutout = false) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = url;
    });
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    const out = cutout ? removeBackground(canvas) : canvas;
    return await new Promise(resolve => out.toBlob(resolve, "image/png"));
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function uploadImage(file, bucket = "logos", { cutout = bucket === "logos" } = {}) {
  // Same shape as the Leon FC app: unique filename, public URL back. Shrunk first so phone photos stay small.
  const body = await resizeImage(file, 512, cutout);
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.png`;
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${filename}`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "image/png",
      "x-upsert": "true",
    },
    body,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Upload failed: ${err}`);
  }
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${filename}`;
}
