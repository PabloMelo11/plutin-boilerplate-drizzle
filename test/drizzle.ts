import { drizzle } from 'drizzle-orm/node-postgres'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { Pool } from 'pg'
import type { Environment } from 'vitest/environments'

import 'dotenv/config'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export const db = drizzle({
  client: pool,
  casing: 'snake_case',
})

export default <Environment>{
  name: 'drizzle',
  transformMode: 'ssr',

  async setup() {
    if (!process.env.DATABASE_URL) {
      throw new Error('Database URL not defined!')
    }

    const schema = randomUUID()
    process.env.DATABASE_URL?.replace('public', schema)

    execSync('npx drizzle-kit migrate')

    return {
      async teardown() {
        await db.execute(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
        await pool.end()
      },
    }
  },
}
