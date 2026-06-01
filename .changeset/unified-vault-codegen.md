---
"@straton/blockchain": minor
---

Modelo único de vault via codegen de `deployments/*.json`.

Converge os dois modelos paralelos (`CONTRACT_ADDRESSES` flat + `OPENASSETS_DEPLOYMENTS` rico) num modelo único gerado por codegen, eliminando a transcrição à mão de endereços (raiz do drift Base Sep de 2026-05-22). Item 4 do RED ALERT do Bruno; ver decision `2026-06-01-unified-vault-model-codegen`.

**Aditivo (não-breaking):**
- Novo: `getVaultDeployment(slug, chainId?)`, `listVaultDeployments(chainId?)`, `vaultSupportedChainIds(slug)`, `getTimelockAddress(chainId?)`, `VAULTS`, `VAULT_GOVERNANCE`, tipos `VaultSlug`/`VaultDeployment`/`VaultGovernance`, `VAULT_SLUGS`.
- `src/generated/deployments.ts` gerado de `deployments/*.json`; drift-check no CI (`codegen:check`). Endereços byte-idênticos ao 1.3.0.

**Deprecado (removido no próximo major):** `OPENASSETS_DEPLOYMENTS` + helpers KAN-17. `CONTRACT_ADDRESSES`/`getTbillTokenAddress`/`getVaultAddress` seguem por enquanto.
