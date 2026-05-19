---
"@straton/blockchain": patch
---

Repoint Ethereum Sepolia (chainId 11155111) to the B1 C2/R3 redeploy.

The Eth Sepolia stack was redeployed on 2026-05-18 (B1): `vault`, `tbillToken`,
`tokenFactory` and the mock stablecoins all changed. The B1 Vault rejects the
old mock stablecoins (`isAcceptedStablecoin` returns false), so consumers on
Eth Sepolia must pick up the new addresses for deposits to work. `stfToken`
was not redeployed by B1. Base Sepolia (84532) is unchanged. `safeMultisig`
for Eth Sepolia is now set to the live Cold Safe.
