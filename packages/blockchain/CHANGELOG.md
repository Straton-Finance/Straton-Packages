# @straton/blockchain

## 1.4.0

### Minor Changes

- 8221503: Modelo único de vault via codegen de `deployments/*.json`.

  Converge os dois modelos paralelos (`CONTRACT_ADDRESSES` flat + `OPENASSETS_DEPLOYMENTS` rico) num modelo único gerado por codegen, eliminando a transcrição à mão de endereços (raiz do drift Base Sep de 2026-05-22). Item 4 do RED ALERT do Bruno; ver decision `2026-06-01-unified-vault-model-codegen`.

  **Aditivo (não-breaking):**
  - Novo: `getVaultDeployment(slug, chainId?)`, `listVaultDeployments(chainId?)`, `vaultSupportedChainIds(slug)`, `getTimelockAddress(chainId?)`, `VAULTS`, `VAULT_GOVERNANCE`, tipos `VaultSlug`/`VaultDeployment`/`VaultGovernance`, `VAULT_SLUGS`.
  - `src/generated/deployments.ts` gerado de `deployments/*.json`; drift-check no CI (`codegen:check`). Endereços byte-idênticos ao 1.3.0.

  **Deprecado (removido no próximo major):** `OPENASSETS_DEPLOYMENTS` + helpers KAN-17. `CONTRACT_ADDRESSES`/`getTbillTokenAddress`/`getVaultAddress` seguem por enquanto.

### Patch Changes

- @straton/utils@1.4.0

## 1.3.0

### Minor Changes

- f228686: Repoint Base Sepolia (84532) addresses to the C2/R3 redeploy (2026-05-22). The
  pre-R3 stack (token `0xb229…` / vault `0x7f7c…`) is dead/orphan on Base Sepolia
  and was superseded because its `setWhitelisted` required the monolithic
  `AGENT_ROLE`. New stack: token `0x04EF…`, vault `0x7688…`, tokenFactory
  `0xceB6…`, mock USDC `0x4df8…` / USDT `0xA895…`. `stfToken` kept (verified on
  Base Sepolia). All addresses verified on-chain. Eth Sepolia (11155111) unchanged.

### Patch Changes

- @straton/utils@1.3.0

## 1.2.0

### Minor Changes

- b43b718: Add KAN-17 / OpenAssets vault deployment on Eth Sepolia (chainId 11155111) as a parallel structure (`OPENASSETS_DEPLOYMENTS`, `getOpenAssetsDeployment`, `getOpenAssetsVault`). Two non-custodial vaults: `susdt` (accepts mock USDT) and `sweth` (accepts canonical Sepolia WETH9 `0xfFf9976782...6B14`). Deploy ran 2026-05-20 in dedicated-deployer mode — the deployer EOA holds zero operational role post-deploy; backend hot key (`0xc8A0...eF86`) is the sole holder of `MINTER` / `WHITELIST_AGENT` / `PAUSER` on receipts and `PAUSER` on vaults.

  Kept separate from the existing single-vault `CONTRACT_ADDRESSES` schema on purpose: KAN-17 is the OpenAssets vetting demo, distinct from the Midas sTBILL/sGLOBAL/sBASIS product line. The schemas converge once Bruno's in-flight single-vault repoint (PR #8) lands.

### Patch Changes

- @straton/utils@1.2.0

## 1.1.3

### Patch Changes

- 82d109e: Repoint Ethereum Sepolia (chainId 11155111) to the B1 C2/R3 redeploy.

  The Eth Sepolia stack was redeployed on 2026-05-18 (B1): `vault`, `tbillToken`,
  `tokenFactory` and the mock stablecoins all changed. The B1 Vault rejects the
  old mock stablecoins (`isAcceptedStablecoin` returns false), so consumers on
  Eth Sepolia must pick up the new addresses for deposits to work. `stfToken`
  was not redeployed by B1. Base Sepolia (84532) is unchanged. `safeMultisig`
  for Eth Sepolia is now set to the live Cold Safe.
  - @straton/utils@1.1.3

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
