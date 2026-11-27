// What an app (Dikkha, later Poshra and BCS) hands to the shared Checkout.
// Colors are not here: they come from the CSS variables (--ck-*) the app's layout defines.

export type CheckoutCopy = {
  title: string
  account: string // {name}
  pickPackage: string
  coins: string // {coins}
  bonus: string // {bonus}
  partnerLine: string
  scanQr: string
  qrAlt: string
  merchantNumber: string
  orderCode: string
  payBefore: string // {time}
  payHint: string
  trxLabel: string
  payerLabel: string
  submit: string
  changePackage: string
  expiredTitle: string
  expiredBody: string
  newOrder: string
  doneAddedTitle: string
  doneAddedBody: string
  donePendingTitle: string
  donePendingBody: string
  balance: string // {coins}
  backHome: string
  loading: string
  retry: string
  errors: {
    invalidPayer: string
    invalidTrx: string
    duplicateTrx: string
    paymentInProgress: string
    tooManyAttempts: string
    orderNotOpen: string
    orderNotFound: string
    invalidPackage: string
    network: string
    generic: string
  }
}

export type CheckoutBrand = {
  name: string
  homeHref: string
  copy: CheckoutCopy
}
