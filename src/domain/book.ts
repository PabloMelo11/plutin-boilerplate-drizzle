import {
  AggregateRoot,
  type CommonDTO,
  Optional,
  Replace,
  UniqueEntityId,
} from 'plutin'

type BookProps = CommonDTO & {
  title: string
  content: string
  authorId: UniqueEntityId
  bestPage: number | null
}

type CreateBookProps = Optional<
  Replace<BookProps, { authorId: string }>,
  'bestPage' | 'createdAt' | 'updatedAt'
>

export default class Book extends AggregateRoot<BookProps> {
  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get bestPage() {
    return this.props.bestPage
  }

  static create(props: CreateBookProps, id?: string) {
    const book = new Book(
      {
        authorId: new UniqueEntityId(props.authorId),
        content: props.content,
        title: props.title,
        bestPage: props.bestPage || null,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || null,
      },
      new UniqueEntityId(id)
    )

    return book
  }
}
