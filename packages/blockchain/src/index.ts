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
  getMockUSDCAddress,
  getMockUSDTAddress,
  getSafeMultisigAddress,
} from "./addresses";

// KAN-17 / OpenAssets vault deployments (separate product line from sTBILL Midas)
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
