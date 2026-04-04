# Straton Packages

[![CI](https://github.com/Straton-Finance/Straton-Packages/actions/workflows/ci.yml/badge.svg)](https://github.com/Straton-Finance/Straton-Packages/actions/workflows/ci.yml)
[![Publish](https://github.com/Straton-Finance/Straton-Packages/actions/workflows/publish.yml/badge.svg)](https://github.com/Straton-Finance/Straton-Packages/actions/workflows/publish.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Shared packages for the **Straton RWAFi** (Real World Asset Finance) platform. This repository contains TypeScript libraries consumed by [Straton-Frontend](https://github.com/Straton-Finance/Straton-Frontend) and [Straton-Backend](https://github.com/Straton-Finance/Straton-Backend), published to GitHub Packages under the `@straton-finance` scope.

---

## Packages

| Package | Version | Description |
| --- | --- | --- |
| [`@straton-finance/types`](packages/types) | `0.2.0` | TypeScript types — Supabase DB (auto-generated), domain models, API request/response, CMS, blockchain. Zero runtime dependencies. |
| [`@straton-finance/utils`](packages/utils) | `0.2.0` | Shared utilities — `cn()`, formatting helpers, Zod validation schemas, constants (`CHAIN_IDS`, `CHAIN_NAMES`, `TOKEN_DECIMALS`, etc.). |
| [`@straton-finance/blockchain`](packages/blockchain) | `0.1.0` | Contract data — deployed addresses per chain, stablecoin registry, ABI definitions (ERC20, RWAToken, Vault, TokenFactory). Peer dep: `viem ^2`. |
| [`@straton-finance/config`](packages/config) | `0.2.0` | Shared configs — ESLint (base/nextjs/node), TypeScript (base/nextjs/node/react-library), Prettier with Tailwind plugin. |

---

## Installation

### 1. Configure GitHub Packages registry

Create or update `.npmrc` in your project root:

```ini
@straton-finance:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Generate a GitHub Personal Access Token (classic) with the `read:packages` scope and export it:

```bash
export GITHUB_TOKEN=ghp_your_token_here
```

### 2. Install packages

```bash
# Types only (zero deps)
pnpm add @straton-finance/types

# Utilities
pnpm add @straton-finance/utils

# Blockchain (requires viem ^2 as peer)
pnpm add @straton-finance/blockchain

# Configs (devDependencies)
pnpm add -D @straton-finance/config
```

---

## Development Setup

### Prerequisites

- **Node.js** >= 22
- **pnpm** >= 9
- **Turborepo** (installed globally or via `npx`)

### Getting started

```bash
# Clone the repo
git clone git@github.com:Straton-Finance/Straton-Packages.git
cd straton-packages

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint and type-check
pnpm lint
pnpm typecheck
```

### Useful commands

| Command | Description |
| --- | --- |
| `pnpm build` | Build all packages (via Turborepo) |
| `pnpm test` | Run all tests |
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | Type-check all packages |
| `pnpm dev` | Watch mode for all packages |
| `pnpm clean` | Remove all `dist/` and `node_modules/` |

---

## Adding or Updating a Package

### Create a new package

```bash
mkdir packages/my-package
cd packages/my-package

# Initialize with the standard structure
cat > package.json << 'EOF'
{
  "name": "@straton-finance/my-package",
  "version": "0.1.0",
  "private": false,
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "test": "vitest run",
    "lint": "eslint src/",
    "typecheck": "tsc --noEmit"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
EOF
```

Add it to the Turborepo pipeline in `turbo.json` if it requires custom build steps.

### Update an existing package

1. Make your changes in `packages/<name>/src/`.
2. Run `pnpm build` and `pnpm test` to verify.
3. Create a changeset (see [Versioning](#versioning--publishing) below).

---

## Versioning & Publishing

This repo uses [Changesets](https://github.com/changesets/changesets) for version management and automated publishing.

### Workflow

```
Code change → pnpm changeset → PR → Merge → Tag release → GitHub Action publishes
```

### Step by step

1. **Create a changeset** after making changes:

   ```bash
   pnpm changeset
   ```

   Select the affected packages, bump type (`patch`, `minor`, `major`), and write a summary.

2. **Commit** the generated `.changeset/*.md` file along with your code changes.

3. **Open a PR** to `main`. CI runs build, lint, typecheck, and tests.

4. **Merge the PR**. The Changesets GitHub Action opens a "Version Packages" PR that bumps versions and updates changelogs.

5. **Merge the Version PR**. The publish workflow triggers automatically:
   - Builds all packages.
   - Publishes updated packages to GitHub Packages.
   - Creates git tags (e.g., `@straton-finance/utils@0.3.0`).

### Manual publish (emergency)

```bash
pnpm changeset version   # Apply version bumps locally
pnpm build               # Build all packages
pnpm changeset publish   # Publish to GitHub Packages
```

---

## Regenerating Supabase Types

The `@straton-finance/types` package includes auto-generated Supabase database types.

```bash
# Ensure you have the Supabase CLI installed and are linked to the project
npx supabase gen types typescript \
  --project-id adxgjsgpqotoqhludhjw \
  --schema public \
  > packages/types/src/database.ts

# Rebuild the types package
pnpm --filter @straton-finance/types build
```

Run this after any Supabase migration to keep types in sync. Always commit the regenerated file alongside the migration that caused the change.

---

## Updating ABIs from Contract Builds

After building or deploying contracts in the [Straton contracts repo](https://github.com/Straton-Finance/Straton-Contracts):

```bash
# From the contracts repo, after running `forge build`
# Copy the relevant ABI JSON files into the blockchain package

cp out/RWAToken.sol/RWAToken.json   ../straton-packages/packages/blockchain/src/abi/rwa-token.json
cp out/Vault.sol/Vault.json         ../straton-packages/packages/blockchain/src/abi/vault.json
cp out/TokenFactory.sol/TokenFactory.json ../straton-packages/packages/blockchain/src/abi/token-factory.json

# Rebuild
pnpm --filter @straton-finance/blockchain build
```

Update the `addresses.ts` file with any new deployment addresses, organized by chain ID.

---

## CI/CD

### Continuous Integration (`ci.yml`)

Runs on every push and pull request:

- **Install** — `pnpm install --frozen-lockfile`
- **Build** — `pnpm build` (all packages via Turborepo)
- **Lint** — `pnpm lint`
- **Typecheck** — `pnpm typecheck`
- **Test** — `pnpm test`

### Publish (`publish.yml`)

Runs on push to `main` when changesets are present:

- Builds all packages.
- Publishes to GitHub Packages (`npm.pkg.github.com`).
- Creates git tags for each released version.

### Branch protection

- `main` requires passing CI and at least one approval.
- Never push directly to `main`. Use feature branches and pull requests.

---

## Project Structure

```
straton-packages/
├── .changeset/           # Changeset config and pending changesets
├── .github/
│   └── workflows/
│       ├── ci.yml        # Build + lint + test on PRs
│       └── publish.yml   # Publish to GitHub Packages on merge
├── packages/
│   ├── blockchain/       # @straton-finance/blockchain — ABIs, addresses, stablecoin registry
│   ├── config/           # @straton-finance/config — ESLint, TypeScript, Prettier configs
│   ├── types/            # @straton-finance/types — Supabase DB types, domain models, API types
│   └── utils/            # @straton-finance/utils — cn(), formatters, validators, constants
├── turbo.json            # Turborepo pipeline config
├── pnpm-workspace.yaml   # pnpm workspace definition
├── package.json          # Root package.json
└── tsconfig.json         # Root TypeScript config
```

---

## Contributing

### Branch Strategy

```
feature branches → dev → test → main
```

| Branch | Protection | Purpose |
|--------|-----------|---------|
| `main` | PR required, CI must pass | Production (auto-publish) |
| `test` | PR required, CI must pass | Staging/QA |
| `dev` | Open (push directly ok) | Development |

### Git Hooks (Husky)

| Hook | What it does | Speed |
|------|-------------|-------|
| Pre-commit | `lint-staged` (prettier on staged .ts files) | <2s |
| Commit-msg | `commitlint` — enforces conventional commits | <1s |
| Pre-push | `build` + `typecheck` | ~5s |

### Workflow

1. **Branch** from `dev`: `feat/add-chain-support`, `fix/utils-formatting`.
2. **Follow** [Conventional Commits](https://www.conventionalcommits.org/): `feat(utils):`, `fix(types):`, `chore(config):`, etc.
   Scopes: `types`, `utils`, `blockchain`, `config`, `deps`, `ci`
3. **Create a changeset** (`pnpm changeset`) for any user-facing change.
4. **Open a PR** to `dev`. When stable, PR `dev → test → main`.
5. **Do not** publish manually unless coordinated with the team.

---

## Supported Chains

The `@straton-finance/blockchain` package includes addresses and stablecoin configs for:

| Network | Chain ID | Status |
| --- | --- | --- |
| Ethereum Mainnet | 1 | Planned |
| Ethereum Sepolia | 11155111 | Testnet |
| Base | 8453 | Active |
| Base Sepolia | 84532 | Testnet (primary) |
| Polygon | 137 | Planned |
| Polygon Amoy | 80002 | Testnet (legacy) |
| Arbitrum One | 42161 | Planned |
| Arbitrum Sepolia | 421614 | Testnet |
| Avalanche C-Chain | 43114 | Planned |
| Avalanche Fuji | 43113 | Testnet |

---

## License

[MIT](LICENSE)
