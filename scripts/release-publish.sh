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
  # Idempotent publish. @changesets/action runs this `publish` step on EVERY main
  # commit that has no pending changesets — not only on Version-PR merges. A
  # commit without a version bump re-packs the CURRENT (already-published)
  # version, and npm 403s with "cannot publish over the previously published
  # versions". That is a BENIGN no-op (nothing new to release), not a failure —
  # without this guard the Release run is red on every feature/fix commit, which
  # masks a REAL publish error (auth/OIDC/build). Skip ONLY that exact error;
  # every other failure still exits non-zero so genuine problems stay loud.
  # (Post-publish parse, not a pre-`npm view` check: npm info under-reports a
  # published version when no "latest" dist-tag exists — a known changesets gotcha.)
  if out=$(npm publish "./$tgz" --access public 2>&1); then
    printf '%s\n' "$out"
  elif printf '%s' "$out" | grep -q "cannot publish over the previously published versions"; then
    printf '%s\n' "$out"
    echo "↳ skip: version already on the registry (no changeset → nothing new to publish)"
  else
    printf '%s\n' "$out" >&2
    exit 1
  fi
done
