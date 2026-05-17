import { CHAIN_IDS } from "@straton/utils";
import { type Address } from "viem";

import { getMockUSDCAddress, getMockUSDTAddress } from "./addresses";

export const STABLECOIN_DECIMALS = 6;
export const RECEIPT_TOKEN_DECIMALS = 18;
export const DECIMAL_CONVERSION_FACTOR = BigInt(1e12);
export const ERROR_MESSAGE_MAX_LENGTH = 100;

export interface StablecoinConfig {
  symbol: string;
  label: string;
  address: Address;
  decimals: number;
  partnerSlug?: string;
  iconPath?: string;
}

/**
 * Per-chain stablecoin registry.
 * Each chain lists the stablecoins accepted by its vault.
 */
export const STABLECOINS_BY_CHAIN: Record<number, StablecoinConfig[]> = {
  [CHAIN_IDS.BASE_SEPOLIA]: [
    {
      symbol: "USDC",
      label: "Mock USDC",
      address: getMockUSDCAddress(CHAIN_IDS.BASE_SEPOLIA),
      decimals: 6,
    },
    {
      symbol: "USDT",
      label: "Mock USDT",
      address: getMockUSDTAddress(CHAIN_IDS.BASE_SEPOLIA),
      decimals: 6,
    },
  ],
  [CHAIN_IDS.ETHEREUM]: [
    {
      symbol: "USDC",
      label: "USD Coin",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      decimals: 6,
    },
    {
      symbol: "USDT",
      label: "Tether USD",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      decimals: 6,
    },
  ],
  [CHAIN_IDS.ETHEREUM_SEPOLIA]: [
    {
      symbol: "USDC",
      label: "Mock USDC",
      address: getMockUSDCAddress(CHAIN_IDS.ETHEREUM_SEPOLIA),
      decimals: 6,
    },
    {
      symbol: "USDT",
      label: "Mock USDT",
      address: getMockUSDTAddress(CHAIN_IDS.ETHEREUM_SEPOLIA),
      decimals: 6,
    },
  ],
  [CHAIN_IDS.BASE]: [
    {
      symbol: "USDC",
      label: "USD Coin",
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      decimals: 6,
    },
  ],
  [CHAIN_IDS.ARBITRUM]: [
    {
      symbol: "USDC",
      label: "USD Coin",
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      decimals: 6,
    },
  ],
  [CHAIN_IDS.AVALANCHE]: [
    {
      symbol: "USDC",
      label: "USD Coin",
      address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      decimals: 6,
    },
    {
      symbol: "USDC.e",
      label: "Bridged USDC",
      address: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
      decimals: 6,
    },
  ],
};

/**
 * Get stablecoins for the given chain.
 * Falls back to an empty array for unsupported chains.
 */
export function getStablecoinsForChain(chainId: number): StablecoinConfig[] {
  return STABLECOINS_BY_CHAIN[chainId] ?? [];
}

/**
 * Legacy STABLECOINS array — kept for backward compatibility.
 * Resolves from the default chain (NEXT_PUBLIC_CHAIN_ID or BASE_SEPOLIA).
 */
export const STABLECOINS = [
  {
    symbol: "USDC",
    label: "Mock USDC",
    getAddress: () => getMockUSDCAddress(),
  },
  {
    symbol: "USDT",
    label: "Mock USDT",
    getAddress: () => getMockUSDTAddress(),
  },
] as const;
