export type OrderSide = 'BUY' | 'SELL';

export type OrderType = 'MARKET' | 'LIMIT';

export type OrderStatus = 'PENDING' | 'OPEN' | 'PARTIAL' | 'FILLED' | 'CANCELLED';

export interface Order {
  id: string;
  userId: string;
  walletId: string;
  assetId: string;
  orderSide: OrderSide;
  orderType: OrderType;
  status: OrderStatus;
  quantity: bigint;
  price?: number;
  filledQuantity: bigint;
  averageFillPrice?: number;
  complianceCheckPassed?: boolean;
  complianceCheckDetails?: Record<string, unknown>;
  expiresAt?: Date;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Trade {
  id: string;
  buyOrderId: string;
  sellOrderId: string;
  assetId: string;
  quantity: bigint;
  price: number;
  totalValue: number;
  feeAmount: number;
  settlementStatus: SettlementStatus;
  settlementTxHash?: string;
  settledAt?: Date;
  createdAt: Date;
}

export type SettlementStatus = 'PENDING' | 'SETTLED' | 'FAILED';
