# @straton/blockchain

## 1.1.2

### Patch Changes

- 3588059: Publish to the public npmjs.com registry via OIDC Trusted Publishing instead of GitHub Packages. Consumers install with no authentication — no `.npmrc` override, no token, no Actions-access grant. See ADR 0001 Addendum 2026-05-17.
- Updated dependencies [3588059]
  - @straton/utils@1.1.2

## 1.1.1

### Patch Changes

- 1aec810: Fix `exports` map: `require` pointed to a non-existent `./dist/index.cjs` and `import` pointed to the CJS build. tsup (`--format esm,cjs`, no `"type": "module"`) emits CJS as `index.js` and ESM as `index.mjs` — the map now matches reality (`import → .mjs`, `require → .js`), and a `module` field is added.

  Fixes `ERR_MODULE_NOT_FOUND` for every CJS consumer of `@straton/{blockchain,utils,types}`. Bug present since v1.0.0; surfaced by Straton-Backend (first CJS `require()` consumer).
  - @straton/utils@1.1.1

## 1.1.0

### Minor Changes

- b2ac2af: Regenerate `vaultAbi` and `rwaTokenAbi` from `forge inspect` against Straton-Contracts@v0.1.0-stf — full canonical ABIs (Vault: 45 functions / 19 events / 8 errors; RWAToken: 49 functions / 15 events / 12 errors) replacing the hand-curated subsets.

  Fixes `vaultAbi` missing `fulfillWithdraw` / `fulfillWithdrawBatch` (operator-only functions), which blocked the Backend's `withdrawal-fulfiller`.

  ⚠️ `vaultAbi` now contains the overloaded `stablecoinToReceipt` / `receiptToStablecoin` (1-arg and 2-arg signatures) — viem resolves overloads by args at call time; consumers must pass full argument tuples.

  Convention: ABI files are now generated, not hand-edited — regenerate on contract changes. See `Straton-COG/decisions/2026-05-16-abi-regen-strategy.md`.

### Patch Changes

- @straton/utils@1.1.0

## 1.0.0

### Major Changes

- 560da47: First stable release published to GitHub Packages.
  - `@straton/blockchain` exposes Straton contract ABIs (RWAToken, Vault, TokenFactory, ERC20) + per-chain deployed addresses + stablecoin registry. Peer dep: viem ^2.
  - `@straton/types` exposes Supabase DB types, domain models, shared API types.
  - `@straton/utils` exposes `cn()`, formatters, Zod validators, chain/token constants.
  - `@straton/config` exposes shared ESLint, Prettier, TypeScript configs.

  This enables Straton-Backend to consume `@straton/blockchain` from GitHub Packages and remove the inline ABIs in `services/api/src/lib/{whitelister,minter}.ts` plus the placeholder 501 in `proof-of-reserve` cron.

### Patch Changes

- Updated dependencies [560da47]
  - @straton/utils@1.0.0
