/* Shared password for design-review pages.
 * Change PASSWORD_SHA256 to update the password (see UPLOAD.md).
 * Default password: Greeting2026
 * Generate a new hash: printf '%s' 'your-password' | sha256sum
 */
window.GREETINGS_GATE = {
  PASSWORD_SHA256:
    "f428631cde655f863f4672c179d262dbc4736f3f2fd43a8d11ab36aafcb9b9de",
  STORAGE_KEY: "greetings-gate-ok",
};
