// Contract addresses
export {
  type ChainContracts,
  CONTRACT_ADDRESSES,
  hasContractAddresses,
  getActiveChainId,
  getContractAddresses,
  getStfTokenAddress,
  getTbillTokenAddress,
  getTokenFactoryAddress,
  getVaultAddress,
  getCanonicalUSDTAddress,
  getSafeMultisigAddress,
} from "./addresses";

// Unified vault model (codegen de deployments/*.json) — modelo único que
// converge CONTRACT_ADDRESSES (flat) + OPENASSETS_DEPLOYMENTS (rico).
// Ver decision 2026-06-01-unified-vault-model-codegen.
export {
  type VaultSlug,
  type VaultDeployment,
  type VaultGovernance,
  VAULT_SLUGS,
  VAULTS,
  VAULT_GOVERNANCE,
  getVaultDeployment,
  listVaultDeployments,
  vaultSupportedChainIds,
  getTimelockAddress,
} from "./vaults";

// KAN-17 / OpenAssets vault deployments (separate product line from sTBILL Midas).
// @deprecated desde 1.4.0 — usar o modelo unificado acima (getVaultDeployment/VAULTS).
// Mantido por 1 minor; removido no próximo major.
export {
  type OpenAssetsVaultSlug,
  type OpenAssetsVaultDeployment,
  type OpenAssetsChainDeployment,
  OPENASSETS_VAULT_SLUGS,
  OPENASSETS_DEPLOYMENTS,
  getOpenAssetsDeployment,
  getOpenAssetsVault,
  hasOpenAssetsDeployment,
} from "./openassets-vaults";

// strETF — wrapper composável ERC-3643 (StrETFWrapper). Product line própria,
// não é VaultSlug. Ver src/stretf.ts.
export {
  type StrETFDeployment,
  type StrETFGovernance,
  type StrETFUnwrapStatus,
  STRETF,
  getStrETFDeployment,
  listStrETFDeployments,
  stretfSupportedChainIds,
} from "./stretf";

// Stablecoin configuration
export {
  type StablecoinConfig,
  STABLECOINS,
  STABLECOINS_BY_CHAIN,
  getStablecoinsForChain,
  STABLECOIN_DECIMALS,
  RECEIPT_TOKEN_DECIMALS,
  DECIMAL_CONVERSION_FACTOR,
  ERROR_MESSAGE_MAX_LENGTH,
} from "./stablecoins";

// ABIs
export { erc20Abi } from "./abi/erc20";
export { rwaTokenAbi } from "./abi/rwa-token";
export { tokenFactoryAbi } from "./abi/token-factory";
export { vaultAbi } from "./abi/vault";
export { stfTokenAbi } from "./abi/stf-token";
export { xstfAbi } from "./abi/xstf";
export { stfVestingAbi } from "./abi/stf-vesting";
export { feeCollectorAbi } from "./abi/fee-collector";
export { stretfWrapperAbi } from "./abi/stretf-wrapper";
