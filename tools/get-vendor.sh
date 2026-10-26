#!/usr/bin/env bash
# Downloads Three.js and the Inter Tight font into the project so the site no longer
# depends on third-party servers. Run it once from the project root: bash tools/get-vendor.sh
set -e
mkdir -p vendor fonts
curl -L --fail -o vendor/three.min.js "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
curl -L --fail -o fonts/inter-tight-latin-wght-normal.woff2 "https://cdn.jsdelivr.net/npm/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2"
echo "Done: vendor/three.min.js and fonts/inter-tight-latin-wght-normal.woff2"
