---
"@straton/blockchain": minor
---

Add KAN-17 / OpenAssets vault deployment on Eth Sepolia (chainId 11155111) as a parallel structure (`OPENASSETS_DEPLOYMENTS`, `getOpenAssetsDeployment`, `getOpenAssetsVault`). Two non-custodial vaults: `susdt` (accepts mock USDT) and `sweth` (accepts canonical Sepolia WETH9 `0xfFf9976782...6B14`). Deploy ran 2026-05-20 in dedicated-deployer mode — the deployer EOA holds zero operational role post-deploy; backend hot key (`0xc8A0...eF86`) is the sole holder of `MINTER` / `WHITELIST_AGENT` / `PAUSER` on receipts and `PAUSER` on vaults.

Kept separate from the existing single-vault `CONTRACT_ADDRESSES` schema on purpose: KAN-17 is the OpenAssets vetting demo, distinct from the Midas sTBILL/sGLOBAL/sBASIS product line. The schemas converge once Bruno's in-flight single-vault repoint (PR #8) lands.
