import type { AccreditationLevel } from './user';

export type AssetType = 'REAL_ESTATE' | 'CREDIT' | 'COMMODITY' | 'EQUITY';

export type Chain = 'ETHEREUM' | 'POLYGON' | 'ARBITRUM';

export type TokenStandard = 'ERC3643' | 'ERC1400' | 'ERC20';

export interface Asset {
  id: string;
  issuerId: string;
  assetType: AssetType;
  name: string;
  symbol: string;
  description?: string;
  underlyingAsset: UnderlyingAsset;
  legalDocuments: LegalDocument[];
  complianceRules: ComplianceRules;
  eligibleJurisdictions: string[];
  eligibleAccreditation: AccreditationLevel[];
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface UnderlyingAsset {
  type: string;
  description: string;
  location?: string;
  valuation: number;
  valuationDate: Date;
  valuationCurrency: string;
  documents: string[];
  attributes: Record<string, unknown>;
}

export interface LegalDocument {
  type: string;
  name: string;
  url: string;
  hash?: string;
  uploadedAt: Date;
}

export interface ComplianceRules {
  maxHolders?: number;
  maxBalancePerHolder?: bigint;
  transferRestrictions?: TransferRestriction[];
  lockupPeriod?: number;
  whitelistOnly?: boolean;
}

export interface TransferRestriction {
  type: 'COUNTRY' | 'ACCREDITATION' | 'TIMELOCK' | 'CUSTOM';
  params: Record<string, unknown>;
}

export interface TokenContract {
  id: string;
  assetId: string;
  chain: Chain;
  address: string;
  standard: TokenStandard;
  identityRegistryAddress?: string;
  complianceAddress?: string;
  totalSupply: bigint;
  decimals: number;
  isTransferable: boolean;
  deployTxHash?: string;
  deployedAt?: Date;
  metadata: Record<string, unknown>;
  createdAt: Date;
}
