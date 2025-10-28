import express from "express"
import { db } from "../db/index.js"
import { usersTable } from "../models/user.model.js"
import { createHmac, randomBytes } from "crypto"
import { signupPostRequestBodySchema } from "../validations/request.validations.js"
import { eq } from "drizzle-orm"

const router = express.Router()

router.post("/signup", async (req, res) => {
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(
    req.body
  )

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() })
  }

  const { firstname, lastname, email, password } = validationResult.data

  const [existingUser] = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email))

  if (existingUser) {
    return res
      .status(400)
      .json({ error: `User with email ${email} already exists!` })
  }

  const salt = randomBytes(256).toString("hex")

  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex")

  const [user] = await db
    .insert(usersTable)
    .values({
      email,
      firstname,
      lastname,
      salt,
      password: hashedPassword,
    })
    .returning({ id: usersTable.id })

  return res.status(201).json({ data: { userId: user.id } })
})

export default router
