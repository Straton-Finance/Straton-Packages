// Testes do modelo único de vault (codegen + helpers) — @straton/blockchain 1.4.0.
// Roda contra o dist buildado (node:test, sem runner externo). O CI faz
// `pnpm -r build` antes de `pnpm -r test`, então o dist existe.
//
// O teste mais importante é o de REGRESSÃO: garante que o modelo gerado
// (VAULTS/VAULT_GOVERNANCE) bate byte-a-byte com as tabelas legacy
// (CONTRACT_ADDRESSES/OPENASSETS_DEPLOYMENTS) — i.e., o codegen não driftou.

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  VAULTS,
  VAULT_GOVERNANCE,
  VAULT_SLUGS,
  getVaultDeployment,
  listVaultDeployments,
  vaultSupportedChainIds,
  getTimelockAddress,
  CONTRACT_ADDRESSES,
  OPENASSETS_DEPLOYMENTS,
} from "../dist/index.mjs";

const ETH_SEP = 11155111;
const BASE_SEP = 84532;
const UNCONFIGURED = 1; // Ethereum mainnet — sem vaults deployados

describe("getVaultDeployment", () => {
  it("retorna o sTBILL no Eth Sepolia com core correto", () => {
    const d = getVaultDeployment("stbill", ETH_SEP);
    assert.equal(d.slug, "stbill");
    assert.equal(d.chainId, ETH_SEP);
    assert.equal(d.vault, "0x51C25F00dD5D84cf7604fAB43e2bBAEafFb887D6");
    assert.equal(d.token, "0x82dd8f86C86Db739E96Bd873B368a36E4ad298CA");
    // canonical USDT (OpenAssets) — unified per chain; was the dup mockUSDT 0xDBf2 before drop
    assert.equal(d.depositAsset, "0x61c57359a81b9c72F210fCAAE706Aaae799303Df");
    assert.equal(d.depositAssetDecimals, 6);
  });

  it("retorna o sUSDT (KAN-17) com modularCompliance e USDT 6 dec", () => {
    const d = getVaultDeployment("susdt", ETH_SEP);
    assert.equal(d.vault, "0x09922D7b6dAcF6Bc2055446977b3A0260d6DD168");
    assert.equal(d.token, "0xed138Fea5972f2df30701d1600f5615cdB606724");
    assert.equal(d.depositAsset, "0x61c57359a81b9c72F210fCAAE706Aaae799303Df");
    assert.equal(d.depositAssetDecimals, 6);
    assert.equal(
      d.modularCompliance,
      "0x05222388001F9eb27Ad5d906F92F4646fe3AfF58",
    );
  });

  it("retorna o sWETH com WETH como depositAsset e 18 dec", () => {
    const d = getVaultDeployment("sweth", ETH_SEP);
    assert.equal(d.depositAsset, "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14");
    assert.equal(d.depositAssetDecimals, 18);
  });

  it("retorna o sTBILL no Base Sepolia", () => {
    const d = getVaultDeployment("stbill", BASE_SEP);
    assert.equal(d.vault, "0x76887836A292136fe86F6354882Ec06A1dfcd1DA");
    assert.equal(d.token, "0x04EF2c7F3f13A52c894568bf7eb13cA763AE1115");
  });

  it("retorna undefined pra slug não deployado na chain (sUSDT no Base Sep)", () => {
    assert.equal(getVaultDeployment("susdt", BASE_SEP), undefined);
  });

  it("retorna undefined pra chain não configurada", () => {
    assert.equal(getVaultDeployment("stbill", UNCONFIGURED), undefined);
  });
});

describe("listVaultDeployments", () => {
  it("lista os 3 vaults do Eth Sepolia na ordem de VAULT_SLUGS", () => {
    const slugs = listVaultDeployments(ETH_SEP).map((v) => v.slug);
    assert.deepEqual(slugs, ["stbill", "susdt", "sweth"]);
  });

  it("lista só o sTBILL no Base Sepolia", () => {
    const slugs = listVaultDeployments(BASE_SEP).map((v) => v.slug);
    assert.deepEqual(slugs, ["stbill"]);
  });

  it("retorna [] pra chain não configurada", () => {
    assert.deepEqual(listVaultDeployments(UNCONFIGURED), []);
  });
});

describe("vaultSupportedChainIds", () => {
  it("sTBILL deployado em Eth Sep + Base Sep (ordenado)", () => {
    assert.deepEqual(vaultSupportedChainIds("stbill"), [BASE_SEP, ETH_SEP]);
  });

  it("sUSDT só no Eth Sep", () => {
    assert.deepEqual(vaultSupportedChainIds("susdt"), [ETH_SEP]);
  });
});

describe("getTimelockAddress", () => {
  it("Eth Sep → TimelockController(48h) canônico", () => {
    assert.equal(
      getTimelockAddress(ETH_SEP),
      "0x19a0f130aa18c774ebfd3163b655c20538f9d9ae",
    );
  });

  it("Base Sep → seu próprio Timelock", () => {
    assert.equal(
      getTimelockAddress(BASE_SEP),
      "0x0Dc5a89D3D940144B35857317cdf6B609568eE17",
    );
  });

  it("undefined pra chain sem governance", () => {
    assert.equal(getTimelockAddress(UNCONFIGURED), undefined);
  });
});

describe("VAULT_SLUGS", () => {
  it("contém exatamente stbill/susdt/sweth", () => {
    assert.deepEqual([...VAULT_SLUGS], ["stbill", "susdt", "sweth"]);
  });
});

// ── REGRESSÃO: gerado == legacy (sem drift de endereço vs 1.3.0) ──────────────
describe("regressão: VAULTS gerado bate com as tabelas legacy", () => {
  it("sTBILL: vault/token batem com CONTRACT_ADDRESSES em toda chain deployada", () => {
    for (const [chainId, legacy] of Object.entries(CONTRACT_ADDRESSES)) {
      const ZERO = "0x0000000000000000000000000000000000000000";
      if (legacy.tbillToken === ZERO) continue; // chain sem deploy
      const gen = VAULTS[chainId]?.stbill;
      assert.ok(gen, `VAULTS[${chainId}].stbill ausente`);
      assert.equal(gen.vault, legacy.vault, `vault drift chain ${chainId}`);
      assert.equal(
        gen.token,
        legacy.tbillToken,
        `token drift chain ${chainId}`,
      );
    }
  });

  it("KAN-17: susdt/sweth batem com OPENASSETS_DEPLOYMENTS", () => {
    for (const [chainId, dep] of Object.entries(OPENASSETS_DEPLOYMENTS)) {
      for (const [slug, v] of Object.entries(dep.vaults)) {
        const gen = VAULTS[chainId]?.[slug];
        assert.ok(gen, `VAULTS[${chainId}].${slug} ausente`);
        assert.equal(gen.vault, v.vault, `${slug} vault drift`);
        assert.equal(gen.token, v.receiptToken, `${slug} token drift`);
        assert.equal(
          gen.depositAsset,
          v.depositAsset,
          `${slug} depositAsset drift`,
        );
        assert.equal(
          gen.modularCompliance,
          v.modularCompliance,
          `${slug} compliance drift`,
        );
      }
    }
  });

  it("governance: coldSafe do gerado bate com OPENASSETS safe", () => {
    const dep = OPENASSETS_DEPLOYMENTS[ETH_SEP];
    assert.equal(VAULT_GOVERNANCE[ETH_SEP].coldSafe, dep.safe);
  });
});
