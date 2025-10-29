import jwt from "jsonwebtoken"
import { userTokenSchema } from "../validations/token.validations.js"

const JWT_SECRET = process.env.JWT_SECRET

export async function createUserToken(payload) {
  const validationResult = await userTokenSchema.safeParseAsync(payload)

  if (validationResult.error) {
    throw new Error(validationResult.error.message)
  }

  const paylaodValidatedData = validationResult.data

  const token = jwt.sign(paylaodValidatedData, JWT_SECRET, {
    expiresIn: "5m",
  })

  return token
}

export function validateUserToken(token) {
  try {
    const payload = jwt.verify(token, JWT_SECRET)

    return payload
  } catch (error) {
    return null
  }
}
