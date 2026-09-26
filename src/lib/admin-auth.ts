// Client-side admin gate for the localStorage prototype. This is NOT real
// security: the hash ships in the static bundle and all data lives in the
// visitor's browser. Replace with server-side auth (e.g. Supabase Auth) once
// inquiries are persisted on a backend.

const SESSION_KEY = 'dkf.admin.session';

export const adminPasswordHash = (process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH ?? '').trim().toLowerCase();

export const isAdminConfigured = () => adminPasswordHash.length === 64;

async function sha256Hex(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyAdminPassword(password: string) {
  if (!isAdminConfigured()) return false;
  return (await sha256Hex(password)) === adminPasswordHash;
}

export function hasAdminSession() {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === adminPasswordHash && isAdminConfigured();
  } catch {
    return false;
  }
}

export function startAdminSession() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, adminPasswordHash);
  } catch {
    // Session only lasts for this page view if storage is unavailable.
  }
}

export function endAdminSession() {
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Nothing to clean up.
  }
}
