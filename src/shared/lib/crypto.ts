import crypto from "crypto";

/**
 * Hash a password using PBKDF2 and a random salt.
 * Returns the salt and hash formatted as "salt:hash".
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verifies a password against a salt and hash.
 */
export function verifyPassword(password: string, salt: string, hash: string): boolean {
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash === verifyHash;
}
