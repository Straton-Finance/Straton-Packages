export interface ComplianceCheck {
  id: string;
  userId: string;
  checkType: ComplianceCheckType;
  status: ComplianceCheckStatus;
  provider: string;
  result?: ComplianceCheckResult;
  externalId?: string;
  checkedAt: Date;
  expiresAt?: Date;
  metadata: Record<string, unknown>;
}

export type ComplianceCheckType = 'KYC' | 'KYB' | 'AML' | 'SANCTIONS' | 'PEP' | 'ACCREDITATION';

export type ComplianceCheckStatus = 'PENDING' | 'IN_PROGRESS' | 'PASSED' | 'FAILED' | 'EXPIRED';

export interface ComplianceCheckResult {
  passed: boolean;
  score?: number;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  alerts?: ComplianceAlert[];
  details?: Record<string, unknown>;
}

export interface ComplianceAlert {
  type: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  message: string;
  data?: Record<string, unknown>;
}

export interface Claim {
  topic: number;
  scheme: number;
  issuer: string;
  signature: string;
  data: string;
  uri?: string;
}

export const CLAIM_TOPICS = {
  KYC: 1,
  ACCREDITATION: 2,
  COUNTRY: 3,
  AML_CLEAR: 4,
  INVESTOR_TYPE: 5,
} as const;

export type ClaimTopic = (typeof CLAIM_TOPICS)[keyof typeof CLAIM_TOPICS];
