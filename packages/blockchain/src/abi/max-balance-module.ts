// AUTO-GENERATED from `forge inspect MaxBalanceModule abi` (Straton-Contracts@main b9e06bc).
// DO NOT EDIT BY HAND — regenerate when the MaxBalanceModule contract changes.
// See Straton-COG/decisions/2026-05-16-abi-regen-strategy.md
// Per-holder max balance cap. getMaxBalance(compliance). NOTE: not enforced on mint (moduleCheck skipped when from==0).

export const maxBalanceModuleAbi = [
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
    name: "getMaxBalance",
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
        name: "",
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
    name: "moduleTransferAction",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
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
    name: "setMaxBalance",
    inputs: [
      {
        name: "max",
        type: "uint256",
        internalType: "uint256",
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
    name: "MaxBalanceSet",
    inputs: [
      {
        name: "compliance",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "maxBalance",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
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
    name: "MaxBalanceModule__ZeroValue",
    inputs: [],
  },
] as const;
