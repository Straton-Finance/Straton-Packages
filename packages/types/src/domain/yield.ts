import type { Chain } from './asset';

export type VaultStrategy = 'STAKING' | 'FIXED_INCOME' | 'LENDING' | 'LP_REWARDS';

export type VaultStatus = 'ACTIVE' | 'PAUSED' | 'DEPRECATED';

export type LoanStatus = 'ACTIVE' | 'REPAID' | 'LIQUIDATED' | 'DEFAULTED';

export interface YieldVault {
  id: string;
  assetId: string;
  name: string;
  strategy: VaultStrategy;
  status: VaultStatus;
  apyCurrent?: number;
  apy7dAvg?: number;
  apy30dAvg?: number;
  tvl: number;
  minDeposit?: number;
  maxDeposit?: number;
  lockPeriodDays: number;
  performanceFee: number;
  managementFee: number;
  vaultAddress?: string;
  chain: Chain;
  riskRating?: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VaultDeposit {
  id: string;
  vaultId: string;
  userId: string;
  walletId: string;
  shares: bigint;
  depositedAmount: number;
  currentValue?: number;
  unrealizedYield: number;
  depositTxHash?: string;
  depositedAt: Date;
  lastClaimAt?: Date;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

export interface LendingPosition {
  id: string;
  borrowerId: string;
  collateralAssetId: string;
  collateralAmount: bigint;
  collateralValueAtOrigination: number;
  borrowedAmount: number;
  interestRate: number;
  accruedInterest: number;
  ltvAtOrigination: number;
  currentLtv?: number;
  liquidationThreshold: number;
  status: LoanStatus;
  originationDate: Date;
  maturityDate?: Date;
  repaidAmount: number;
  liquidationTxHash?: string;
  chain: Chain;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface YieldDistribution {
  id: string;
  vaultId: string;
  periodStart: Date;
  periodEnd: Date;
  totalYield: number;
  platformFee: number;
  distributedYield: number;
  distributionTxHash?: string;
  distributedAt?: Date;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

export interface RiskParameters {
  assetType: string;
  maxLTV: number;
  liquidationThreshold: number;
  interestBase: number;
}
