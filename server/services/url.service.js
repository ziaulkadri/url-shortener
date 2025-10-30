import { nanoid } from "nanoid"
import { db } from "../db/index.js"
import { urlsTable } from "../models/url.model.js"
import { eq, and } from "drizzle-orm"

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

export async function getUrlByShortCode(shortCode) {
  const [result] = await db
    .select({
      shortCode: urlsTable.shortCode,
      targetUrl: urlsTable.targetUrl,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, shortCode))
  return result
}

export async function getUrlsByUserId(userId) {
  const results = await db
    .select({
      id: urlsTable.id,
      shortCode: urlsTable.shortCode,
      targetUrl: urlsTable.targetUrl,
      createdAt: urlsTable.createdAt,
      updatedAt: urlsTable.updatedAt,
    })
    .from(urlsTable)
    .where(eq(urlsTable.userId, userId))
  return results
}

export async function deleteUrlByIdForUser(urlId, userId) {
  const deleted = await db
    .delete(urlsTable)
    .where(and(eq(urlsTable.id, urlId), eq(urlsTable.userId, userId)))
    .returning({ id: urlsTable.id })
  return deleted?.[0] ?? null
}
