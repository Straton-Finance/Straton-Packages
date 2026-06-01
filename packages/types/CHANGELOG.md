# @straton/types

## 1.4.0

## 1.3.0

## 1.2.0

## 1.1.3

## 1.1.2

### Patch Changes

- 3588059: Publish to the public npmjs.com registry via OIDC Trusted Publishing instead of GitHub Packages. Consumers install with no authentication — no `.npmrc` override, no token, no Actions-access grant. See ADR 0001 Addendum 2026-05-17.

## 1.1.1

## 1.1.0

## 1.0.0

### Major Changes

- 560da47: First stable release published to GitHub Packages.
  - `@straton/blockchain` exposes Straton contract ABIs (RWAToken, Vault, TokenFactory, ERC20) + per-chain deployed addresses + stablecoin registry. Peer dep: viem ^2.
  - `@straton/types` exposes Supabase DB types, domain models, shared API types.
  - `@straton/utils` exposes `cn()`, formatters, Zod validators, chain/token constants.
  - `@straton/config` exposes shared ESLint, Prettier, TypeScript configs.

  This enables Straton-Backend to consume `@straton/blockchain` from GitHub Packages and remove the inline ABIs in `services/api/src/lib/{whitelister,minter}.ts` plus the placeholder 501 in `proof-of-reserve` cron.
