// Contract addresses
export {
  type ChainContracts,
  CONTRACT_ADDRESSES,
  hasContractAddresses,
  getActiveChainId,
  getContractAddresses,
  getTokenFactoryAddress,
  getSref1TokenAddress,
  getVaultAddress,
  getMockUSDCAddress,
  getMockUSDTAddress,
  getSafeMultisigAddress,
} from './addresses';

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
} from './stablecoins';

// ABIs
export { erc20Abi } from './abi/erc20';
export { rwaTokenAbi } from './abi/rwa-token';
export { tokenFactoryAbi } from './abi/token-factory';
export { vaultAbi } from './abi/vault';
