import { CHAIN_IDS } from "@straton/utils";

import type { Address } from "viem";

const ZERO_ADDRESS: Address = "0x0000000000000000000000000000000000000000";

export interface ChainContracts {
  stfToken: Address;
  tbillToken: Address;
  tokenFactory: Address;
  vault: Address;
  mockUSDC: Address;
  mockUSDT: Address;
  sanctionsOracle: Address;
  safeMultisig: Address;
}

export const CONTRACT_ADDRESSES: Record<number, ChainContracts> = {
  [CHAIN_IDS.ETHEREUM]: {
    stfToken: ZERO_ADDRESS,
    tbillToken: ZERO_ADDRESS,
    tokenFactory: ZERO_ADDRESS,
    vault: ZERO_ADDRESS,
    mockUSDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    mockUSDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    sanctionsOracle: "0x40C57923924B5c5c5455c48D93317139ADDaC8fb",
    safeMultisig: ZERO_ADDRESS,
  },
  [CHAIN_IDS.ETHEREUM_SEPOLIA]: {
    stfToken: "0xe1c08ADa94E557CD495657e656c2f3EEB93A4BE3",
    tbillToken: "0xb2291a301ac47c4351fa424d847407111e604362",
    tokenFactory: "0xbbf3f31e67a56e76681da8a8f859b156b42b9249",
    vault: "0x7f7cabcb7f2715ce6f16d371f293425d2368e1e0",
    mockUSDC: "0x58a030261a940de9606e243a17fbc4454ae3b5d3",
    mockUSDT: "0xb63e62585cd426e51127fbae632645714d794a25",
    sanctionsOracle: ZERO_ADDRESS,
    safeMultisig: ZERO_ADDRESS,
  },
  [CHAIN_IDS.POLYGON_AMOY]: {
    stfToken: ZERO_ADDRESS,
    tbillToken: ZERO_ADDRESS,
    tokenFactory: ZERO_ADDRESS,
    vault: ZERO_ADDRESS,
    mockUSDC: ZERO_ADDRESS,
    mockUSDT: ZERO_ADDRESS,
    sanctionsOracle: ZERO_ADDRESS,
    safeMultisig: ZERO_ADDRESS,
  },
  [CHAIN_IDS.BASE_SEPOLIA]: {
    stfToken: "0xe1c08ADa94E557CD495657e656c2f3EEB93A4BE3",
    tbillToken: "0xb2291a301ac47c4351fa424d847407111e604362",
    tokenFactory: "0xbbf3f31e67a56e76681da8a8f859b156b42b9249",
    vault: "0x7f7cabcb7f2715ce6f16d371f293425d2368e1e0",
    mockUSDC: "0x58a030261a940de9606e243a17fbc4454ae3b5d3",
    mockUSDT: "0xb63e62585cd426e51127fbae632645714d794a25",
    sanctionsOracle: ZERO_ADDRESS,
    safeMultisig: "0x2f2171D6b92F8c7230dcd0084f33A083589bAFfe",
  },
  [CHAIN_IDS.POLYGON]: {
    stfToken: ZERO_ADDRESS,
    tbillToken: ZERO_ADDRESS,
    tokenFactory: ZERO_ADDRESS,
    vault: ZERO_ADDRESS,
    mockUSDC: ZERO_ADDRESS,
    mockUSDT: ZERO_ADDRESS,
    sanctionsOracle: ZERO_ADDRESS,
    safeMultisig: ZERO_ADDRESS,
  },
  [CHAIN_IDS.BASE]: {
    stfToken: ZERO_ADDRESS,
    tbillToken: ZERO_ADDRESS,
    tokenFactory: ZERO_ADDRESS,
    vault: ZERO_ADDRESS,
    mockUSDC: ZERO_ADDRESS,
    mockUSDT: ZERO_ADDRESS,
    sanctionsOracle: "0x40C57923924B5c5c5455c48D93317139ADDaC8fb",
    safeMultisig: ZERO_ADDRESS,
  },
  [CHAIN_IDS.ARBITRUM_SEPOLIA]: {
    stfToken: ZERO_ADDRESS,
    tbillToken: ZERO_ADDRESS,
    tokenFactory: ZERO_ADDRESS,
    vault: ZERO_ADDRESS,
    mockUSDC: ZERO_ADDRESS,
    mockUSDT: ZERO_ADDRESS,
    sanctionsOracle: ZERO_ADDRESS,
    safeMultisig: ZERO_ADDRESS,
  },
  [CHAIN_IDS.ARBITRUM]: {
    stfToken: ZERO_ADDRESS,
    tbillToken: ZERO_ADDRESS,
    tokenFactory: ZERO_ADDRESS,
    vault: ZERO_ADDRESS,
    mockUSDC: ZERO_ADDRESS,
    mockUSDT: ZERO_ADDRESS,
    sanctionsOracle: "0x40C57923924B5c5c5455c48D93317139ADDaC8fb",
    safeMultisig: ZERO_ADDRESS,
  },
  [CHAIN_IDS.AVALANCHE]: {
    stfToken: ZERO_ADDRESS,
    tbillToken: ZERO_ADDRESS,
    tokenFactory: ZERO_ADDRESS,
    vault: ZERO_ADDRESS,
    mockUSDC: ZERO_ADDRESS,
    mockUSDT: ZERO_ADDRESS,
    sanctionsOracle: "0x40C57923924B5c5c5455c48D93317139ADDaC8fb",
    safeMultisig: ZERO_ADDRESS,
  },
  [CHAIN_IDS.AVALANCHE_FUJI]: {
    stfToken: ZERO_ADDRESS,
    tbillToken: ZERO_ADDRESS,
    tokenFactory: ZERO_ADDRESS,
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

export function getStfTokenAddress(chainId?: number): Address {
  return getContractAddresses(chainId).stfToken;
}

export function getTbillTokenAddress(chainId?: number): Address {
  return getContractAddresses(chainId).tbillToken;
}

export function getTokenFactoryAddress(chainId?: number): Address {
  return getContractAddresses(chainId).tokenFactory;
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
