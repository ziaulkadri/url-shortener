import { createHmac, randomBytes } from "crypto"

export function hashPasswordWithSalt(password) {
  const salt = randomBytes(256).toString("hex")

  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex")

  return { salt, password: hashedPassword }
}
