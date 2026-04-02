import type { Chain } from './asset';

export type WalletType = 'CUSTODIAL' | 'SELF_CUSTODY';

export type CustodianProvider = 'FIREBLOCKS' | 'BITGO' | 'SELF';

export interface Wallet {
  id: string;
  ownerId: string;
  walletType: WalletType;
  chain: Chain;
  address: string;
  custodianProvider?: CustodianProvider;
  custodianVaultId?: string;
  custodianAccountId?: string;
  isPrimary: boolean;
  isVerified: boolean;
  attestationSignature?: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

export interface TokenBalance {
  walletId: string;
  tokenAddress: string;
  chain: Chain;
  balance: bigint;
  lockedBalance: bigint;
  lastUpdated: Date;
}
