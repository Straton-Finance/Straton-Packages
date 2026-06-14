---
"@straton/blockchain": patch
---

strETF Eth Sepolia re-pointed to the MockOAVault mock-asset deployment (ERC-4626-style, permissionless asset + public faucet — matches OA's real ERC-4626 per Gui 2026-06-14). New addresses: wrapper `0x5606…Aa41`, asset `0x1A6F…167C`, receipt `0x0Df2…C0c7`, receiptCompliance `0xd699…f604`; `assetCompliance` is now `0x0` (the asset is permissionless — the permissioned perimeter lives only in the strETF receipt). Replaces the prior ERC-3643-asset strETF. Unblocks Bruno's self-serve `/stretf` smoke via the public faucet.
