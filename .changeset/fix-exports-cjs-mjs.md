---
"@straton-finance/blockchain": patch
---

Fix `exports` map: `require` pointed to a non-existent `./dist/index.cjs` and `import` pointed to the CJS build. tsup (`--format esm,cjs`, no `"type": "module"`) emits CJS as `index.js` and ESM as `index.mjs` — the map now matches reality (`import → .mjs`, `require → .js`), and a `module` field is added.

Fixes `ERR_MODULE_NOT_FOUND` for every CJS consumer of `@straton-finance/{blockchain,utils,types}`. Bug present since v1.0.0; surfaced by Straton-Backend (first CJS `require()` consumer).
