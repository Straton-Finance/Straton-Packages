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
    // B1 C2/R3 redeploy (2026-05-18). The pre-B1 stack (0xb229.../0x7f7c...) is
    // dead on this chain. stfToken was NOT redeployed by B1 — kept.
    stfToken: "0xe1c08ADa94E557CD495657e656c2f3EEB93A4BE3",
    tbillToken: "0x82dd8f86C86Db739E96Bd873B368a36E4ad298CA",
    tokenFactory: "0x58b345E1018e55dc564aee44F8F58293DF59B167",
    vault: "0x51C25F00dD5D84cf7604fAB43e2bBAEafFb887D6",
    mockUSDC: "0xDA9564cF0c56A67071aDe6fc76499417CADBD1DF",
    mockUSDT: "0xDBf21aB5A0767C737750f560bfAa8F31ed51FDe5",
    sanctionsOracle: ZERO_ADDRESS,
    safeMultisig: "0x2f2171D6b92F8c7230dcd0084f33A083589bAFfe",
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
    // B1-on-Base C2/R3 redeploy (2026-05-22). The pre-R3 stack
    // (0xb229.../0x7f7c...) is dead/orphan on this chain — superseded because its
    // setWhitelisted required the monolithic AGENT_ROLE (the escalation R3 splits).
    // stfToken NOT redeployed (kept — verified to have code on Base Sep).
    // All addresses verified on-chain; tokenFactory recovered via the SREF1 proxy's
    // on-chain creator. Source: Straton-Backend migration 20260522000000.
    stfToken: "0xe1c08ADa94E557CD495657e656c2f3EEB93A4BE3",
    tbillToken: "0x04EF2c7F3f13A52c894568bf7eb13cA763AE1115",
    tokenFactory: "0xceB6FF8545B96A74cbFA27D6cBd57c1dD4370E29",
    vault: "0x76887836A292136fe86F6354882Ec06A1dfcd1DA",
    mockUSDC: "0x4df8bE805Fb27B7932A7AB78117Bdcef3bcb1251",
    mockUSDT: "0xA895b2f89E14Fb1ca83d718A2058B5EF5f0A197F",
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
