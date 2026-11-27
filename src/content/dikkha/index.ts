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
  nav: { how: "How it works", prices: "Prices", parents: "For parents", faq: "FAQ" },
  checkout,
  home: {
    hero: {
      chip: "SSC 2027 · {n} days left",
      chipNoCount: "SSC 2027",
      title: "Stuck while studying? Dikkha explains it in one minute",
      body: "Explanations in Bangla that follow your book's chapters, plus practice and model tests. Start for free.",
      play: "Google Play",
      playLabel: "Get Dikkha on Google Play",
      trust: ["In Bangla", "From the NCTB book", "For every study group"],
      baghuAlt: "Baghu, the Dikkha mascot",
      previewToday: "Today's work",
      previewChapter: "Chapter 3 · Newton's laws",
      previewChat: "Chat: \"How are force and acceleration related?\"",
    },
    chat: {
      title: "However you write your question, Dikkha understands",
      lead: "In Bangla, in English, or mixed. The answer comes in the language of your book.",
      question: "newton er 2nd law ta ektu sohoj kore bolo",
      answer: "Force = mass × acceleration. So the same force moves a light object faster.",
      topic: "From Chapter 3 · Topic 3.3",
    },
    how: {
      title: "In three steps",
      steps: [
        { title: "Today's work", body: "2–3 tasks every day, picked for you" },
        { title: "Learn chapter by chapter", body: "Lessons, practice, questions and answers" },
        { title: "Take a model test", body: "See how ready you are" },
      ],
    },
    features: {
      title: "What you get",
      items: [
        { name: "Explain", body: "Select a line from your book" },
        { name: "Chat with photo", body: "Take a photo of your question" },
        { name: "Practice", body: "MCQ, CQ and board questions · always free" },
        { name: "CQ answer photo", body: "Gives marks for your written answer" },
        { name: "Mistake book", body: "Your mistakes come back to you" },
        { name: "Infographics", body: "A summary at a glance" },
      ],
    },
    groups: {
      title: "Whatever your study group",
      items: [
        { name: "Science", body: "Physics, Chemistry, Biology, Maths…" },
        { name: "Business Studies", body: "Accounting, Finance…" },
        { name: "Humanities", body: "History, Geography, Civics…" },
      ],
    },
    prices: {
      title: "Start free, buy Coins when you need them",
      lead: "Practice is always free. For the AI features you get some free use every week, then Coins.",
      freeTitle: "Free every week",
      freeBody: "Some free use of the AI features, renewed weekly",
      packsTitle: "Coin packs",
      pack: "{amount} → {coins} Coins",
      bonus: "+{bonus} bonus",
      payNote: "You can buy Coins on this website with bKash.",
    },
    parents: {
      title: "A weekly report for parents",
      body: "Every Friday evening a short SMS says how many days your child studied and how ready they are. Chats are never shown.",
    },
    faq: {
      title: "Questions and answers",
      items: [
        { q: "What is Dikkha?", a: "Dikkha is an AI study assistant. It explains your Class 9–10 NCTB book chapter by chapter in Bangla, and gives you practice and model tests." },
        { q: "Which class and study groups is it for?", a: "Class 9–10 (SSC), for all three study groups: Science, Business Studies and Humanities." },
        { q: "Is Dikkha free?", a: "Practice is always free. For the AI features you get some free use every week. After that you need Coins." },
        { q: "What are Coins?", a: "Coins pay for extra use of the AI features. The Coin packs and their prices are shown above." },
        { q: "Can I buy Coins with bKash?", a: "Yes. You can buy Coins on this website with bKash." },
        { q: "Is my information safe?", a: "Your chats are never shown to your parents. How we handle your data is written on our Privacy page." },
        { q: "How does the parent report work?", a: "You add a parent's phone number and they confirm it with a code. Then every Friday evening they get a short SMS about how many days you studied and how ready you are." },
        { q: "Which phones does it run on?", a: "You can get Dikkha from Google Play, and it runs well on ordinary Android phones." },
      ],
    },
    cta: { title: "Start today", baghuAlt: "Baghu celebrating" },
  },
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
  nav: { how: "কীভাবে কাজ করে", prices: "দাম", parents: "অভিভাবকদের জন্য", faq: "প্রশ্নোত্তর" },
  home: {
    hero: {
      chip: "SSC ২০২৭ · {n} দিন বাকি",
      chipNoCount: "SSC ২০২৭",
      title: "পড়ায় আটকে গেলে, ১ মিনিটে বুঝিয়ে দেবে Dikkha",
      body: "তোমার বইয়ের অধ্যায় ধরে বাংলায় ব্যাখ্যা, প্র্যাকটিস আর মডেল টেস্ট। বিনামূল্যে শুরু করো।",
      play: "Google Play",
      playLabel: "Google Play থেকে Dikkha নামাও",
      trust: ["বাংলায়", "NCTB বই থেকে", "সব বিভাগের জন্য"],
      baghuAlt: "Dikkha-র মাসকট বাঘু",
      previewToday: "আজকের কাজ",
      previewChapter: "অধ্যায় ৩ · নিউটনের সূত্র",
      previewChat: "চ্যাট: \"বল আর ত্বরণ কীভাবে মিলে?\"",
    },
    chat: {
      title: "তোমার প্রশ্ন যেভাবেই লেখো, বুঝে নেবে",
      lead: "বাংলা, English বা মিশিয়ে। উত্তর আসবে তোমার বইয়ের ভাষায়।",
      question: "newton er 2nd law ta ektu sohoj kore bolo",
      answer: "বল = ভর × ত্বরণ। মানে একই বলে হালকা জিনিস বেশি দৌড়ায়।",
      topic: "অধ্যায় ৩ · টপিক ৩.৩ থেকে",
    },
    how: {
      title: "তিন ধাপে",
      steps: [
        { title: "আজকের কাজ", body: "প্রতিদিন ২–৩টা, তোমার জন্য বাছা" },
        { title: "অধ্যায় ধরে শেখো", body: "পাঠ, প্র্যাকটিস, প্রশ্নোত্তর" },
        { title: "মডেল টেস্ট দাও", body: "প্রস্তুতি কতটুকু, দেখো" },
      ],
    },
    features: {
      title: "যা যা পাবে",
      items: [
        { name: "Explain", body: "বই থেকে সিলেক্ট করো" },
        { name: "চ্যাট + ছবি", body: "প্রশ্নের ছবি তোলো" },
        { name: "প্র্যাকটিস", body: "MCQ, CQ, বোর্ড প্রশ্ন · সবসময় ফ্রি" },
        { name: "CQ খাতার ছবি", body: "নম্বর দেয়" },
        { name: "ভুলের খাতা", body: "ভুল ফিরে আসে" },
        { name: "ইনফোগ্রাফিক", body: "এক নজরে সারাংশ" },
      ],
    },
    groups: {
      title: "তুমি যে বিভাগেরই হও",
      items: [
        { name: "বিজ্ঞান", body: "পদার্থ, রসায়ন, জীব, গণিত…" },
        { name: "ব্যবসায় শিক্ষা", body: "হিসাববিজ্ঞান, ফিন্যান্স…" },
        { name: "মানবিক", body: "ইতিহাস, ভূগোল, পৌরনীতি…" },
      ],
    },
    prices: {
      title: "ফ্রি শুরু, দরকারে কয়েন",
      lead: "প্র্যাকটিস সবসময় ফ্রি। AI-এর কাজে প্রতি সপ্তাহে ফ্রি ব্যবহার, তারপর কয়েন।",
      freeTitle: "প্রতি সপ্তাহে ফ্রি",
      freeBody: "AI-এর কাজে কিছু ফ্রি ব্যবহার, প্রতি সপ্তাহে নতুন করে",
      packsTitle: "কয়েন প্যাক",
      pack: "{amount} → {coins} কয়েন",
      bonus: "+{bonus} বোনাস",
      payNote: "এই ওয়েবসাইটে বিকাশ দিয়ে কয়েন কেনা যায়।",
    },
    parents: {
      title: "অভিভাবকদের জন্য সাপ্তাহিক রিপোর্ট",
      body: "প্রতি শুক্রবার সন্ধ্যায় SMS: কতদিন পড়েছে, প্রস্তুতি কেমন। চ্যাট কখনো দেখানো হয় না।",
    },
    faq: {
      title: "প্রশ্নোত্তর",
      items: [
        { q: "Dikkha কী?", a: "Dikkha একটি AI পড়ার সহকারী। ক্লাস ৯–১০-এর NCTB বইয়ের অধ্যায় ধরে বাংলায় ব্যাখ্যা, প্র্যাকটিস আর মডেল টেস্ট দেয়।" },
        { q: "কোন ক্লাস আর কোন বিভাগের জন্য?", a: "ক্লাস ৯–১০ (SSC)। বিজ্ঞান, ব্যবসায় শিক্ষা আর মানবিক, তিন বিভাগের জন্যই।" },
        { q: "Dikkha কি ফ্রি?", a: "প্র্যাকটিস সবসময় ফ্রি। AI-এর কাজে প্রতি সপ্তাহে কিছু ফ্রি ব্যবহার পাবে। তারপর কয়েন লাগে।" },
        { q: "কয়েন কী?", a: "কয়েন দিয়ে AI-এর কাজে বাড়তি ব্যবহার করা যায়। কয়েন প্যাক আর তাদের দাম ওপরে দেখানো আছে।" },
        { q: "বিকাশ দিয়ে কয়েন কেনা যাবে?", a: "হ্যাঁ। এই ওয়েবসাইটে বিকাশ দিয়ে কয়েন কেনা যায়।" },
        { q: "আমার তথ্য কি নিরাপদ?", a: "তোমার চ্যাট অভিভাবককে কখনো দেখানো হয় না। তোমার তথ্য আমরা কীভাবে ব্যবহার করি, তা গোপনীয়তা পাতায় লেখা আছে।" },
        { q: "অভিভাবকের রিপোর্ট কীভাবে কাজ করে?", a: "তুমি অভিভাবকের ফোন নম্বর দিলে তিনি একটি কোড দিয়ে নিশ্চিত করেন। তারপর প্রতি শুক্রবার সন্ধ্যায় তিনি একটি SMS পান: কতদিন পড়েছ, প্রস্তুতি কেমন।" },
        { q: "কোন ফোনে চলে?", a: "Google Play থেকে Dikkha নামানো যায়। সাধারণ Android ফোনেও ভালো চলে।" },
      ],
    },
    cta: { title: "আজই শুরু করো", baghuAlt: "উদ্‌যাপনে বাঘু" },
  },
  auth: { signIn: "সাইন ইন" }, // from the Q109 landing copy; the rest falls back to English
}

function merge<T extends object>(base: T, over: DeepPartial<T>): T {
  const out = { ...base } as Record<string, unknown>
  for (const [k, v] of Object.entries(over)) {
    const b = (base as Record<string, unknown>)[k]
    out[k] = v && typeof v === "object" && !Array.isArray(v) && b && typeof b === "object" ? merge(b, v) : (v ?? b)
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
