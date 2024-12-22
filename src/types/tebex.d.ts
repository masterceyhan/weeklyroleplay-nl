export interface WebhookPaymentCompleted {
  id: string
  type: string // e.g. "payment.completed"
  date: string // could also be Date if you parse it
  subject: {
    transaction_id: string
    status: {
      id: number
      description: string
    }
    payment_sequence: string // e.g. "oneoff"
    created_at: string // could also be Date
    price: WebhookCurrencyAmount
    price_paid: WebhookCurrencyAmount
    payment_method: {
      name: string
      refundable: boolean
    }
    fees: {
      tax: WebhookCurrencyAmount
      gateway: WebhookCurrencyAmount
    }
    customer: {
      first_name: string
      last_name: string
      email: string
      ip: string
      username: {
        id: string
        username: string
      }
      marketing_consent: boolean
      country: string
      postal_code: string
    }
    products: WebhookProduct[]
    coupons: WebhookCoupon[]
    gift_cards: unknown[] // If you know the shape, replace unknown[]
    recurring_payment_reference: unknown | null // Adjust if you know the type
    custom: Record<string, unknown> // or a more specific shape if known
    revenue_share: unknown[] // Adjust if you know the type
    decline_reason: string | null
  }
}

export interface WebhookCurrencyAmount {
  amount: number
  currency: string
  base_currency: string
  base_currency_price: number
}

export interface WebhookProduct {
  id: number
  name: string
  type: string
  quantity: number
  base_price: WebhookCurrencyAmount
  paid_price: WebhookCurrencyAmount
  variables: Array<{
    identifier: string
    option: string
  }>
  expires_at: string | null
  custom: unknown | null
  username: {
    id: string
    username: string
  }
  servers: Array<{
    id: number
    name: string
  }>
}

export interface WebhookCoupon {
  id: number
  code: string
  type: string // e.g. "cart"
  discount_type: string // e.g. "percentage"
  discount_percentage: number
  discount_amount: number
}
