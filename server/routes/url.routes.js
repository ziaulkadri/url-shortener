import express from "express"
import { shortenPostRequestBodySchema } from "../validations/request.validations.js"
import { insertUrl } from "../services/url.service.js"
import { ensureAuthenticated } from "../middlewares/auth.middleware.js"
import {
  getUrlByShortCode,
  getUrlsByUserId,
  deleteUrlByIdForUser,
} from "../services/url.service.js"
const router = express.Router()

router.post("/shorten", ensureAuthenticated, async function (req, res) {
  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
    req.body
  )

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() })
  }

  const { url, code } = validationResult.data
  const userId = req.user.id
  const data = await insertUrl({ url, code, userId })

  return res.status(201).json({
    message: "URL shortened successfully",
    data,
  })
})

router.get("/my/urls", ensureAuthenticated, async function (req, res) {
  const userId = req.user.id
  const urls = await getUrlsByUserId(userId)
  return res.status(200).json({ data: urls })
})

router.delete("/my/urls/:id", ensureAuthenticated, async function (req, res) {
  const userId = req.user.id
  const { id } = req.params
  const deleted = await deleteUrlByIdForUser(id, userId)
  if (!deleted) {
    return res.status(404).json({ error: "URL not found or not owned by user" })
  }
  return res.status(200).json({ status: "deleted", id: deleted.id })
})

router.get("/:shortCode", async function (req, res) {
  const { shortCode } = req.params
  const urlEntry = await getUrlByShortCode(shortCode)
  if (!urlEntry || !urlEntry.targetUrl) {
    return res.status(404).json({ error: "Shortened URL not found" })
  }
  return res.redirect(urlEntry.targetUrl)
})

export default router
