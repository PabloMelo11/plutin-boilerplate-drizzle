import { integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const booksTable = pgTable('books', {
  id: uuid().primaryKey().unique().defaultRandom(),
  authorId: uuid().notNull(),
  title: varchar({ length: 100 }).notNull(),
  content: varchar({ length: 255 }).notNull(),
  bestPage: integer(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
})

export type BookDB = typeof booksTable.$inferInsert
