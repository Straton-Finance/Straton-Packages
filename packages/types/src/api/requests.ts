import type { AssetType, Chain } from '../domain/asset';
import type { OrderSide, OrderType } from '../domain/order';

export interface PaginationParams {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateAssetRequest {
  assetType: AssetType;
  name: string;
  symbol: string;
  description?: string;
  underlyingAsset: {
    type: string;
    description: string;
    valuation: number;
    valuationCurrency: string;
  };
  eligibleJurisdictions: string[];
}

export interface CreateOfferingRequest {
  assetId: string;
  pricePerToken: number;
  currency: string;
  minInvestment?: number;
  maxInvestment?: number;
  softCap?: number;
  hardCap?: number;
  tokensAvailable: string;
  startsAt?: string;
  endsAt?: string;
}

export interface CreateOrderRequest {
  assetId: string;
  walletId: string;
  orderSide: OrderSide;
  orderType: OrderType;
  quantity: string;
  price?: number;
  expiresAt?: string;
}

export interface CreateVaultDepositRequest {
  vaultId: string;
  walletId: string;
  amount: number;
}

export interface CreateLendingPositionRequest {
  collateralAssetId: string;
  collateralAmount: string;
  borrowAmount: number;
  chain: Chain;
}

export interface TokenizeAssetRequest {
  assetId: string;
  chain: Chain;
  totalSupply: string;
  decimals?: number;
  complianceModules?: string[];
}
