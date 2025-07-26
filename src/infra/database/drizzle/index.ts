// import { drizzle } from 'drizzle-orm/neon-http'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { logger } from 'plutin'

import { env } from '@infra/env'

const pool = new Pool({ connectionString: env.DATABASE_URL })

export const db = drizzle({
  client: pool,
  casing: 'snake_case',
})

export async function checkHealthConnectionDB() {
  try {
    await db.execute('SELECT 1')
    logger.log('DB connected')
  } catch (err) {
    logger.error('Error connection DB', err)
    throw new Error('Error connection DB')
  }
}
