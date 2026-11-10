// ============================================================================
// TENANT TYPES
// ============================================================================

export enum TenantStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  INACTIVE = 'INACTIVE',
}

export enum SubscriptionTier {
  FREE = 'FREE',
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE',
}

export enum BillingCycle {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ANNUALLY = 'ANNUALLY',
}

export interface Tenant {
  id: string
  code: string
  name: string
  cacNumber?: string
  subdomain?: string
  stateId?: string
  stateName?: string
  localGovernmentId?: string
  localGovernmentName?: string
  address?: string
  contactName: string
  roleTitle?: string
  contactEmail: string
  contactPhone?: string
  status: TenantStatus
  emailVerified: boolean
  subscriptionTier: SubscriptionTier
  studentQuota?: number
  billingCycle?: BillingCycle
  subscriptionStartDate?: string
  subscriptionEndDate?: string
  metadata?: string
  createdAt: string
  updatedAt: string
}

export interface CreateTenantRequest {
  code: string
  name: string
  cacNumber?: string
  subdomain?: string
  stateId: string
  localGovernmentId: string
  address: string
  contactName: string
  roleTitle?: string
  contactEmail: string
  contactPhone?: string
  subscriptionTier: SubscriptionTier
  studentQuota?: number
  billingCycle?: BillingCycle
  subscriptionStartDate?: string
  subscriptionEndDate?: string
  metadata?: string
}

export interface UpdateTenantRequest {
  name?: string
  stateId?: string
  localGovernmentId?: string
  address?: string
  contactName?: string
  roleTitle?: string
  contactEmail?: string
  contactPhone?: string
  status?: TenantStatus
  subscriptionTier?: SubscriptionTier
  studentQuota?: number
  billingCycle?: BillingCycle
  subscriptionStartDate?: string
  subscriptionEndDate?: string
  metadata?: string
}
