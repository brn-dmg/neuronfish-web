// The single definition of "the real API is in use". The flag, the checkout client and the
// auth client all call this, so they cannot disagree about mock versus live.
export const isLive = (mode: string | undefined): boolean => mode === "live"
