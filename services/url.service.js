import { nanoid } from "nanoid"
import { db } from "../db/index.js"
import { urlsTable } from "../models/url.model.js"

export async function insertUrl(urlData) {
  const shortcode = urlData.code ?? nanoid(6)

  const [result] = await db
    .insert(urlsTable)
    .values({
      shortCode: shortcode,
      targetUrl: urlData.url,
      userId: urlData.userId,
    })
    .returning({
      id: urlsTable.id,
      shortcode: urlsTable.shortCode,
      targetUrl: urlsTable.targetUrl,
    })

  return result
}
