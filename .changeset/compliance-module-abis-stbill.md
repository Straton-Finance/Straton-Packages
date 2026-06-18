---
"@straton/blockchain": patch
---

Export the ERC-3643 compliance read ABIs (`modularComplianceAbi`, `globalRateLimitModuleAbi`, `perInvestorRateLimitModuleAbi`, `maxBalanceModuleAbi`) and add sTBILL's `modularCompliance` (`0xAa24…ce37`, Eth Sepolia) to the deployment model. Unblocks the FE mint pre-check: a deposit can read `getRemainingMintCapacity` BEFORE the user signs, instead of stranding funds when the mint reverts on the per-investor rate limit (`PerInvestorRateLimit__MintLimitExceeded` — note MaxBalance is NOT enforced on mint). sUSDT/sWETH already carried `modularCompliance`; this brings sTBILL to parity.
