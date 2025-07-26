import type IBooksRepository from '@application/repositories/books-repository'
import type Book from '@domain/book'
import { db } from '@infra/database/drizzle'

import BooksMapper from '../mappers/books-mapper'
import { booksTable } from '../schemas/books'

export default class BooksRepositoryDrizzle implements IBooksRepository {
  async create(book: Book): Promise<void> {
    const bookMapper = BooksMapper.toPersistence(book)
    await db.insert(booksTable).values(bookMapper)
  }
}
