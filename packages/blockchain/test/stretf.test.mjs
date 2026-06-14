// Testes do strETF (codegen + helpers + ABI) — @straton/blockchain.
// Roda contra o dist buildado (node:test, sem runner externo). O CI faz
// `pnpm -r build` antes de `pnpm -r test`, então o dist existe.
//
// Endereços abaixo foram VERIFICADOS on-chain (cast) nas 2 testnets em
// 2026-06-14 — não copiados de prosa. wrapper.asset()/receipt() lidos do
// próprio contrato; ProxyAdmin.owner = Timelock confirmado nas 2 chains.

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getAddress } from "viem";

import {
  STRETF,
  getStrETFDeployment,
  listStrETFDeployments,
  stretfSupportedChainIds,
  stretfWrapperAbi,
} from "../dist/index.mjs";

const ETH_SEP = 11155111;
const BASE_SEP = 84532;
const UNCONFIGURED = 1; // Ethereum mainnet — sem strETF deployado
const ZERO = "0x0000000000000000000000000000000000000000";

describe("getStrETFDeployment", () => {
  it("Eth Sepolia: MockOAVault asset (permissionless, assetCompliance 0x0) + receipt 18/18 + IR legacy 0x0", () => {
    const d = getStrETFDeployment(ETH_SEP);
    assert.equal(d.chainId, ETH_SEP);
    assert.equal(d.wrapper, "0x5606980Bfcbe16C3dCa40546Db3bfb33CeA8Aa41");
    assert.equal(d.asset, "0x1A6F04B379Bb982c4B946E8D7011BA0D1115167C");
    assert.equal(d.receipt, "0x0Df2052fD89b31499db57e43A95C747F9317C0c7");
    assert.equal(d.assetDecimals, 18);
    assert.equal(d.receiptDecimals, 18);
    // Asset = MockOAVault (ERC-4626-style, permissionless) → NO ModularCompliance.
    // The permissioned perimeter lives only in the strETF receipt (Gui 2026-06-14: OA = ERC-4626).
    assert.equal(d.assetCompliance, ZERO);
    assert.equal(
      d.receiptCompliance,
      "0xd6993c71255c255F2755f5d52B2593CF4c3df604",
    );
    assert.equal(d.identityRegistry, ZERO); // regime de whitelist plana (v1 by design)
  });

  it("Eth Sepolia: governança ProxyAdmin→Timelock (verificada on-chain)", () => {
    const g = getStrETFDeployment(ETH_SEP).governance;
    assert.equal(g.timelock, "0x19A0F130Aa18C774eBfd3163B655C20538F9d9ae");
    assert.equal(g.proxyAdmin, "0x06391aBeEDF7fCE20209911034416B901Cee2B9c");
    assert.equal(g.coldSafe, "0x2f2171D6b92F8c7230dcd0084f33A083589bAFfe");
  });

  it("Base Sepolia: wrapper/asset/receipt + seu próprio Timelock", () => {
    const d = getStrETFDeployment(BASE_SEP);
    assert.equal(d.wrapper, "0xE6639154a0247d9130b0E6abA547Aec2CC35EEbb");
    assert.equal(d.asset, "0xFD02a3151e1Eeb7e057bBa46220531a0F8b14f49");
    assert.equal(d.receipt, "0x82b5D7C12E2fA6666DbBa5282E23d93cf6ae0191");
    assert.equal(
      d.governance.timelock,
      "0x0Dc5a89D3D940144B35857317cdf6B609568eE17",
    );
  });

  it("undefined pra chain sem strETF deployado", () => {
    assert.equal(getStrETFDeployment(UNCONFIGURED), undefined);
  });

  it("todos os endereços (exceto IR 0x0) são checksummed e válidos", () => {
    for (const d of listStrETFDeployments()) {
      for (const key of [
        "wrapper",
        "asset",
        "receipt",
        "assetCompliance",
        "receiptCompliance",
      ]) {
        assert.equal(d[key], getAddress(d[key]), `${key} não-checksummed`);
      }
      for (const key of ["timelock", "proxyAdmin", "coldSafe"]) {
        const v = d.governance[key];
        if (v)
          assert.equal(v, getAddress(v), `governance.${key} não-checksummed`);
      }
    }
  });
});

describe("listStrETFDeployments / stretfSupportedChainIds", () => {
  it("lista as 2 chains em ordem numérica (Base Sep, Eth Sep)", () => {
    assert.deepEqual(
      listStrETFDeployments().map((d) => d.chainId),
      [BASE_SEP, ETH_SEP],
    );
  });

  it("chains suportadas ordenadas", () => {
    assert.deepEqual(stretfSupportedChainIds(), [BASE_SEP, ETH_SEP]);
  });

  it("STRETF cobre exatamente as 2 testnets", () => {
    assert.deepEqual(
      Object.keys(STRETF)
        .map(Number)
        .sort((a, b) => a - b),
      [BASE_SEP, ETH_SEP],
    );
  });
});

describe("stretfWrapperAbi", () => {
  const names = (type) =>
    stretfWrapperAbi.filter((x) => x.type === type).map((x) => x.name);

  it("expõe as funções que o FE precisa", () => {
    const fns = names("function");
    for (const fn of [
      "wrap",
      "requestUnwrap",
      "cancelUnwrap",
      "fulfillUnwrap",
      "previewWrap",
      "previewUnwrap",
      "getUserUnwrapRequests",
      "getUnwrapRequest",
      "asset",
      "receipt",
      "totalWrapped",
    ]) {
      assert.ok(fns.includes(fn), `ABI sem função ${fn}`);
    }
  });

  it("expõe os 4 eventos do ciclo wrap/unwrap", () => {
    const evs = names("event");
    for (const ev of [
      "Wrapped",
      "UnwrapRequested",
      "UnwrapFulfilled",
      "UnwrapCancelled",
    ]) {
      assert.ok(evs.includes(ev), `ABI sem evento ${ev}`);
    }
  });
});
