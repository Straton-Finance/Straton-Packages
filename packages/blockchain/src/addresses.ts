import { CHAIN_IDS } from '@straton/utils';

import type { Address } from 'viem';

const ZERO_ADDRESS: Address = '0x0000000000000000000000000000000000000000';

export interface ChainContracts {
  rwaTokenImplementation: Address;
  tokenFactory: Address;
  sref1Token: Address;
  vault: Address;
  mockUSDC: Address;
  mockUSDT: Address;
  sanctionsOracle: Address;
  safeMultisig: Address;
}

export const CONTRACT_ADDRESSES: Record<number, ChainContracts> = {
  [CHAIN_IDS.ETHEREUM]: {
    rwaTokenImplementation: ZERO_ADDRESS,
    tokenFactory: ZERO_ADDRESS,
    sref1Token: ZERO_ADDRESS,
    vault: ZERO_ADDRESS,
    mockUSDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // Real USDC
    mockUSDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // Real USDT
    sanctionsOracle: '0x40C57923924B5c5c5455c48D93317139ADDaC8fb', // Chainalysis
    safeMultisig: ZERO_ADDRESS,
  },
  [CHAIN_IDS.ETHEREUM_SEPOLIA]: {
    rwaTokenImplementation: '0x8A2A05DD0c7F691525675d630F82D81D5E388dAB',
    tokenFactory: '0x90C50F5d862841267040FE4468ac0F909663B093',
    sref1Token: '0xC9b568C1596c2Bb92697fCd6535603abC05205A4',
    vault: '0x5B90DfE45D30b7dFb0F5ce35329A93A58D2D15AE',
    mockUSDC: '0xA40b419f3fE33D9fA48C4E27cAA058475A45DB52',
    mockUSDT: '0x6cAC26E43d5693d82Cf89a1bD5AcFb514Ff6fB55',
    sanctionsOracle: ZERO_ADDRESS,
    safeMultisig: ZERO_ADDRESS,
  },
  [CHAIN_IDS.POLYGON_AMOY]: {
    rwaTokenImplementation: '0xc1F857e4E8fb4eE71bF9544C31D76751C16f78E5',
    tokenFactory: '0x90C50F5d862841267040FE4468ac0F909663B093',
    sref1Token: '0x09eC01534e7662787B1990013e5fE29166DFD8B2',
    vault: ZERO_ADDRESS,
    mockUSDC: ZERO_ADDRESS,
    mockUSDT: ZERO_ADDRESS,
    sanctionsOracle: ZERO_ADDRESS,
    safeMultisig: ZERO_ADDRESS,
  },
  [CHAIN_IDS.BASE_SEPOLIA]: {
    rwaTokenImplementation: '0xC9b568C1596c2Bb92697fCd6535603abC05205A4',
    tokenFactory: '0x90C50F5d862841267040FE4468ac0F909663B093',
    sref1Token: '0xe5983bC4E75C461968987070A20761874b2C8F4F',
    vault: '0x5B90DfE45D30b7dFb0F5ce35329A93A58D2D15AE',
    mockUSDC: '0xA40b419f3fE33D9fA48C4E27cAA058475A45DB52',
    mockUSDT: '0x6cAC26E43d5693d82Cf89a1bD5AcFb514Ff6fB55',
    sanctionsOracle: ZERO_ADDRESS, // Deploy MockSanctionsList or leave disabled
    safeMultisig: '0x2f2171D6b92F8c7230dcd0084f33A083589bAFfe',
  },
  [CHAIN_IDS.POLYGON]: {
    rwaTokenImplementation: ZERO_ADDRESS,
    tokenFactory: ZERO_ADDRESS,
    sref1Token: ZERO_ADDRESS,
    vault: ZERO_ADDRESS,
    mockUSDC: ZERO_ADDRESS,
    mockUSDT: ZERO_ADDRESS,
    sanctionsOracle: ZERO_ADDRESS,
    safeMultisig: ZERO_ADDRESS,
  },
  [CHAIN_IDS.BASE]: {
    rwaTokenImplementation: ZERO_ADDRESS,
    tokenFactory: ZERO_ADDRESS,
    sref1Token: ZERO_ADDRESS,
    vault: ZERO_ADDRESS,
    mockUSDC: ZERO_ADDRESS,
    mockUSDT: ZERO_ADDRESS,
    sanctionsOracle: '0x40C57923924B5c5c5455c48D93317139ADDaC8fb', // Chainalysis
    safeMultisig: ZERO_ADDRESS,
  },
  [CHAIN_IDS.ARBITRUM_SEPOLIA]: {
    rwaTokenImplementation: ZERO_ADDRESS,
    tokenFactory: ZERO_ADDRESS,
    sref1Token: ZERO_ADDRESS,
    vault: ZERO_ADDRESS,
    mockUSDC: ZERO_ADDRESS,
    mockUSDT: ZERO_ADDRESS,
    sanctionsOracle: ZERO_ADDRESS,
    safeMultisig: ZERO_ADDRESS,
  },
  [CHAIN_IDS.ARBITRUM]: {
    rwaTokenImplementation: ZERO_ADDRESS,
    tokenFactory: ZERO_ADDRESS,
    sref1Token: ZERO_ADDRESS,
    vault: ZERO_ADDRESS,
    mockUSDC: ZERO_ADDRESS,
    mockUSDT: ZERO_ADDRESS,
    sanctionsOracle: '0x40C57923924B5c5c5455c48D93317139ADDaC8fb', // Chainalysis
    safeMultisig: ZERO_ADDRESS,
  },
  [CHAIN_IDS.AVALANCHE]: {
    rwaTokenImplementation: ZERO_ADDRESS,
    tokenFactory: ZERO_ADDRESS,
    sref1Token: ZERO_ADDRESS,
    vault: ZERO_ADDRESS,
    mockUSDC: ZERO_ADDRESS,
    mockUSDT: ZERO_ADDRESS,
    sanctionsOracle: '0x40C57923924B5c5c5455c48D93317139ADDaC8fb', // Chainalysis
    safeMultisig: ZERO_ADDRESS,
  },
  [CHAIN_IDS.AVALANCHE_FUJI]: {
    rwaTokenImplementation: ZERO_ADDRESS,
    tokenFactory: ZERO_ADDRESS,
    sref1Token: ZERO_ADDRESS,
    vault: ZERO_ADDRESS,
    mockUSDC: ZERO_ADDRESS,
    mockUSDT: ZERO_ADDRESS,
    sanctionsOracle: ZERO_ADDRESS,
    safeMultisig: ZERO_ADDRESS,
  },
};

export function hasContractAddresses(chainId: number): boolean {
  return chainId in CONTRACT_ADDRESSES;
}

export function getActiveChainId(): number {
  const envChainId = process.env.NEXT_PUBLIC_CHAIN_ID ?? process.env.CHAIN_ID;
  return envChainId ? Number(envChainId) : CHAIN_IDS.BASE_SEPOLIA;
}

export function getContractAddresses(chainId?: number): ChainContracts {
  const id = chainId ?? getActiveChainId();
  const addresses = CONTRACT_ADDRESSES[id];
  if (!addresses) {
    throw new Error(`No contract addresses configured for chain ${id}`);
  }
  return addresses;
}

export function getTokenFactoryAddress(chainId?: number): Address {
  return getContractAddresses(chainId).tokenFactory;
}

export function getSref1TokenAddress(chainId?: number): Address {
  return getContractAddresses(chainId).sref1Token;
}

export function getVaultAddress(chainId?: number): Address {
  return getContractAddresses(chainId).vault;
}

export function getMockUSDCAddress(chainId?: number): Address {
  return getContractAddresses(chainId).mockUSDC;
}

export function getMockUSDTAddress(chainId?: number): Address {
  return getContractAddresses(chainId).mockUSDT;
}

export function getSafeMultisigAddress(chainId?: number): Address {
  return getContractAddresses(chainId).safeMultisig;
}
