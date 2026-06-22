#!/usr/bin/env bash
#
# Build the Expo web app and publish it to the gh-pages worktree, patched for
# serving under the GitHub Pages subpath https://nikth007.github.io/dearakka/.
#
# Why patching is needed: Metro emits absolute asset URLs rooted at "/assets/..."
# and a script src rooted at "/_expo/...". GitHub Pages serves this project at
# the "/dearakka/" subpath, so every such URL must be prefixed with "/dearakka".
# If the icon-font and image URLs are not patched they 404 at runtime, which
# renders screens as blank/blue (no icons, no mascot, failed font loads).
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PREFIX="/dearakka"
DEPLOY="$ROOT/gh-pages-deploy"

cd "$ROOT"

echo "==> 1/5  Clean previous build output"
rm -rf "$ROOT/dist"

echo "==> 2/5  Export Expo web bundle"
npx expo export --platform web --output-dir dist

echo "==> 3/5  Patch asset + script paths in dist for the $PREFIX subpath"
# Patch every JS bundle: ALL asset references are the string literal "/assets/...
# (httpServerLocation:"/assets/, uri:"/assets/, .exports="/assets/, etc.), so a
# single global replace of the leading quote+path covers every variant.
find "$ROOT/dist" -name '*.js' -type f -print0 | while IFS= read -r -d '' f; do
  sed -i "s|\"/assets/|\"$PREFIX/assets/|g" "$f"
  sed -i "s|'/assets/|'$PREFIX/assets/|g" "$f"
done

# Patch index.html: make the bundle <script src> absolute under the subpath so
# deep links (/dearakka/foo/bar) still resolve it.
sed -i "s|src=\"\./_expo/|src=\"$PREFIX/_expo/|g" "$ROOT/dist/index.html"
sed -i "s|src=\"/_expo/|src=\"$PREFIX/_expo/|g" "$ROOT/dist/index.html"

# Expo regenerates index.html from a template each build, dropping our custom
# head additions. Re-inject them here so every deploy carries them:
#  - dark background on html/body/#root prevents a white flash before JS mounts
#    (the app's root view is #0F2441; match it so load is seamless)
#  - favicon link (absolute, under the subpath)
python3 - "$ROOT/dist/index.html" "$PREFIX" <<'PY'
import sys, re
path, prefix = sys.argv[1], sys.argv[2]
html = open(path, encoding='utf-8').read()
# Add background-color to the three expo-reset rules if not already present.
html = html.replace("body {\n        height: 100%;\n      }",
                    "body {\n        height: 100%;\n        background-color: #0F2441;\n      }")
html = html.replace("body {\n        overflow: hidden;\n      }",
                    "body {\n        overflow: hidden;\n        background-color: #0F2441;\n      }")
html = html.replace("#root {\n        display: flex;\n        height: 100%;\n        flex: 1;\n      }",
                    "#root {\n        display: flex;\n        height: 100%;\n        flex: 1;\n        background-color: #0F2441;\n      }")
# Inject favicon + theme-color before </head> if no favicon link exists.
if 'rel="shortcut icon"' not in html and 'rel="icon"' not in html:
    head_extra = ('  <meta name="theme-color" content="#0D9488">\n'
                  '  <meta name="description" content="Your personal women\'s health companion by Sundaram Medical Foundation">\n'
                  f'  <link rel="shortcut icon" href="{prefix}/favicon.ico" />\n')
    html = html.replace("</head>", head_extra + "</head>", 1)
open(path, 'w', encoding='utf-8').write(html)
print("    index.html: injected dark background + favicon")
PY

echo "==> 4/5  Verify no unpatched /assets/ or /_expo/ paths remain"
# Collect candidate paths, then filter out the correctly-prefixed ones. Guard
# every grep with `|| true` so an empty result (exit 1) does not trip `set -e`.
UNPATCHED=$( { grep -rEo '("|'\'')/(assets|_expo)/[^"'\'' ]*' "$ROOT/dist" \
                --include='*.js' --include='*.html' || true; } \
              | { grep -vE "$PREFIX/(assets|_expo)/" || true; } | sort -u )
if [ -n "$UNPATCHED" ]; then
  echo "ERROR: unpatched asset/_expo path(s) remain:" >&2
  echo "$UNPATCHED" | head >&2
  exit 1
fi
echo "    OK: all asset/_expo paths carry the $PREFIX prefix"

echo "==> 5/5  Sync dist -> gh-pages worktree ($DEPLOY)"
# Wipe everything tracked except .git and copy the fresh build, so no stale
# bundles from previous deploys linger in the served directory.
find "$DEPLOY" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -a "$ROOT/dist/." "$DEPLOY/"
# GitHub Pages needs .nojekyll so the _expo dir (leading underscore) is served.
touch "$DEPLOY/.nojekyll"
# Preserve the favicon (Expo's export omits it when web.favicon is unset).
if [ -f "$ROOT/favicon.ico" ]; then cp "$ROOT/favicon.ico" "$DEPLOY/favicon.ico"; fi
# SPA deep-link fallback. GitHub Pages serves ONE 404.html (this one, at the
# published root) for every not-found path across the whole site, including the
# marketing site under /dearakka/site/. So this file routes:
#   - /dearakka/site/* -> capture the route and bounce into the marketing SPA
#                         (its index.html restores the route from sessionStorage)
#   - everything else  -> load the Expo app
cat > "$DEPLOY/404.html" <<'HTML'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Dear Akka</title>
    <style>html,body{height:100%;margin:0;background-color:#0F2441;}</style>
    <script>
      (function () {
        var p = window.location.pathname;
        var siteBase = '/dearakka/site/';
        if (p.indexOf(siteBase) === 0) {
          // Deep link into the marketing site: preserve the route and bounce
          // to the site index, which restores it from sessionStorage.
          sessionStorage.setItem('da_redirect', p + window.location.search + window.location.hash);
          window.location.replace(siteBase);
        } else {
          // Any other unknown path: load the app at its root.
          window.location.replace('/dearakka/');
        }
      })();
    </script>
  </head>
  <body></body>
</html>
HTML

echo "==> Done. Review with: cd gh-pages-deploy && git status"
