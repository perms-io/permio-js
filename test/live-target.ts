/**
 * Whether the live integration test may run against `url`. It writes (grants,
 * revokes, deletes), so only an allowlist is accepted: local hosts
 * (`localhost`, `127.0.0.1`, `[::1]`, `*.localhost`, `*.test`) and hosts under
 * `.perms.io` other than production. Production (`api.perms.io`) is refused in
 * any spelling (`https://API.perms.io`, `https://api.perms.io:443`, a trailing
 * dot, ...).
 */
export function isAllowedLiveTarget(url: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;
  if (parsed.username || parsed.password) return false;
  // URL lowercases the host; a trailing dot names the same host.
  const host = parsed.hostname.toLowerCase().replace(/\.$/, "");
  if (host === "api.perms.io") return false;
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "[::1]" ||
    host.endsWith(".localhost") ||
    host.endsWith(".test") ||
    host.endsWith(".perms.io")
  );
}
