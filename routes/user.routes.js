import express from "express"
// import { db } from "../db/index.js"
// import { usersTable } from "../models/user.model.js"
import { signupPostRequestBodySchema,loginPostRequestBodySchema } from "../validations/request.validations.js"
import { createUser, getUserByEmail } from "../services/user.service.js"
import { hashPasswordWithSalt } from "../utils/hash.js"

import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/signup", async (req, res) => {
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(
    req.body
  )

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() })
  }

  const { firstname, lastname, email, password } = validationResult.data

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return res
      .status(400)
      .json({ error: `User with email ${email} already exists!` })
  }

  const { salt, password: hashedPassword } = hashPasswordWithSalt(password)

  const user = await createUser({
    email,
    firstname,
    lastname,
    salt,
    password: hashedPassword,
  })

  return res.status(201).json({ data: { userId: user.id } })
})


router.post("/login", async (req, res) => {
  const validationResult = await loginPostRequestBodySchema.safeParseAsync(
    req.body
  )

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() })
  }

  const { email, password } = validationResult.data

  const user = await getUserByEmail(email)

  if (!user) {
    return res
      .status(404)
      .json({ error: `user with emai ${email} does not exist` })
  }

  const { password: hashedPassword } = hashPasswordWithSalt(password, user.salt)

  if (user.password != hashedPassword) {
    return res.status(400).json({ error: `invalid password` })
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  })

  return res.json({ status: "success", token: token })
})

export default router
