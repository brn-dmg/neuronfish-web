/** SSC 2027 exam day (grill Q103). SSC 2028 has no date yet. */
export const SSC_DATE = "2027-03-14"

/** Whole days from today's date in Asia/Dhaka to `target` (YYYY-MM-DD). Zero or negative once it has come. */
export function daysUntil(target: string, now: Date = new Date()): number {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(now) // YYYY-MM-DD
  return Math.round((Date.parse(target) - Date.parse(today)) / 86_400_000)
}
