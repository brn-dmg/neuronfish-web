import type { Lang } from "./lang.ts"
import type { CheckoutCopy } from "@/components/checkout/brand"

// English is the complete source and defines the shape. Bangla may be partial:
// any key missing in `bn` falls back to the English text, so an English
// placeholder ships until the Bangla is supplied.
const checkout: CheckoutCopy = {
  title: "Buy Coins",
  account: "Coins will be added to {name}'s Dikkha account.",
  pickPackage: "Choose a Coin package",
  coins: "{coins} Coins",
  bonus: "includes {bonus} bonus Coins",
  partnerLine: "Payment goes to our partner Apon Bazaar's verified bKash merchant account.",
  scanQr: "Scan the QR code in the bKash app, or send the exact amount to the merchant number.",
  qrAlt: "bKash QR code",
  merchantNumber: "Merchant number",
  orderCode: "Order code",
  payBefore: "Pay before {time}.",
  payHint: "After you pay, enter the TrxID from the bKash message. A parent can pay from a different bKash number.",
  trxLabel: "bKash TrxID",
  payerLabel: "bKash number you paid from",
  submit: "I have paid",
  changePackage: "Choose a different package",
  expiredTitle: "This order expired",
  expiredBody: "Nothing was charged. Start a new order to continue.",
  newOrder: "Start a new order",
  doneAddedTitle: "Your Coins are added",
  doneAddedBody: "The Coins are in your balance. We are still checking your payment.",
  donePendingTitle: "We have your payment",
  donePendingBody: "Your Coins will be added once we verify the payment.",
  balance: "Balance: {coins} Coins",
  backHome: "Back to Dikkha",
  loading: "Loading...",
  retry: "Try again",
  errors: {
    invalidPayer: "Enter the bKash number you paid from, like 01XXXXXXXXX.",
    invalidTrx: "That TrxID does not look right. Check the bKash message and try again.",
    duplicateTrx: "This TrxID has already been used.",
    paymentInProgress: "You already have a payment waiting to be verified.",
    tooManyAttempts: "Too many tries. Wait a while and try again.",
    orderNotOpen: "That order is already closed.",
    orderNotFound: "We could not find that order.",
    invalidPackage: "That package is not available. Choose another.",
    network: "No connection. Check your internet and try again.",
    generic: "Something went wrong. Try again.",
  },
}

export const en = {
  brand: "Dikkha",
  lang: { switchTo: "বাংলা", switchLabel: "Switch to Bangla" },
  footer: { privacy: "Privacy", terms: "Terms" },
  checkout,
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

/** Language of the checkout text: Bangla only once its Bangla title exists, otherwise English. */
export function checkoutLang(lang: Lang): Lang {
  return lang === "bn" && bn.checkout?.title ? "bn" : "en"
}
