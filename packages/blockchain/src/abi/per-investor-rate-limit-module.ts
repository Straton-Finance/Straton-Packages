// AUTO-GENERATED from `forge inspect PerInvestorRateLimitModule abi` (Straton-Contracts@main b9e06bc).
// DO NOT EDIT BY HAND — regenerate when the PerInvestorRateLimitModule contract changes.
// See Straton-COG/decisions/2026-05-16-abi-regen-strategy.md
// Per-investor per-window rate limit. getRemainingMintCapacity(compliance, investor).

export const perInvestorRateLimitModuleAbi = [
  {
    type: "function",
    name: "approveBind",
    inputs: [
      {
        name: "compliance",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "bindCompliance",
    inputs: [
      {
        name: "compliance",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getInvestorState",
    inputs: [
      {
        name: "compliance",
        type: "address",
        internalType: "address",
      },
      {
        name: "investor",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct PerInvestorRateLimitModule.InvestorState",
        components: [
          {
            name: "mintedThisWindow",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "transferredThisWindow",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "windowStart",
            type: "uint64",
            internalType: "uint64",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPerInvestorConfig",
    inputs: [
      {
        name: "compliance",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct PerInvestorRateLimitModule.InvestorConfig",
        components: [
          {
            name: "mintLimit",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "transferOutLimit",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "windowDuration",
            type: "uint32",
            internalType: "uint32",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRemainingMintCapacity",
    inputs: [
      {
        name: "compliance",
        type: "address",
        internalType: "address",
      },
      {
        name: "investor",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRemainingTransferCapacity",
    inputs: [
      {
        name: "compliance",
        type: "address",
        internalType: "address",
      },
      {
        name: "investor",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isApproved",
    inputs: [
      {
        name: "compliance",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isComplianceBound",
    inputs: [
      {
        name: "compliance",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isPlugAndPlay",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "moduleBurnAction",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "moduleCheck",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "compliance",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "moduleMintAction",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "moduleTransferAction",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "revokeApproval",
    inputs: [
      {
        name: "compliance",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPerInvestorConfig",
    inputs: [
      {
        name: "mintLimit",
        type: "uint128",
        internalType: "uint128",
      },
      {
        name: "transferOutLimit",
        type: "uint128",
        internalType: "uint128",
      },
      {
        name: "windowDuration",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unbindCompliance",
    inputs: [
      {
        name: "compliance",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "PerInvestorConfigUpdated",
    inputs: [
      {
        name: "compliance",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "mintLimit",
        type: "uint128",
        indexed: false,
        internalType: "uint128",
      },
      {
        name: "transferOutLimit",
        type: "uint128",
        indexed: false,
        internalType: "uint128",
      },
      {
        name: "windowDuration",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AbstractModule__AlreadyBound",
    inputs: [
      {
        name: "compliance",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "AbstractModule__NotApproved",
    inputs: [
      {
        name: "compliance",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "AbstractModule__NotBound",
    inputs: [
      {
        name: "compliance",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "AbstractModule__OnlyBoundCompliance",
    inputs: [],
  },
  {
    type: "error",
    name: "AbstractModule__OnlyOwner",
    inputs: [],
  },
  {
    type: "error",
    name: "PerInvestorRateLimit__MintLimitExceeded",
    inputs: [
      {
        name: "investor",
        type: "address",
        internalType: "address",
      },
      {
        name: "requested",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "remaining",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "PerInvestorRateLimit__TransferLimitExceeded",
    inputs: [
      {
        name: "investor",
        type: "address",
        internalType: "address",
      },
      {
        name: "requested",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "remaining",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "PerInvestorRateLimit__ZeroWindowDuration",
    inputs: [],
  },
] as const;
