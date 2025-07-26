import { defineConfig } from 'drizzle-kit'

import 'dotenv/config'

export default defineConfig({
  dialect: 'postgresql',
  schema: ['./src/infra/database/drizzle/schemas/books.ts'],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    schema: 'public',
  },
  casing: 'snake_case',
})
