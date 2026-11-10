/* Shared password for design-review pages.
 * Change PASSWORD_SHA256 to update the password (see UPLOAD.md).
 * Default password: design-review
 * Generate a new hash: printf '%s' 'your-password' | sha256sum
 */
window.GREETINGS_GATE = {
  PASSWORD_SHA256:
    "1d52a37f5f59ef0d006b647fe23d6b4c7ab0f1d5298bb4dbc379a51151f9ce96",
  STORAGE_KEY: "greetings-gate-ok",
};
