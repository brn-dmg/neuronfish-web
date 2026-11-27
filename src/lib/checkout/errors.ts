/** `detail` codes from the contract, plus the auth one. Map each to localized copy. */
export type CheckoutErrorDetail =
  | "invalid_package"
  | "order_not_found"
  | "order_expired"
  | "order_not_open"
  | "trx_id_invalid"
  | "trx_id_duplicate"
  | "payment_in_progress"
  | "too_many_attempts"
  | "Token expired"
  | "network_error"

// Same envelope as the rest of the backend: code, retryable, charged, detail.
export class CheckoutApiError extends Error {
  status: number
  detail: CheckoutErrorDetail | string
  retryable: boolean

  constructor(status: number, detail: CheckoutErrorDetail | string, retryable = false) {
    super(detail)
    this.name = "CheckoutApiError"
    this.status = status
    this.detail = detail
    this.retryable = retryable
  }
}
