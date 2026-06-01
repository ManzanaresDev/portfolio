// lib/rateLimit.ts
const requests = new Map<string, number>();

export function rateLimit(ip: string, limitMS = 3000) {
  // 3sg entre 2 requêtes
  const now = Date.now();
  const lastRequest = requests.get(ip);

  if (lastRequest && now - lastRequest < limitMS) {
    return false;
  }

  requests.set(ip, now);
  return true;
}
