import { DependencyContainer } from 'plutin'

import BooksRepositoryDrizzle from '@infra/database/drizzle/repositories/books-repositories-drizzle'

DependencyContainer.register('BooksRepository', BooksRepositoryDrizzle, {
  singleton: true,
})
