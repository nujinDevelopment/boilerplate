export interface PaymentProvider {
  enabled: boolean
  publicKey: string
  secretKey: string
  webhookSecret: string
}

export interface PaymentConfig {
  providers: {
    stripe: PaymentProvider
    revolut: PaymentProvider
  }
}

export interface Feature {
  name: string
  limit?: number
}

export interface SubscriptionPlan {
  name: string
  description: string
  price_monthly: number
  price_yearly: number
  features: Feature[]
}

export interface UserSubscription {
  userId: string
  planId: string
  status: 'active' | 'canceled' | 'expired'
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}
