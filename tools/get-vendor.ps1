# Windows version. Run once from the project root:  powershell -ExecutionPolicy Bypass -File tools/get-vendor.ps1
New-Item -ItemType Directory -Force -Path vendor, fonts | Out-Null
Invoke-WebRequest "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" -OutFile "vendor/three.min.js"
Invoke-WebRequest "https://cdn.jsdelivr.net/npm/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2" -OutFile "fonts/inter-tight-latin-wght-normal.woff2"
Write-Host "Done: vendor/three.min.js and fonts/inter-tight-latin-wght-normal.woff2"
