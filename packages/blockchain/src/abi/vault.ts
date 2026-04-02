export const vaultAbi = [
  // Read functions
  {
    type: 'function',
    name: 'receiptToken',
    inputs: [],
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'globalDepositCap',
    inputs: [],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalDeposited',
    inputs: [],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'minDepositAmount',
    inputs: [],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'minWithdrawAmount',
    inputs: [],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isAcceptedStablecoin',
    inputs: [{ name: 'stablecoin', type: 'address' }],
    outputs: [{ type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'nextRequestId',
    inputs: [],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'paused',
    inputs: [],
    outputs: [{ type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getWithdrawRequest',
    inputs: [{ name: 'requestId', type: 'uint256' }],
    outputs: [
      {
        type: 'tuple',
        components: [
          { name: 'id', type: 'uint256' },
          { name: 'user', type: 'address' },
          { name: 'stablecoin', type: 'address' },
          { name: 'receiptAmount', type: 'uint256' },
          { name: 'stablecoinAmount', type: 'uint256' },
          { name: 'requestedAt', type: 'uint64' },
          { name: 'fulfilled', type: 'bool' },
          { name: 'cancelled', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getUserWithdrawRequests',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'stablecoinToReceipt',
    inputs: [{ name: 'stablecoinAmount', type: 'uint256' }],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'receiptToStablecoin',
    inputs: [{ name: 'receiptAmount', type: 'uint256' }],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'pure',
  },

  // Write functions
  {
    type: 'function',
    name: 'deposit',
    inputs: [
      { name: 'stablecoin', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'requestWithdraw',
    inputs: [
      { name: 'stablecoin', type: 'address' },
      { name: 'receiptAmount', type: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'cancelWithdraw',
    inputs: [{ name: 'requestId', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Events
  {
    type: 'event',
    name: 'Deposited',
    inputs: [
      { name: 'user', type: 'address', indexed: true },
      { name: 'stablecoin', type: 'address', indexed: true },
      { name: 'stablecoinAmount', type: 'uint256', indexed: false },
      { name: 'receiptAmount', type: 'uint256', indexed: false },
      { name: 'timestamp', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'WithdrawRequested',
    inputs: [
      { name: 'requestId', type: 'uint256', indexed: true },
      { name: 'user', type: 'address', indexed: true },
      { name: 'stablecoin', type: 'address', indexed: true },
      { name: 'receiptAmount', type: 'uint256', indexed: false },
      { name: 'stablecoinAmount', type: 'uint256', indexed: false },
      { name: 'timestamp', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'WithdrawFulfilled',
    inputs: [
      { name: 'requestId', type: 'uint256', indexed: true },
      { name: 'user', type: 'address', indexed: true },
      { name: 'stablecoinAmount', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'WithdrawCancelled',
    inputs: [
      { name: 'requestId', type: 'uint256', indexed: true },
      { name: 'user', type: 'address', indexed: true },
      { name: 'receiptAmount', type: 'uint256', indexed: false },
    ],
  },
] as const;
