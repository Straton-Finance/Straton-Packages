---
"@straton/blockchain": minor
---

Repoint Base Sepolia (84532) addresses to the C2/R3 redeploy (2026-05-22). The
pre-R3 stack (token `0xb229…` / vault `0x7f7c…`) is dead/orphan on Base Sepolia
and was superseded because its `setWhitelisted` required the monolithic
`AGENT_ROLE`. New stack: token `0x04EF…`, vault `0x7688…`, tokenFactory
`0xceB6…`, mock USDC `0x4df8…` / USDT `0xA895…`. `stfToken` kept (verified on
Base Sepolia). All addresses verified on-chain. Eth Sepolia (11155111) unchanged.
