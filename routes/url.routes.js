import express from "express"
import { shortenPostRequestBodySchema } from "../validations/request.validations.js"
import { insertUrl } from "../services/url.service.js"
import { ensureAuthenticated } from "../middlewares/auth.middleware.js"
const router = express.Router()

router.post("/shorten", ensureAuthenticated, async function (req, res) {
  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
    req.body
  )

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() })
  }

  const { url, code } = validationResult.data

  const data = await insertUrl({ url, code, userId })

  return res.status(201).json({
    message: "URL shortened successfully",
    data,
  })
})

export default router
