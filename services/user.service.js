import { db } from "../db/index.js"
import { usersTable } from "../models/user.model.js"
import { eq } from "drizzle-orm"

export async function getUserByEmail(email) {
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      firstname: usersTable.firstname,
      lastname: usersTable.lastname,
      email: usersTable.email,
      salt: usersTable.salt,
      password: usersTable.password,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email))

  return existingUser
}

export async function createUser(userData) {
  const [user] = await db
    .insert(usersTable)
    .values({
      email: userData.email,
      firstname: userData.firstname,
      lastname: userData.lastname,
      salt: userData.salt,
      password: userData.password,
    })
    .returning({ id: usersTable.id })

  return user
}
