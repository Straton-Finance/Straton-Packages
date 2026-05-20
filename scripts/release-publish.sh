#!/usr/bin/env bash
# Called by @changesets/action when a Version Packages PR is merged.
#
# Packs each workspace package (which resolves `workspace:` protocol refs to
# concrete versions in the tarball) and publishes via npm OIDC trusted
# publishing.
#
# Bug history (worth preserving as comments — both took 4 days to find):
#   - YAML colon trap: a step `name:` with `workspace:` (colon+space) inside
#     an unquoted scalar made GitHub Actions reject publish.yml at registration
#     in May 2025. Fixed by quoting.
#   - npm package-spec ambiguity: `npm publish dist/foo.tgz` (no "./") is
#     parsed as GitHub shorthand <user>/<repo> → `git ls-remote` → E128.
#     Fixed by the "./" prefix below.
set -euo pipefail

mkdir -p dist-tarballs

for dir in packages/*/; do
  ( cd "$dir" && pnpm pack --pack-destination "$GITHUB_WORKSPACE/dist-tarballs" )
done

for tgz in dist-tarballs/*.tgz; do
  echo "Publishing ./$tgz"
  npm publish "./$tgz" --access public
done
