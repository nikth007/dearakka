#!/usr/bin/env bash
#
# Build the Dear Akka marketing website and publish it into the gh-pages
# worktree at the /site/ subdirectory, served at:
#   https://nikth007.github.io/dearakka/site/
#
# The Expo app owns the gh-pages root (/dearakka/), so the marketing site lives
# under /dearakka/site/ to avoid disturbing it.
#
set -euo pipefail

SITE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SITE/.." && pwd)"
BASE="/dearakka/site/"
DEPLOY="$ROOT/gh-pages-deploy/site"

cd "$SITE"

echo "==> 1/4  Install deps (if needed) and build with base $BASE"
[ -d node_modules ] || npm install
SITE_BASE="$BASE" npm run build

echo "==> 2/4  Fix 404.html SPA fallback base for the subpath"
# public/404.html ships with base '/'; rewrite the built copy to the real base
# so deep links redirect within /dearakka/site/ (main.jsx restores the route).
sed -i "s|var base = '/';|var base = '$BASE';|" "$SITE/dist/404.html"

echo "==> 3/4  Verify built asset URLs carry the $BASE prefix"
if grep -qE '(src|href)="/(assets|favicon)' "$SITE/dist/index.html" \
   && ! grep -qE "(src|href)=\"$BASE" "$SITE/dist/index.html"; then
  echo "ERROR: index.html asset URLs are not prefixed with $BASE" >&2
  grep -oE '(src|href)="[^"]*"' "$SITE/dist/index.html" >&2
  exit 1
fi
echo "    OK"

echo "==> 4/4  Sync dist -> $DEPLOY"
rm -rf "$DEPLOY"
mkdir -p "$DEPLOY"
cp -a "$SITE/dist/." "$DEPLOY/"

echo "==> Done. Site staged at gh-pages-deploy/site/ (serves at https://nikth007.github.io$BASE)"
