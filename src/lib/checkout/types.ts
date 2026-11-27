// Shapes from docs/checkout-api-contract.md. Keep in sync with the backend.

export type Package = {
  package_id: string
  coins: number // total, including bonus
  bonus_coins: number
  amount_bdt: number
  label: string
}

export type OrderStatus = "open" | "submitted" | "expired" | "cancelled"

export type PaymentStatus = "unverified" | "pending" | "verified" | "rejected" | "revoked"

export type Payment = {
  id: string
  order_code: string
  package_id: string
  coins: number
  amount_bdt: number
  status: PaymentStatus
  payer_msisdn_masked: string
  reject_reason: "amount_mismatch" | "not_found_in_statement" | "wrong_account" | "other" | null
  created_at: string
}

export type Order = {
  order_code: string
  status: OrderStatus
  package_id: string
  coins: number
  amount_bdt: number
  // Read these from every order. They can change (e.g. a new merchant account); never hardcode.
  merchant_number: string
  qr_image_url: string
  created_at: string
  expires_at: string
  payment?: Payment
}

export type SubmitTrxInput = { trx_id: string; payer_msisdn: string }
export type SubmitTrxResult = { payment: Payment; coins_balance: number }

export interface CheckoutApi {
  listPackages(): Promise<Package[]>
  createOrder(packageId: string): Promise<Order>
  getOrder(orderCode: string): Promise<Order>
  /** The current open order; throws `order_not_found` (404) when there is none. */
  getOpenOrder(): Promise<Order>
  cancelOrder(orderCode: string): Promise<Order>
  submitTrx(orderCode: string, input: SubmitTrxInput): Promise<SubmitTrxResult>
  getWallet(): Promise<{ coins_balance: number }>
}
