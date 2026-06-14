// AUTO-GENERATED por scripts/codegen-deployments.mjs — NÃO EDITAR À MÃO.
// Fonte: deployments/*.json (espelho de Straton-Contracts/deployments/).
// Regenerar: pnpm --filter @straton/blockchain codegen:deployments
// O CI (codegen:check) falha se este arquivo divergir dos JSONs.

import type { Address } from "viem";

import type { VaultDeployment, VaultGovernance } from "../vaults";
import type { StrETFDeployment } from "../stretf";

export const VAULTS: Record<
  number,
  Partial<Record<string, VaultDeployment>>
> = {
  84532: {
    stbill: {
      slug: "stbill",
      chainId: 84532,
      vault: "0x76887836A292136fe86F6354882Ec06A1dfcd1DA" as Address,
      token: "0x04EF2c7F3f13A52c894568bf7eb13cA763AE1115" as Address,
      depositAsset: "0xA895b2f89E14Fb1ca83d718A2058B5EF5f0A197F" as Address,
      depositAssetDecimals: 6,
    },
  },
  11155111: {
    stbill: {
      slug: "stbill",
      chainId: 11155111,
      vault: "0x51C25F00dD5D84cf7604fAB43e2bBAEafFb887D6" as Address,
      token: "0x82dd8f86C86Db739E96Bd873B368a36E4ad298CA" as Address,
      depositAsset: "0x61c57359a81b9c72F210fCAAE706Aaae799303Df" as Address,
      depositAssetDecimals: 6,
    },
    susdt: {
      slug: "susdt",
      chainId: 11155111,
      vault: "0x09922D7b6dAcF6Bc2055446977b3A0260d6DD168" as Address,
      token: "0xed138Fea5972f2df30701d1600f5615cdB606724" as Address,
      depositAsset: "0x61c57359a81b9c72F210fCAAE706Aaae799303Df" as Address,
      depositAssetDecimals: 6,
      modularCompliance:
        "0x05222388001F9eb27Ad5d906F92F4646fe3AfF58" as Address,
    },
    sweth: {
      slug: "sweth",
      chainId: 11155111,
      vault: "0x35be45bb19C973b2c364490E5603B7926bfdd5B3" as Address,
      token: "0x9b400efB3987a271a9609f11E8E52179934De2b5" as Address,
      depositAsset: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14" as Address,
      depositAssetDecimals: 18,
      modularCompliance:
        "0x12a06A5aAB3E26bC4B326D72A309C641Ec6EE240" as Address,
    },
  },
};

export const VAULT_GOVERNANCE: Record<number, VaultGovernance> = {
  84532: {
    timelock: "0x0Dc5a89D3D940144B35857317cdf6B609568eE17" as Address,
    coldSafe: "0x2f2171D6b92F8c7230dcd0084f33A083589bAFfe" as Address,
  },
  11155111: {
    timelock: "0x19a0f130aa18c774ebfd3163b655c20538f9d9ae" as Address,
    coldSafe: "0x2f2171D6b92F8c7230dcd0084f33A083589bAFfe" as Address,
  },
};

export const STRETF: Record<number, StrETFDeployment> = {
  84532: {
    chainId: 84532,
    wrapper: "0xE6639154a0247d9130b0E6abA547Aec2CC35EEbb" as Address,
    asset: "0xFD02a3151e1Eeb7e057bBa46220531a0F8b14f49" as Address,
    receipt: "0x82b5D7C12E2fA6666DbBa5282E23d93cf6ae0191" as Address,
    assetDecimals: 18,
    receiptDecimals: 18,
    assetCompliance: "0x69399612805460829e16B3ab10F63871cAa77529" as Address,
    receiptCompliance: "0x18e345E9E24D9714AA52F84F550f50b03d525714" as Address,
    identityRegistry: "0x0000000000000000000000000000000000000000" as Address,
    governance: {
      timelock: "0x0Dc5a89D3D940144B35857317cdf6B609568eE17" as Address,
      proxyAdmin: "0xecc08764Ef4D0958EA52edcE8cB2082ffCb4228f" as Address,
      coldSafe: "0x2f2171D6b92F8c7230dcd0084f33A083589bAFfe" as Address,
    },
  },
  11155111: {
    chainId: 11155111,
    wrapper: "0x5606980Bfcbe16C3dCa40546Db3bfb33CeA8Aa41" as Address,
    asset: "0x1A6F04B379Bb982c4B946E8D7011BA0D1115167C" as Address,
    receipt: "0x0Df2052fD89b31499db57e43A95C747F9317C0c7" as Address,
    assetDecimals: 18,
    receiptDecimals: 18,
    assetCompliance: "0x0000000000000000000000000000000000000000" as Address,
    receiptCompliance: "0xd6993c71255c255F2755f5d52B2593CF4c3df604" as Address,
    identityRegistry: "0x0000000000000000000000000000000000000000" as Address,
    governance: {
      timelock: "0x19A0F130Aa18C774eBfd3163B655C20538F9d9ae" as Address,
      proxyAdmin: "0x06391aBeEDF7fCE20209911034416B901Cee2B9c" as Address,
      coldSafe: "0x2f2171D6b92F8c7230dcd0084f33A083589bAFfe" as Address,
    },
  },
};
