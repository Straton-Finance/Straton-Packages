---
"@straton-finance/blockchain": major
"@straton-finance/config": major
"@straton-finance/types": major
"@straton-finance/utils": major
---

First stable release published to GitHub Packages.

- `@straton-finance/blockchain` exposes Straton contract ABIs (RWAToken, Vault, TokenFactory, ERC20) + per-chain deployed addresses + stablecoin registry. Peer dep: viem ^2.
- `@straton-finance/types` exposes Supabase DB types, domain models, shared API types.
- `@straton-finance/utils` exposes `cn()`, formatters, Zod validators, chain/token constants.
- `@straton-finance/config` exposes shared ESLint, Prettier, TypeScript configs.

This enables Straton-Backend to consume `@straton-finance/blockchain` from GitHub Packages and remove the inline ABIs in `services/api/src/lib/{whitelister,minter}.ts` plus the placeholder 501 in `proof-of-reserve` cron.
