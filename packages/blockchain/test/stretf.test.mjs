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
  it("Eth Sepolia: wrapper/asset/receipt + decimais 18/18 + IR legacy 0x0", () => {
    const d = getStrETFDeployment(ETH_SEP);
    assert.equal(d.chainId, ETH_SEP);
    assert.equal(d.wrapper, "0x13be13A7838Ec10a3C3e32E7C7f7eBa296bF27F3");
    assert.equal(d.asset, "0x8B43460e5060Bb6b339552a871bEc4f4e459508E");
    assert.equal(d.receipt, "0xe77F232696d7B63D748194a9ebe04557528414dE");
    assert.equal(d.assetDecimals, 18);
    assert.equal(d.receiptDecimals, 18);
    assert.equal(
      d.assetCompliance,
      "0x3FB6DeCcCa17B728a14cfe2e06DfdEd979916401",
    );
    assert.equal(
      d.receiptCompliance,
      "0xf4C90B082EF854CBBbc69d90fEE837f7305153d1",
    );
    assert.equal(d.identityRegistry, ZERO); // regime de whitelist plana (v1 by design)
  });

  it("Eth Sepolia: governança ProxyAdmin→Timelock (verificada on-chain)", () => {
    const g = getStrETFDeployment(ETH_SEP).governance;
    assert.equal(g.timelock, "0x19A0F130Aa18C774eBfd3163B655C20538F9d9ae");
    assert.equal(g.proxyAdmin, "0x877F63A8e3e5DE6746dB4d668581250814780429");
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
