import Book from '@domain/book'

import type { BookDB } from '../schemas/books'

export default class BooksMapper {
  static toDomain(book: BookDB) {
    return Book.create(
      {
        authorId: book.authorId,
        content: book.content,
        title: book.title,
        bestPage: book.bestPage,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
      },
      book.id
    )
  }

  static toPersistence(book: Book): BookDB {
    return {
      id: book.id.toString(),
      authorId: book.authorId.toString(),
      content: book.content,
      title: book.title,
      bestPage: book.bestPage,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    }
  }
}
