export type Lang = "bn" | "en"

// Bangla lives at /dikkha, English at /dikkha/en (and /dikkha/en/checkout).
export function langFromPath(pathname: string): Lang {
  return pathname === "/dikkha/en" || pathname.startsWith("/dikkha/en/") ? "en" : "bn"
}

/** The same page in the other language. */
export function otherLangPath(pathname: string): string {
  return langFromPath(pathname) === "en"
    ? pathname.replace(/^\/dikkha\/en/, "/dikkha")
    : pathname.replace(/^\/dikkha/, "/dikkha/en")
}
