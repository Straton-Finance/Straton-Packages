import type { Address } from "viem";

import { STRETF } from "./generated/deployments";
import { getActiveChainId } from "./addresses";

/**
 * strETF — wrapper composável ERC-3643 (StrETFWrapper). Embrulha um security
 * token já emitido (`asset`, ex. equity da Open Assets) num recibo ERC-3643
 * (`receipt`, strETF) 1:1 usável no perímetro DeFi permissionado da Straton.
 *
 * Shape própria (NÃO é `VaultSlug`): o motor é wrap síncrono + unwrap async
 * (request/fulfill/cancel), não o deposit→mint do `Vault`. Gerado por codegen a
 * partir de `deployments/stretf-*.json` (espelho de Straton-Contracts).
 */

export interface StrETFGovernance {
  /** TimelockController(48h) — dono do ProxyAdmin (cadeia Cold Safe → Timelock → ProxyAdmin). */
  timelock?: Address;
  /** ProxyAdmin do wrapper (auto-deployado pelo TransparentUpgradeableProxy). */
  proxyAdmin?: Address;
  /** Cold Safe — DEFAULT_ADMIN/OPERATOR. */
  coldSafe?: Address;
}

export interface StrETFDeployment {
  chainId: number;
  /** StrETFWrapper proxy (TransparentUpgradeableProxy). */
  wrapper: Address;
  /** Underlying ERC-3643 embrulhado (em testnet: RWAToken Straton stand-in do token OA). */
  asset: Address;
  /** Recibo ERC-3643 (strETF) mintado/queimado 1:1 pelo wrapper. */
  receipt: Address;
  /** Decimais do asset (ERC-3643 = 18). */
  assetDecimals: number;
  /** Decimais do receipt (ERC-3643 = 18). */
  receiptDecimals: number;
  /** ModularCompliance bound ao asset. */
  assetCompliance: Address;
  /** ModularCompliance bound ao receipt. */
  receiptCompliance: Address;
  /** IdentityRegistry do receipt. `0x0` = regime de whitelist plana (v1 by design). */
  identityRegistry: Address;
  governance: StrETFGovernance;
}

/**
 * Ciclo de vida do unwrap assíncrono (forma ERC-7540). Contrato de tipo único
 * compartilhado entre FE e backend — alinhe qualquer status a este union.
 */
export type StrETFUnwrapStatus = "pending" | "fulfilled" | "cancelled";

/** Deployment do strETF numa chain (undefined se não deployado lá). */
export function getStrETFDeployment(
  chainId?: number,
): StrETFDeployment | undefined {
  const id = chainId ?? getActiveChainId();
  return STRETF[id];
}

/** Todos os deployments de strETF, em ordem numérica de chainId. */
export function listStrETFDeployments(): StrETFDeployment[] {
  return stretfSupportedChainIds().map((id) => STRETF[id]);
}

/** Chains onde o strETF está deployado, em ordem numérica. */
export function stretfSupportedChainIds(): number[] {
  return Object.keys(STRETF)
    .map(Number)
    .sort((a, b) => a - b);
}

export { STRETF };
