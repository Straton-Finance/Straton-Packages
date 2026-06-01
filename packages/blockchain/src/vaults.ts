import type { Address } from "viem";

import { VAULTS, VAULT_GOVERNANCE } from "./generated/deployments";
import { getActiveChainId } from "./addresses";

/**
 * Modelo único de vault (substitui a coexistência CONTRACT_ADDRESSES (flat) +
 * OPENASSETS_DEPLOYMENTS (rico)). Gerado por codegen a partir de
 * `deployments/*.json` — ver decision `2026-06-01-unified-vault-model-codegen`.
 *
 * Core (todo vault) + campos opcionais best-effort. Não importa o legacy:
 * os helpers antigos (`getTbillTokenAddress`, `getVaultAddress`, etc.) seguem
 * exportados de `addresses.ts` como **deprecated** por 1 minor.
 */

export const VAULT_SLUGS = ["stbill", "susdt", "sweth"] as const;
export type VaultSlug = (typeof VAULT_SLUGS)[number];

export interface VaultDeployment {
  slug: VaultSlug;
  chainId: number;
  /** Vault proxy (TransparentUpgradeableProxy). */
  vault: Address;
  /** ERC-3643 receipt token (RWAToken) proxy. */
  token: Address;
  /** ERC-20 aceito no depósito. */
  depositAsset: Address;
  /** Decimais do depositAsset (6 = USDT/USDC, 18 = WETH). */
  depositAssetDecimals: number;
  /** ModularCompliance 1:1 com o token (quando registrado no deployment). */
  modularCompliance?: Address;
}

export interface VaultGovernance {
  /** TimelockController(48h) — dono do ProxyAdmin. */
  timelock?: Address;
  /** Cold Safe — DEFAULT_ADMIN/AGENT. */
  coldSafe?: Address;
}

/** Deployment de um vault numa chain (undefined se não deployado lá). */
export function getVaultDeployment(
  slug: VaultSlug,
  chainId?: number,
): VaultDeployment | undefined {
  const id = chainId ?? getActiveChainId();
  return VAULTS[id]?.[slug] as VaultDeployment | undefined;
}

/** Todos os vaults deployados numa chain (vazio se nenhum). */
export function listVaultDeployments(chainId?: number): VaultDeployment[] {
  const id = chainId ?? getActiveChainId();
  const bySlug = VAULTS[id] ?? {};
  return VAULT_SLUGS.map((s) => bySlug[s]).filter(
    (v): v is VaultDeployment => v !== undefined,
  );
}

/** Chains onde o slug está deployado. */
export function vaultSupportedChainIds(slug: VaultSlug): number[] {
  return Object.keys(VAULTS)
    .map(Number)
    .filter((id) => VAULTS[id]?.[slug] !== undefined)
    .sort((a, b) => a - b);
}

/** TimelockController(48h) da chain (undefined se não registrado). */
export function getTimelockAddress(chainId?: number): Address | undefined {
  const id = chainId ?? getActiveChainId();
  return VAULT_GOVERNANCE[id]?.timelock;
}

export { VAULTS, VAULT_GOVERNANCE };
