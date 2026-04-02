/**
 * Supported chain IDs
 */
export const CHAIN_IDS = {
  ETHEREUM: 1,
  ETHEREUM_SEPOLIA: 11155111,
  POLYGON: 137,
  ARBITRUM: 42161,
  AVALANCHE: 43114,
  AVALANCHE_FUJI: 43113,
  BASE: 8453,
  POLYGON_AMOY: 80002,
  ARBITRUM_SEPOLIA: 421614,
  BASE_SEPOLIA: 84532,
} as const;

/**
 * Chain names
 */
export const CHAIN_NAMES: Record<number, string> = {
  [CHAIN_IDS.ETHEREUM]: 'Ethereum',
  [CHAIN_IDS.ETHEREUM_SEPOLIA]: 'Ethereum Sepolia',
  [CHAIN_IDS.POLYGON]: 'Polygon',
  [CHAIN_IDS.ARBITRUM]: 'Arbitrum',
  [CHAIN_IDS.AVALANCHE]: 'Avalanche',
  [CHAIN_IDS.AVALANCHE_FUJI]: 'Avalanche Fuji',
  [CHAIN_IDS.BASE]: 'Base',
  [CHAIN_IDS.POLYGON_AMOY]: 'Polygon Amoy',
  [CHAIN_IDS.ARBITRUM_SEPOLIA]: 'Arbitrum Sepolia',
  [CHAIN_IDS.BASE_SEPOLIA]: 'Base Sepolia',
};

/**
 * Chain metadata for multi-chain support
 */
export const CHAIN_METADATA: Record<
  number,
  {
    isEvm: boolean;
    isTestnet: boolean;
    explorerUrl: string;
    nativeCurrency: string;
  }
> = {
  [CHAIN_IDS.ETHEREUM]: {
    isEvm: true,
    isTestnet: false,
    explorerUrl: 'https://etherscan.io',
    nativeCurrency: 'ETH',
  },
  [CHAIN_IDS.ETHEREUM_SEPOLIA]: {
    isEvm: true,
    isTestnet: true,
    explorerUrl: 'https://sepolia.etherscan.io',
    nativeCurrency: 'ETH',
  },
  [CHAIN_IDS.POLYGON]: {
    isEvm: true,
    isTestnet: false,
    explorerUrl: 'https://polygonscan.com',
    nativeCurrency: 'MATIC',
  },
  [CHAIN_IDS.ARBITRUM]: {
    isEvm: true,
    isTestnet: false,
    explorerUrl: 'https://arbiscan.io',
    nativeCurrency: 'ETH',
  },
  [CHAIN_IDS.AVALANCHE]: {
    isEvm: true,
    isTestnet: false,
    explorerUrl: 'https://snowtrace.io',
    nativeCurrency: 'AVAX',
  },
  [CHAIN_IDS.AVALANCHE_FUJI]: {
    isEvm: true,
    isTestnet: true,
    explorerUrl: 'https://testnet.snowtrace.io',
    nativeCurrency: 'AVAX',
  },
  [CHAIN_IDS.BASE]: {
    isEvm: true,
    isTestnet: false,
    explorerUrl: 'https://basescan.org',
    nativeCurrency: 'ETH',
  },
  [CHAIN_IDS.POLYGON_AMOY]: {
    isEvm: true,
    isTestnet: true,
    explorerUrl: 'https://amoy.polygonscan.com',
    nativeCurrency: 'MATIC',
  },
  [CHAIN_IDS.ARBITRUM_SEPOLIA]: {
    isEvm: true,
    isTestnet: true,
    explorerUrl: 'https://sepolia.arbiscan.io',
    nativeCurrency: 'ETH',
  },
  [CHAIN_IDS.BASE_SEPOLIA]: {
    isEvm: true,
    isTestnet: true,
    explorerUrl: 'https://sepolia.basescan.org',
    nativeCurrency: 'ETH',
  },
};

/**
 * Token decimals
 */
export const TOKEN_DECIMALS = {
  DEFAULT: 18,
  USDC: 6,
  USDT: 6,
} as const;

/**
 * Common token addresses (mainnet)
 */
export const TOKEN_ADDRESSES = {
  USDC: {
    [CHAIN_IDS.ETHEREUM]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    [CHAIN_IDS.POLYGON]: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    [CHAIN_IDS.ARBITRUM]: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    [CHAIN_IDS.BASE]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  },
} as const;

/**
 * Risk parameters by asset type
 */
export const RISK_PARAMETERS = {
  REAL_ESTATE: { maxLTV: 0.7, liquidationThreshold: 0.8, interestBase: 0.12 },
  CREDIT: { maxLTV: 0.6, liquidationThreshold: 0.75, interestBase: 0.15 },
  COMMODITY: { maxLTV: 0.5, liquidationThreshold: 0.65, interestBase: 0.18 },
  EQUITY: { maxLTV: 0.5, liquidationThreshold: 0.65, interestBase: 0.16 },
} as const;

/**
 * KYC status labels
 */
export const KYC_STATUS_LABELS = {
  PENDING: 'Pendente',
  IN_REVIEW: 'Em análise',
  VERIFIED: 'Verificado',
  REJECTED: 'Rejeitado',
  EXPIRED: 'Expirado',
} as const;

/**
 * Accreditation level labels
 */
export const ACCREDITATION_LABELS = {
  RETAIL: 'Varejo',
  QUALIFIED: 'Qualificado',
  PROFESSIONAL: 'Profissional',
} as const;

/**
 * Asset type labels
 */
export const ASSET_TYPE_LABELS = {
  REAL_ESTATE: 'Imobiliário',
  CREDIT: 'Crédito',
  COMMODITY: 'Commodity',
  EQUITY: 'Equity',
} as const;
