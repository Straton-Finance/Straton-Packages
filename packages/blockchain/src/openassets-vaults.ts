import { CHAIN_IDS } from "@straton/utils";

import type { Address } from "viem";

/**
 * KAN-17 / OpenAssets vault deliverables — separate product line from the Midas
 * multi-vault (sTBILL/sGLOBAL/sBASIS) which lives in `addresses.ts`. Kept as a
 * parallel structure on purpose: KAN-17 is a non-custodial testnet demo for the
 * OpenAssets vetting, with its own deploy script and its own role topology
 * (dedicated-deployer mode — deployer EOA holds zero operational role).
 *
 * If/when the package converges on a unified multi-vault schema, this file
 * folds into `addresses.ts`. For now they coexist to avoid churning Bruno's
 * in-flight single-vault repoint (PR #8).
 */

export const OPENASSETS_VAULT_SLUGS = ["susdt", "sweth"] as const;
export type OpenAssetsVaultSlug = (typeof OPENASSETS_VAULT_SLUGS)[number];

export interface OpenAssetsVaultDeployment {
  /** Per-product Vault proxy (TransparentUpgradeableProxy). */
  vault: Address;
  /** ERC-3643 receipt token proxy. */
  receiptToken: Address;
  /** ModularCompliance proxy bound 1:1 to the receipt token. */
  modularCompliance: Address;
  /** ERC-20 the vault accepts on deposit (USDT mock or canonical WETH). */
  depositAsset: Address;
}

export interface OpenAssetsChainDeployment {
  chainId: number;
  /** EOA that ran the deploy. Holds **zero** operational role post-deploy
   *  (dedicated-deployer mode). The only remaining authority is `approveBind`
   *  on the 4 compliance modules (no `transferOwnership` on AbstractModule
   *  yet — mainnet hardening item). */
  deployer: Address;
  /** Cold Safe — DEFAULT_ADMIN on receipts/vaults/compliance + AGENT on receipts. */
  safe: Address;
  /** Backend hot key — MINTER + WHITELIST_AGENT + PAUSER on receipts; PAUSER on vault.
   *  On Eth Sepolia this is the same EOA as the existing WHITELISTER_PRIVATE_KEY
   *  in Vercel `straton-api`/Production. */
  backendHotKey: Address;
  infra: {
    rwaTokenImpl: Address;
    tokenFactory: Address;
    vaultImpl: Address;
    vaultFactory: Address;
    claimTopicsRegistry: Address;
    trustedIssuersRegistry: Address;
    identityRegistry: Address;
  };
  /** Shared singleton modules; per-token config is on the ModularCompliance. */
  complianceModules: {
    globalRateLimit: Address;
    perInvestorRateLimit: Address;
    maxBalance: Address;
    countryRestrict: Address;
  };
  vaults: Record<OpenAssetsVaultSlug, OpenAssetsVaultDeployment>;
}

export const OPENASSETS_DEPLOYMENTS: Partial<
  Record<number, OpenAssetsChainDeployment>
> = {
  // Eth Sepolia — first KAN-17 deploy, 2026-05-20. Dedicated-deployer mode.
  // wETH vault accepts canonical Sepolia WETH9 (0xfFf9976782...6B14) so demo
  // users can wrap real test-ETH via any standard dApp and deposit.
  [CHAIN_IDS.ETHEREUM_SEPOLIA]: {
    chainId: 11155111,
    deployer: "0x00818593B91f78D35766993637f10AA0B0660F8F",
    safe: "0x2f2171D6b92F8c7230dcd0084f33A083589bAFfe",
    backendHotKey: "0xc8A0841e703973418B7B5ED95c786c9e20a6eF86",
    infra: {
      rwaTokenImpl: "0x74a97547C5DA09f276Ba14e7F7Fe2e58C6D8E73F",
      tokenFactory: "0x6AF3B0bd4294A54F8E71308080EC118a216900df",
      vaultImpl: "0xdfB44eA93e513c694e638B364a102aF2A63198F0",
      vaultFactory: "0x928BDDE5B40Be8fCD3336CF14781B861560532AC",
      claimTopicsRegistry: "0x174589d1C853B4550572Cc61520C7E69D8CAf6b2",
      trustedIssuersRegistry: "0x18B63497615Fcf24862cD2C4dD3B7d4d487c9B3E",
      identityRegistry: "0xA880D5c53e1dbe632564b9dc98a04E99F5da0476",
    },
    complianceModules: {
      globalRateLimit: "0x83660C2a85b2E8a88Cf75dF8C81c0d16c6B636A9",
      perInvestorRateLimit: "0x3baCf1B71561467E210BAa51D6650DB5DA99B6b3",
      maxBalance: "0xDbd657fb091f9C87FFA2B1cc35846C876256B51E",
      countryRestrict: "0x7E81D808eC61c0a44e7279f716c21A426566A0F9",
    },
    vaults: {
      susdt: {
        vault: "0x09922D7b6dAcF6Bc2055446977b3A0260d6DD168",
        receiptToken: "0xed138Fea5972f2df30701d1600f5615cdB606724",
        modularCompliance: "0x05222388001F9eb27Ad5d906F92F4646fe3AfF58",
        depositAsset: "0x61c57359a81b9c72F210fCAAE706Aaae799303Df", // mock USDT (Tether absent on Sepolia)
      },
      sweth: {
        vault: "0x35be45bb19C973b2c364490E5603B7926bfdd5B3",
        receiptToken: "0x9b400efB3987a271a9609f11E8E52179934De2b5",
        modularCompliance: "0x12a06A5aAB3E26bC4B326D72A309C641Ec6EE240",
        depositAsset: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14", // canonical Sepolia WETH9
      },
    },
  },
};

export function getOpenAssetsDeployment(
  chainId: number,
): OpenAssetsChainDeployment | undefined {
  return OPENASSETS_DEPLOYMENTS[chainId];
}

export function getOpenAssetsVault(
  chainId: number,
  slug: OpenAssetsVaultSlug,
): OpenAssetsVaultDeployment | undefined {
  return OPENASSETS_DEPLOYMENTS[chainId]?.vaults[slug];
}

export function hasOpenAssetsDeployment(chainId: number): boolean {
  return chainId in OPENASSETS_DEPLOYMENTS;
}
