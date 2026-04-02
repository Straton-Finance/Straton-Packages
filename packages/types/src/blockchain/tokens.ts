import type { Address } from 'viem';

export interface TokenInfo {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: bigint;
  chainId: number;
}

export interface OnchainTokenBalance {
  token: Address;
  balance: bigint;
  lockedBalance: bigint;
}

export interface TokenTransfer {
  from: Address;
  to: Address;
  amount: bigint;
  txHash: string;
  blockNumber: bigint;
  timestamp: number;
}

export interface TokenHolder {
  address: Address;
  balance: bigint;
  percentage: number;
}

export interface VaultShareInfo {
  vaultAddress: Address;
  shares: bigint;
  assetsDeposited: bigint;
  currentValue: bigint;
  pendingYield: bigint;
}
