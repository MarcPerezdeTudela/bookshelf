import { Book } from '@prisma/client';

export class CreateBookDomainEvent {
  private readonly book: Book;

  constructor(book: Book) {
    this.book = book;
  }
}
