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

// Dashboard Types
export interface TenantDashboardStatistics {
  totalSchools: number
  activeSchools: number
  suspendedSchools: number
  totalSeatCapacity: number
  totalCurrentStudents: number
  availableSeats: number
  occupancyRate: number
  totalCurrentTeachers: number
  remainingQuota: number
  quotaUsageRate: number
}

export interface TenantDashboard {
  // Tenant Basic Information
  tenantId: string
  tenantCode: string
  tenantName: string
  cacNumber?: string
  subdomain?: string
  address?: string
  contactName: string
  roleTitle?: string
  contactEmail: string
  contactPhone?: string
  stateName?: string
  localGovernmentName?: string

  // Status & Subscription
  status: TenantStatus
  subscriptionTier: SubscriptionTier
  studentQuota: number
  billingCycle?: BillingCycle
  subscriptionStartDate?: string
  subscriptionEndDate?: string
  emailVerified: boolean

  // Aggregated Statistics
  statistics: TenantDashboardStatistics

  // List of Schools (simplified School type from backend)
  schools: Array<{
    id: string
    name: string
    campusCode: string
    topology: string
    educationalTiers: string[]
    stateName?: string
    localGovernmentName?: string
    physicalAddress?: string
    schoolHeadName?: string
    schoolHeadEmail?: string
    schoolHeadPhone?: string
    seatCapacity: number
    currentStudents: number
    currentTeachers: number
    status: string
    createdAt: string
    updatedAt: string
  }>

  // Metadata
  metadata?: string
  createdAt: string
  updatedAt: string
}
