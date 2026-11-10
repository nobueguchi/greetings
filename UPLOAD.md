# Upload a password-gated test page

Live URL (after Pages is enabled): `https://mc-communications.github.io/greetings/`

## One-time: enable GitHub Pages

1. **Settings → Pages**
2. **Build and deployment → Source** → **GitHub Actions**
3. Merge/push to `main` so **Deploy GitHub Pages** runs
4. Confirm the site URL on the Pages settings page

This repo is private. Public Pages from a private repo needs a plan that allows it (Team/Pro, etc.). If Pages is unavailable, upgrade the org plan or make the repo public for hosting.

## Password

- **Default:** `design-review`
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

3. Optionally link it from root `index.html`
4. PR → merge to `main` → wait for the Pages workflow
5. Share `https://mc-communications.github.io/greetings/tests/<name>/` + the password

### Local check

```bash
python3 -m http.server 8080
# http://127.0.0.1:8080/tests/sample/  → password design-review
```
