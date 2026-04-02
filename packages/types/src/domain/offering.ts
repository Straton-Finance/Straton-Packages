export type OfferingStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'OPEN' | 'CLOSED' | 'CANCELLED';

export type OfferingType = 'PRIMARY' | 'SECONDARY';

export interface Offering {
  id: string;
  assetId: string;
  status: OfferingStatus;
  offeringType: OfferingType;
  pricePerToken: number;
  currency: string;
  minInvestment?: number;
  maxInvestment?: number;
  softCap?: number;
  hardCap?: number;
  tokensAvailable: bigint;
  tokensSold: bigint;
  startsAt?: Date;
  endsAt?: Date;
  escrowAddress?: string;
  legalDocuments: string[];
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  offeringId: string;
  userId: string;
  walletId: string;
  amount: number;
  tokensAllocated?: bigint;
  status: SubscriptionStatus;
  paymentTxHash?: string;
  settlementTxHash?: string;
  complianceApproved?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type SubscriptionStatus = 'PENDING' | 'CONFIRMED' | 'SETTLED' | 'REFUNDED' | 'CANCELLED';
