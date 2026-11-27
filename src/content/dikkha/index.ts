import type { Lang } from "./lang.ts"

// English is the complete source and defines the shape. Bangla may be partial:
// any key missing in `bn` falls back to the English text, so an English
// placeholder ships until the Bangla is supplied.
export const en = {
  brand: "Dikkha",
  lang: { switchTo: "বাংলা", switchLabel: "Switch to Bangla" },
  footer: { privacy: "Privacy", terms: "Terms" },
  auth: {
    signIn: "Sign in",
    signOut: "Sign out",
    title: "Sign in with your Dikkha account",
    phoneLabel: "Mobile number",
    sendCode: "Send code",
    otpLabel: "Code from the SMS",
    verify: "Verify",
    sendAgain: "Send the code again",
    sendAgainIn: "Send again in {n}s",
    changeNumber: "Use a different number",
    signedInAs: "Signed in as",
    needsSetupTitle: "Finish setup in the app first",
    needsSetupBody: "Your Dikkha account is not set up yet. Open the Dikkha app, finish setup, then come back to buy Coins.",
    getApp: "Get the app",
    errors: {
      invalidPhone: "Enter a valid Bangladesh mobile number, like 01XXXXXXXXX.",
      invalidOtp: "That code is not right. Check the SMS and try again.",
      otpExpired: "That code has expired. Send a new one.",
      otpLocked: "Too many wrong codes. Wait a while and try again.",
      tooManyRequests: "Too many tries. Wait a while and try again.",
      smsFailed: "We could not send the SMS. Try again in a moment.",
      network: "No connection. Check your internet and try again.",
      generic: "Something went wrong. Try again.",
    },
  },
}

export type Content = typeof en
type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] }

// "গোপনীয়তা ও শর্ত" (Privacy and terms) is the only footer wording in the app copy deck.
export const bn: DeepPartial<Content> = {
  lang: { switchTo: "English", switchLabel: "ইংরেজিতে দেখো" },
  footer: { privacy: "গোপনীয়তা", terms: "শর্ত" },
  auth: { signIn: "সাইন ইন" }, // from the Q109 landing copy; the rest falls back to English
}

function merge<T extends object>(base: T, over: DeepPartial<T>): T {
  const out = { ...base } as Record<string, unknown>
  for (const [k, v] of Object.entries(over)) {
    const b = (base as Record<string, unknown>)[k]
    out[k] = v && typeof v === "object" && b && typeof b === "object" ? merge(b, v) : (v ?? b)
  }
  return out as T
}

export function getContent(lang: Lang): Content {
  return lang === "en" ? en : merge(en, bn)
}

/** Language of the sign-in form text: Bangla only once its Bangla title exists, otherwise English. */
export function formLang(lang: Lang): Lang {
  return lang === "bn" && bn.auth?.title ? "bn" : "en"
}
