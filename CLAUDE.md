# Straton Packages

Shared TypeScript packages for the Straton RWAFi platform, published as public packages on npmjs.com under `@straton/*`.

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| @straton/types | 0.2.0 | Supabase DB types, domain models, API types. Zero runtime deps. |
| @straton/utils | 0.2.0 | `cn()`, formatters, Zod validators, constants (`CHAIN_IDS`, `TOKEN_DECIMALS`). |
| @straton/blockchain | 0.1.0 | Deployed addresses per chain, stablecoin registry, ABIs. Peer dep: viem ^2. |
| @straton/config | 0.2.0 | ESLint, TypeScript, Prettier shared configs. |

## Commands

```bash
pnpm build          # Build all packages (via Turbo)
pnpm test           # Run all tests
pnpm typecheck      # Type-check all packages
pnpm lint           # Lint all packages
pnpm clean          # Remove dist/ and node_modules/
pnpm changeset      # Create a changeset for versioning
```

## Publishing Workflow

```
Code change -> pnpm changeset -> PR to main -> merge -> GitHub Action publishes
```

Registry: public npmjs.com (default). Published via OIDC Trusted Publishing — `publish.yml` runs on `v*` tags with no token. Consumers install with no auth (no `.npmrc`, no token). See ADR 0001 Addendum 2026-05-17 in Straton-COG.

## Updating ABIs from Contracts

```bash
# After forge build in Straton-Contracts
cp out/RWAToken.sol/RWAToken.json ../Straton-Packages/packages/blockchain/src/abi/
pnpm --filter @straton/blockchain build
```

**Note**: blockchain package needs new ABIs for STRToken, xSTR, FeeCollector.

## Regenerating Supabase Types

```bash
npx supabase gen types typescript --project-id adxgjsgpqotoqhludhjw --schema public > packages/types/src/database.ts
```

## Supported Chains (10)

Ethereum (1), Ethereum Sepolia (11155111), Polygon (137), Polygon Amoy (80002), Arbitrum (42161), Arbitrum Sepolia (421614), Base (8453), Base Sepolia (84532), Avalanche (43114), Avalanche Fuji (43113)

## Requirements

Node.js >= 22, pnpm >= 9.15

## Git Workflow

Flow: `dev` -> `test` -> `main`. PR required for `main` and `test`.

**Git hooks (husky):**
- Pre-commit: `lint-staged` (prettier on staged .ts files)
- Commit-msg: `commitlint` — conventional commits required
- Pre-push: `build` + `typecheck`

**Scopes**: types, utils, blockchain, config, deps, ci

## Related Repos

- [Straton-Frontend](https://github.com/Straton-Finance/Straton-Frontend)
- [Straton-Backend](https://github.com/Straton-Finance/Straton-Backend)
- [Straton-Contracts](https://github.com/Straton-Finance/Straton-Contracts)

## Project Vault

Cross-repo planning, audits, ADRs, runbooks, threat model drafts e decision logs vivem em [Straton-COG](https://github.com/Straton-Finance/Straton-COG) — **NÃO neste repo**.

`CLAUDE.md` e `docs/` locais contêm apenas instruções de build/dev/deploy específicas deste repo. Para qualquer planejamento cross-repo, audit, ou decisão arquitetural compartilhada com Felipe/Bruno: consultar e contribuir no Straton-COG.
