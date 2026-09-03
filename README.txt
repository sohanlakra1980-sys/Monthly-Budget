MY BUDGET V3.4 — INSTALL ASSISTANT

This version keeps the working PWA configuration and adds a visible
INSTALL APP panel plus browser/install diagnostics.

Upload these directly to the ROOT of the Monthly-Budget GitHub repository:
index.html
config.js
manifest.json
sw.js
Code.gs
README.txt
icons/icon-192.png
icons/icon-512.png

Do not put them inside another folder.

GitHub Pages:
https://sohanlakra1980-sys.github.io/Monthly-Budget/

After upload:
1. Wait for GitHub Pages to publish.
2. Open the Budget page in normal Chrome.
3. Refresh once and wait 10–20 seconds.
4. Check the PWA Status and Install My Budget panels.
5. If Chrome supplies an install prompt, tap INSTALL APP.
6. If Chrome does not supply it, the panel explains the fallback.

Important: a webpage cannot force Android Chrome to install a PWA when
Chrome has not supplied an installation prompt. The app therefore reports
the exact state rather than pretending the installation succeeded.

Google Apps Script backend is unchanged.
