---
"@straton/blockchain": minor
---

strETF — schema + ABI no package (destrava a superfície `/stretf` do FE)

Adiciona o modelo do strETF v1 (`StrETFWrapper`, wrapper composável ERC-3643) ao `@straton/blockchain`, em paralelo ao modelo de vault:

- `StrETFDeployment` / `StrETFGovernance` + `STRETF` + helpers `getStrETFDeployment` / `listStrETFDeployments` / `stretfSupportedChainIds` (Eth Sep `11155111` + Base Sep `84532`).
- `StrETFUnwrapStatus` (`pending`/`fulfilled`/`cancelled`, vocabulário ERC-7540) — contrato de tipo único compartilhado FE↔backend.
- `stretfWrapperAbi` (gerado de `forge inspect StrETFWrapper abi`) — cobre `wrap`/`requestUnwrap`/`fulfillUnwrap`/`cancelUnwrap`/`preview*`/`getUserUnwrapRequests` + os 4 eventos.
- `deployments/stretf-{11155111,84532}.json` + extensão do codegen (`STRETF`, shape C). `asset`/`receipt` são ERC-3643 18-dec.
- Endereços **verificados on-chain via `cast`** (não copiados de prosa); `ProxyAdmin.owner = TimelockController` confirmado nas 2 chains.

Aditivo, não-breaking. Inclui `@deprecated` JSDoc nos helpers flat legados (`getTbillTokenAddress` / `getVaultAddress` / `getStfTokenAddress` / `CONTRACT_ADDRESSES`) — o FE já migrou pro modelo unificado.
