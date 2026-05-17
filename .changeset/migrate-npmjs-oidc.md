---
"@straton-finance/blockchain": patch
"@straton-finance/config": patch
"@straton-finance/types": patch
"@straton-finance/utils": patch
---

Publish to the public npmjs.com registry via OIDC Trusted Publishing instead of GitHub Packages. Consumers install with no authentication — no `.npmrc` override, no token, no Actions-access grant. See ADR 0001 Addendum 2026-05-17.
