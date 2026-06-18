// Codegen: gera src/generated/deployments.ts a partir de deployments/*.json.
//
// Os JSONs (espelhados de Straton-Contracts/deployments/) são a FONTE CANÔNICA
// de endereços. Este script normaliza as shapes heterogêneas — o "curated
// record" multi-vault (multivault-<chainId>.json: { contracts, governance }), o
// rico por-slug do KAN-17 (openassets-vaults-<chainId>.json: { vaults, safe }) e
// o wrapper composável strETF (stretf-<chainId>.json: { wrapper, asset, receipt,
// ... }) — em `VaultDeployment` por slug + `StrETFDeployment` por chain.
//
// Determinístico: chainIds em ordem numérica, slugs na ordem de VAULT_SLUGS.
// O CI roda `pnpm codegen:check` (regenera + git diff) pra matar drift.
//
// Rodar: `pnpm --filter @straton/blockchain codegen:deployments`

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEPLOY_DIR = path.join(__dirname, "..", "deployments");
const OUT = path.join(__dirname, "..", "src", "generated", "deployments.ts");

// Ordem canônica dos slugs. sglobal/sbasis entram quando deployados.
const VAULT_SLUGS = ["stbill", "susdt", "sweth"];

// Decimais do depositAsset por slug (não carregados nos JSONs; tabela conhecida).
// stbill/susdt aceitam USDT (6); sweth aceita WETH (18).
const DEPOSIT_DECIMALS = { stbill: 6, susdt: 6, sweth: 18 };

// strETF: asset e receipt são ERC-3643 18-dec (garantido on-chain pelo
// StrETFWrapper__DecimalsMismatch); não vem no JSON — constante conhecida.
const STRETF_DECIMALS = { asset: 18, receipt: 18 };

/** @type {Record<number, Record<string, object>>} */
const vaults = {};
/** @type {Record<number, { timelock?: string, coldSafe?: string }>} */
const governance = {};
/** @type {Record<number, object>} */
const stretf = {};

function mergeGov(cid, next) {
  const cur = governance[cid] ?? {};
  governance[cid] = {
    timelock: cur.timelock ?? next.timelock,
    coldSafe: cur.coldSafe ?? next.coldSafe,
  };
}

const files = fs
  .readdirSync(DEPLOY_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort();

for (const file of files) {
  const j = JSON.parse(fs.readFileSync(path.join(DEPLOY_DIR, file), "utf8"));
  const cid = j.chainId;
  if (typeof cid !== "number") {
    throw new Error(`${file}: chainId ausente ou não-numérico`);
  }
  vaults[cid] ??= {};

  // Shape A — curated multi-vault (sTBILL): { contracts.tbillToken, governance }
  if (j.contracts && j.contracts.tbillToken) {
    vaults[cid].stbill = {
      slug: "stbill",
      chainId: cid,
      vault: j.contracts.vault,
      token: j.contracts.tbillToken,
      depositAsset: j.contracts.canonicalUSDT,
      depositAssetDecimals: DEPOSIT_DECIMALS.stbill,
      modularCompliance: j.contracts.modularCompliance,
    };
    mergeGov(cid, {
      timelock: j.governance?.timelock,
      coldSafe: j.governance?.coldSafe,
    });
  }

  // Shape B — rico por-slug (KAN-17): { vaults: { <slug>: {...} }, safe }
  if (j.vaults && typeof j.vaults === "object") {
    for (const [slug, v] of Object.entries(j.vaults)) {
      if (!VAULT_SLUGS.includes(slug)) {
        throw new Error(
          `${file}: slug desconhecido '${slug}' (não está em VAULT_SLUGS)`,
        );
      }
      vaults[cid][slug] = {
        slug,
        chainId: cid,
        vault: v.vault,
        token: v.receiptToken,
        depositAsset: v.depositAsset,
        depositAssetDecimals: DEPOSIT_DECIMALS[slug],
        modularCompliance: v.modularCompliance,
      };
    }
    mergeGov(cid, { coldSafe: j.safe });
  }

  // Shape C — strETF composable wrapper: { wrapper, asset, receipt, ... }
  if (j.wrapper) {
    if (stretf[cid]) {
      throw new Error(`${file}: strETF duplicado para chainId ${cid}`);
    }
    stretf[cid] = {
      chainId: cid,
      wrapper: j.wrapper,
      asset: j.asset,
      receipt: j.receipt,
      assetDecimals: STRETF_DECIMALS.asset,
      receiptDecimals: STRETF_DECIMALS.receipt,
      assetCompliance: j.assetCompliance,
      receiptCompliance: j.receiptCompliance,
      identityRegistry: j.identityRegistry,
      governance: {
        timelock: j.governance?.timelock,
        proxyAdmin: j.governance?.proxyAdmin,
        coldSafe: j.governance?.coldSafe,
      },
    };
  }
}

// --- emit ---
const A = (v) => (v ? `"${v}" as Address` : "undefined");

function emitVault(v) {
  const lines = [
    `      slug: "${v.slug}",`,
    `      chainId: ${v.chainId},`,
    `      vault: "${v.vault}" as Address,`,
    `      token: "${v.token}" as Address,`,
    `      depositAsset: "${v.depositAsset}" as Address,`,
    `      depositAssetDecimals: ${v.depositAssetDecimals},`,
  ];
  if (v.modularCompliance) {
    lines.push(`      modularCompliance: "${v.modularCompliance}" as Address,`);
  }
  return `    ${v.slug}: {\n${lines.join("\n")}\n    },`;
}

function emitStrETF(cid, d) {
  const g = d.governance ?? {};
  return [
    `  ${cid}: {`,
    `    chainId: ${d.chainId},`,
    `    wrapper: "${d.wrapper}" as Address,`,
    `    asset: "${d.asset}" as Address,`,
    `    receipt: "${d.receipt}" as Address,`,
    `    assetDecimals: ${d.assetDecimals},`,
    `    receiptDecimals: ${d.receiptDecimals},`,
    `    assetCompliance: "${d.assetCompliance}" as Address,`,
    `    receiptCompliance: "${d.receiptCompliance}" as Address,`,
    `    identityRegistry: "${d.identityRegistry}" as Address,`,
    `    governance: { timelock: ${A(g.timelock)}, proxyAdmin: ${A(g.proxyAdmin)}, coldSafe: ${A(g.coldSafe)} },`,
    `  },`,
  ].join("\n");
}

const chainIds = Object.keys(vaults)
  .map(Number)
  .sort((a, b) => a - b);

const vaultBlocks = chainIds
  .map((cid) => {
    const bySlug = vaults[cid];
    const slugLines = VAULT_SLUGS.filter((s) => bySlug[s])
      .map((s) => emitVault(bySlug[s]))
      .join("\n");
    return `  ${cid}: {\n${slugLines}\n  },`;
  })
  .join("\n");

const govBlocks = chainIds
  .filter((cid) => governance[cid])
  .map((cid) => {
    const g = governance[cid];
    return `  ${cid}: { timelock: ${A(g.timelock)}, coldSafe: ${A(g.coldSafe)} },`;
  })
  .join("\n");

const stretfChainIds = Object.keys(stretf)
  .map(Number)
  .sort((a, b) => a - b);
const stretfBlocks = stretfChainIds
  .map((cid) => emitStrETF(cid, stretf[cid]))
  .join("\n");

const header = `// AUTO-GENERATED por scripts/codegen-deployments.mjs — NÃO EDITAR À MÃO.
// Fonte: deployments/*.json (espelho de Straton-Contracts/deployments/).
// Regenerar: pnpm --filter @straton/blockchain codegen:deployments
// O CI (codegen:check) falha se este arquivo divergir dos JSONs.

import type { Address } from "viem";

import type { VaultDeployment, VaultGovernance } from "../vaults";
import type { StrETFDeployment } from "../stretf";
`;

const body = `
export const VAULTS: Record<number, Partial<Record<string, VaultDeployment>>> = {
${vaultBlocks}
};

export const VAULT_GOVERNANCE: Record<number, VaultGovernance> = {
${govBlocks}
};

export const STRETF: Record<number, StrETFDeployment> = {
${stretfBlocks}
};
`;

// Formatar com o prettier do repo → saída determinística e idêntica ao que o
// lint-staged produziria (senão o drift-check do CI quebra).
const prettier = (await import("prettier")).default;
const prettierCfg = (await prettier.resolveConfig(OUT)) ?? {};
const formatted = await prettier.format(header + body, {
  ...prettierCfg,
  parser: "typescript",
});

fs.writeFileSync(OUT, formatted);
console.log(
  `[codegen] ${OUT} — ${chainIds.length} chains, ${Object.values(vaults).reduce((n, v) => n + Object.keys(v).length, 0)} vaults, ${stretfChainIds.length} strETF`,
);
