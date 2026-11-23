export enum SchoolSection {
  EARLY_YEARS = 'EARLY_YEARS',
  PRIMARY = 'PRIMARY',
  JUNIOR_SECONDARY = 'JUNIOR_SECONDARY',
  SENIOR_SECONDARY = 'SENIOR_SECONDARY',
}

export enum Department {
  SCIENCES_AND_STEM = 'SCIENCES_AND_STEM',
  HUMANITIES_AND_LANGUAGES = 'HUMANITIES_AND_LANGUAGES',
  PRIMARY_HOMEROOM = 'PRIMARY_HOMEROOM',
  EYFS_AND_CRECHE = 'EYFS_AND_CRECHE',
  ADMINISTRATION_AND_OPERATIONS = 'ADMINISTRATION_AND_OPERATIONS',
}

export enum HighestQualification {
  NCE = 'NCE',
  B_ED = 'B_ED',
  B_SC_PGDE = 'B_SC_PGDE',
  M_ED_M_SC = 'M_ED_M_SC',
  PGDE = 'PGDE',
  REGISTERED_NURSE = 'REGISTERED_NURSE',
  OND_HND_GENERAL = 'OND_HND_GENERAL',
}

export enum StaffRole {
  PRINCIPAL = 'PRINCIPAL',
  VICE_PRINCIPAL = 'VICE_PRINCIPAL',
  HEAD_TEACHER = 'HEAD_TEACHER',
  REGISTRAR = 'REGISTRAR',
  BURSAR = 'BURSAR',
  HEAD_OF_DEPARTMENT = 'HEAD_OF_DEPARTMENT',
  SUBJECT_COORDINATOR = 'SUBJECT_COORDINATOR',
  LEVEL_COORDINATOR = 'LEVEL_COORDINATOR',
  EARLY_YEARS_CAREGIVER = 'EARLY_YEARS_CAREGIVER',
  MONTESSORI_LEAD = 'MONTESSORI_LEAD',
  EARLY_CHILDHOOD_EDUCATOR = 'EARLY_CHILDHOOD_EDUCATOR',
  NURSERY_TEACHER = 'NURSERY_TEACHER',
  PRIMARY_EDUCATOR = 'PRIMARY_EDUCATOR',
  PRIMARY_CORE_SPECIALIST = 'PRIMARY_CORE_SPECIALIST',
  PRIMARY_STEM_INSTRUCTOR = 'PRIMARY_STEM_INSTRUCTOR',
  UBE_CERTIFIED_TEACHER = 'UBE_CERTIFIED_TEACHER',
  PRIMARY_LITERACY_SPECIALIST = 'PRIMARY_LITERACY_SPECIALIST',
  JUNIOR_SECONDARY_EDUCATOR = 'JUNIOR_SECONDARY_EDUCATOR',
  BASIC_SCIENCE_TEACHER = 'BASIC_SCIENCE_TEACHER',
  CREATIVE_ARTS_INSTRUCTOR = 'CREATIVE_ARTS_INSTRUCTOR',
  PRE_VOCATIONAL_TECH_LEAD = 'PRE_VOCATIONAL_TECH_LEAD',
  FRENCH_TEACHER = 'FRENCH_TEACHER',
  BUSINESS_STUDIES_TEACHER = 'BUSINESS_STUDIES_TEACHER',
  AGRICULTURAL_SCIENCE_TEACHER = 'AGRICULTURAL_SCIENCE_TEACHER',
  BECE_COORDINATOR = 'BECE_COORDINATOR',
  MATHEMATICS_TEACHER = 'MATHEMATICS_TEACHER',
  PHYSICS_TEACHER = 'PHYSICS_TEACHER',
  CHEMISTRY_TEACHER = 'CHEMISTRY_TEACHER',
  BIOLOGY_TEACHER = 'BIOLOGY_TEACHER',
  ENGLISH_TEACHER = 'ENGLISH_TEACHER',
  LITERATURE_TEACHER = 'LITERATURE_TEACHER',
  ECONOMICS_TEACHER = 'ECONOMICS_TEACHER',
  COMMERCE_TEACHER = 'COMMERCE_TEACHER',
  ACCOUNTING_TEACHER = 'ACCOUNTING_TEACHER',
  GOVERNMENT_TEACHER = 'GOVERNMENT_TEACHER',
  GEOGRAPHY_TEACHER = 'GEOGRAPHY_TEACHER',
  HISTORY_TEACHER = 'HISTORY_TEACHER',
  CRS_TEACHER = 'CRS_TEACHER',
  IRS_TEACHER = 'IRS_TEACHER',
  COMPUTER_SCIENCE_TEACHER = 'COMPUTER_SCIENCE_TEACHER',
  TECHNICAL_DRAWING_TEACHER = 'TECHNICAL_DRAWING_TEACHER',
  FORM_TUTOR = 'FORM_TUTOR',
  SUBJECT_TEACHER = 'SUBJECT_TEACHER',
  COUNSELOR = 'COUNSELOR',
  LIBRARIAN = 'LIBRARIAN',
  LAB_TECHNICIAN = 'LAB_TECHNICIAN',
  ICT_COORDINATOR = 'ICT_COORDINATOR',
  SPORTS_COORDINATOR = 'SPORTS_COORDINATOR',
  EXAMINATION_OFFICER = 'EXAMINATION_OFFICER',
  TIMETABLE_OFFICER = 'TIMETABLE_OFFICER',
  ADMIN_STAFF = 'ADMIN_STAFF',
  SECURITY_STAFF = 'SECURITY_STAFF',
  MAINTENANCE_STAFF = 'MAINTENANCE_STAFF',
}

export interface StaffRoleInfo {
  code: string
  displayName: string
  category: string
  applicableTiers: string[]
}

export interface NextOfKin {
  name?: string
  phone?: string
  relationship?: string
}

export interface Staff {
  id: string
  userId: string | null
  schoolId: string
  tenantId: string
  staffNumber: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  phone: string | null
  schoolSection: SchoolSection
  schoolSectionDisplay: string
  primaryRole: StaffRole
  primaryRoleDisplay: string
  department: Department | null
  highestQualification: HighestQualification | null
  trcnLicenseNumber: string | null
  trcnVerified: boolean
  dateOfBirth: string | null
  gender: string | null
  nextOfKin: NextOfKin | null
  employmentType: string
  employmentStatus: string
  dateOfEmployment: string | null
  accountProvisioned: boolean
  hasUserAccount: boolean
  isPendingInvitation: boolean
  invitationSentAt: string | null
  invitationAcceptedAt: string | null
  accountActivatedAt: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  createdBy: string | null
  updatedBy: string | null
}

export interface CreateStaffRequest {
  email: string
  firstName: string
  lastName: string
  phone?: string
  schoolSection: SchoolSection
  primaryRole: StaffRole
  department?: Department
  highestQualification?: HighestQualification
  trcnLicenseNumber?: string
  dateOfBirth?: string
  gender?: 'MALE' | 'FEMALE' | 'OTHER'
  nextOfKin?: NextOfKin
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY'
  employmentStatus: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'TERMINATED' | 'ON_LEAVE'
  sendInvitationEmail?: boolean
}

export interface UpdateStaffRequest {
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
  schoolSection?: SchoolSection
  primaryRole?: StaffRole
  department?: Department
  highestQualification?: HighestQualification
  trcnLicenseNumber?: string
  trcnVerified?: boolean
  dateOfBirth?: string
  gender?: 'MALE' | 'FEMALE' | 'OTHER'
  nextOfKin?: NextOfKin
  employmentType?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY'
  employmentStatus?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'TERMINATED' | 'ON_LEAVE'
}

export const SCHOOL_SECTION_LABELS: Record<SchoolSection, string> = {
  [SchoolSection.EARLY_YEARS]: 'Early Years',
  [SchoolSection.PRIMARY]: 'Primary',
  [SchoolSection.JUNIOR_SECONDARY]: 'Junior Secondary',
  [SchoolSection.SENIOR_SECONDARY]: 'Senior Secondary',
}

export const DEPARTMENT_LABELS: Record<Department, string> = {
  [Department.SCIENCES_AND_STEM]: 'Sciences & STEM',
  [Department.HUMANITIES_AND_LANGUAGES]: 'Humanities & Languages',
  [Department.PRIMARY_HOMEROOM]: 'Primary Homeroom',
  [Department.EYFS_AND_CRECHE]: 'EYFS & Crèche',
  [Department.ADMINISTRATION_AND_OPERATIONS]: 'Administration & Operations',
}

export const HIGHEST_QUALIFICATION_LABELS: Record<HighestQualification, string> = {
  [HighestQualification.NCE]: 'NCE (National Certificate in Education)',
  [HighestQualification.B_ED]: 'B.Ed (Bachelor of Education)',
  [HighestQualification.B_SC_PGDE]: 'B.Sc / B.A + PGDE',
  [HighestQualification.M_ED_M_SC]: 'M.Ed / M.Sc',
  [HighestQualification.PGDE]: 'PGDE',
  [HighestQualification.REGISTERED_NURSE]: 'Registered Nurse (RN / RM)',
  [HighestQualification.OND_HND_GENERAL]: 'OND / HND / General',
}

export const EMPLOYMENT_TYPE_LABELS = {
  FULL_TIME: 'Full Time',
  PART_TIME: 'Part Time',
  CONTRACT: 'Contract',
  TEMPORARY: 'Temporary',
}

export const EMPLOYMENT_STATUS_LABELS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  SUSPENDED: 'Suspended',
  TERMINATED: 'Terminated',
  ON_LEAVE: 'On Leave',
}

export const GENDER_LABELS = {
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other',
}
