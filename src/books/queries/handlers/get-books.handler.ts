import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BookEntity } from 'src/books/domain/models';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetBooksQuery } from '../impl';

@QueryHandler(GetBooksQuery)
export class GetBooksQueryHandler
  implements IQueryHandler<GetBooksQuery, BookEntity[]>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetBooksQuery): Promise<BookEntity[]> {
    return this.prisma.book.findMany();
  }
}
