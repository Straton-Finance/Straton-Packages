---
"@straton-finance/blockchain": minor
---

Regenerate `vaultAbi` and `rwaTokenAbi` from `forge inspect` against Straton-Contracts@v0.1.0-stf — full canonical ABIs (Vault: 45 functions / 19 events / 8 errors; RWAToken: 49 functions / 15 events / 12 errors) replacing the hand-curated subsets.

Fixes `vaultAbi` missing `fulfillWithdraw` / `fulfillWithdrawBatch` (operator-only functions), which blocked the Backend's `withdrawal-fulfiller`.

⚠️ `vaultAbi` now contains the overloaded `stablecoinToReceipt` / `receiptToStablecoin` (1-arg and 2-arg signatures) — viem resolves overloads by args at call time; consumers must pass full argument tuples.

Convention: ABI files are now generated, not hand-edited — regenerate on contract changes. See `Straton-COG/decisions/2026-05-16-abi-regen-strategy.md`.
