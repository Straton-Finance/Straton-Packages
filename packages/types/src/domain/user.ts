export type UserType = 'INDIVIDUAL' | 'INSTITUTIONAL';

export type KYCStatus = 'PENDING' | 'IN_REVIEW' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';

export type AccreditationLevel = 'RETAIL' | 'QUALIFIED' | 'PROFESSIONAL';

export interface User {
  id: string;
  email: string;
  userType: UserType;
  kycStatus: KYCStatus;
  accreditationLevel?: AccreditationLevel;
  primaryJurisdiction?: string;
  allowedJurisdictions: string[];
  kycProviderId?: string;
  kycVerifiedAt?: Date;
  kycExpiresAt?: Date;
  amlStatus: KYCStatus;
  amlLastCheck?: Date;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  legalName: string;
  taxId: string;
  jurisdiction: string;
  kybStatus: KYCStatus;
  licenses: License[];
  representatives: string[]; // User IDs
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface License {
  type: string;
  number: string;
  issuedBy: string;
  issuedAt: Date;
  expiresAt?: Date;
  jurisdiction: string;
}
