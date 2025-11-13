import { integer, json, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits:integer().default(2),
});

export const projectsTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId:varchar(),
  createdBy:varchar().references(() => usersTable.email),
  createdOn:timestamp().defaultNow(),
})

export const framesTable = pgTable("frames", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId:varchar().references(() => projectsTable.projectId),
  frameId:varchar(),
  designCode:text(),
  createdOn:timestamp().defaultNow(),
})

export const chatsTable = pgTable("chats", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  chatMessages:json(),
  frameId:varchar().references(() => framesTable.frameId),
  createdBy:varchar().references(() => usersTable.email),
  createdOn:timestamp().defaultNow(),
})
