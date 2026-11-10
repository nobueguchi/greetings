# Upload a password-gated test page

Live URL (after Pages is enabled): `https://mc-communications.github.io/greetings/`

## Site root is not for review

`https://mc-communications.github.io/greetings/` (root `index.html`) is intentionally blank: **no project links, no listing**. Stakeholders should only receive per-project short-code URLs such as `/MCS/` or `/VCR/`.

## One-time: enable GitHub Pages

1. **Settings → Pages**
2. **Build and deployment → Source** → **GitHub Actions**
3. Merge/push to `main` so **Deploy GitHub Pages** runs
4. Confirm the site URL on the Pages settings page

This repo is private. Public Pages from a private repo needs a plan that allows it (Team/Pro, etc.). If Pages is unavailable, upgrade the org plan or make the repo public for hosting.

## Password

- **Default:** `Greeting2026`
- Session-scoped (`sessionStorage`) after a successful unlock
- **Change it:** update `PASSWORD_SHA256` in `gate/config.js`:

```bash
printf '%s' 'your-new-password' | sha256sum
```

Commit to `main` and share the new password out of band.

### Why client-side?

GitHub Pages has no Basic Auth. A small client-side gate is enough for design review (shared password, low maintenance). It is **not** real security — the hash ships in JS. For real auth, put Cloudflare Access (or similar) in front, or use private Pages on Enterprise Cloud (GitHub login, not a shared password).

## Add a new test page

1. Create `tests/<name>/` with static files (`index.html` preferred)
2. In each HTML `<head>`, include (adjust `../` depth to reach the repo root):

```html
<script src="../../gate/config.js"></script>
<script src="../../gate/protect.js"></script>
```

3. Do **not** add project links on root `index.html` (root stays blank)
4. PR → merge to `main` → wait for the Pages workflow
5. Share the **full HTML URL** + password line (see format below), e.g. `…/tests/<name>/index.html` — not the site root, and prefer full file paths over folder roots only

### Local check

```bash
python3 -m http.server 8080
# http://127.0.0.1:8080/tests/sample/  → password Greeting2026
```

## Customize short-code folders (2026)

From local `2611_1724_eGreeting_Customize`, publish under short codes (no numeric prefixes). Do **not** list projects on root `index.html`. Omit `.fla` / `.ai` / `.psd`; ship HTML/JS/images (or JPG comps) with `../gate/config.js` + `../gate/protect.js`.

### Share format (copy/paste to stakeholders)

Send the **full HTML path** (not the site root, and prefer not only the folder root). Always include the password line:

```
https://mc-communications.github.io/greetings/MCS/winter_MCS.html
Password: Greeting2026
```

### Current share links — MCS (`01_MCS` → `MCS`)

```
https://mc-communications.github.io/greetings/MCS/winter_MCS.html
Password: Greeting2026

https://mc-communications.github.io/greetings/MCS/winter-portrait_MCS.html
Password: Greeting2026
```

(`MCS/index.html` only redirects to `winter_MCS.html` — share the explicit HTML files above.)

### Current share links — VCR (`02_VCR` → `VCR`)

```
https://mc-communications.github.io/greetings/VCR/index.html
Password: Greeting2026
```

