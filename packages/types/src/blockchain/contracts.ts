import type { Address, Hash } from 'viem';

export interface ContractAddresses {
  rwaTokenImplementation: Address;
  tokenFactory: Address;
}

export interface DeployedToken {
  address: Address;
  chain: number;
  deployTxHash: Hash;
  blockNumber: bigint;
}

export interface TransactionReceipt {
  hash: Hash;
  blockNumber: bigint;
  blockHash: Hash;
  status: 'success' | 'reverted';
  gasUsed: bigint;
  effectiveGasPrice: bigint;
}
