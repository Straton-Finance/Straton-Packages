---
"@straton/blockchain": patch
---

USDT canônico único por chain (drop USDC + USDT duplicado)

O sTBILL passa a usar o **USDT canônico por chain** como `depositAsset` — Eth Sep `0x61c57359…` (USDT da OpenAssets, o mesmo do sUSDT) e Base Sep `0xA895b2f8…`. Antes o stack do sTBILL apontava pra um MockUSDT próprio (`0xDBf2…`, Eth) que o vault aceitava mas o cliente não segurava → modal "Balance: 0". Causa-raiz: dois contratos diferentes, ambos `symbol "USDT"`.

Mudanças:
- `deployments/multivault-{11155111,84532}.json`: `contracts.mockUSDC` removido; `mockUSDT` → `canonicalUSDT` (Eth → `0x61c5…`).
- `src/generated/deployments.ts` (codegen): `stbill` Eth `depositAsset` `0xDBf2…` → `0x61c5…`.
- `STABLECOINS`/`STABLECOINS_BY_CHAIN`: removidas as entradas de USDC (mock) de Eth Sep + Base Sep; sTBILL vira USDT-only no testnet.

**BREAKING** (consumidores first-party já migrados — FE `staging` usa `getVaultDeployment`/`listVaultDeployments`; backend não consome): removidos `getMockUSDCAddress` e `getMockUSDTAddress` e os campos `ChainContracts.mockUSDC`/`mockUSDT`. Usar `getCanonicalUSDTAddress` / `ChainContracts.canonicalUSDT`, ou o modelo unificado `getVaultDeployment`.
