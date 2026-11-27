import { CheckoutApiError } from "./errors.ts"
import type { CheckoutApi } from "./types.ts"

/** On `401 Token expired`, refresh once and retry. A failed refresh rethrows the 401. */
export function withRefresh(api: CheckoutApi, refresh: () => Promise<boolean>): CheckoutApi {
  const wrap =
    <A extends unknown[], R>(fn: (...a: A) => Promise<R>) =>
    async (...a: A): Promise<R> => {
      try {
        return await fn(...a)
      } catch (e) {
        if (e instanceof CheckoutApiError && e.status === 401 && (await refresh())) return fn(...a)
        throw e
      }
    }
  return {
    listPackages: wrap(api.listPackages),
    createOrder: wrap(api.createOrder),
    getOrder: wrap(api.getOrder),
    getOpenOrder: wrap(api.getOpenOrder),
    cancelOrder: wrap(api.cancelOrder),
    submitTrx: wrap(api.submitTrx),
    getWallet: wrap(api.getWallet),
  }
}
