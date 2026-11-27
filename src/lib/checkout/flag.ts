// Sign-in and the checkout are hidden until Mrittika's checkout API is live (J2-6 and J2-11).
export const checkoutEnabled = process.env.NEXT_PUBLIC_CHECKOUT_ENABLED === "true"
