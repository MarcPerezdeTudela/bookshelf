import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetBooksQuery } from '../impl';

@QueryHandler(GetBooksQuery)
export class GetBooksQueryHandler
  implements IQueryHandler<GetBooksQuery, Book[]>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetBooksQuery): Promise<Book[]> {
    return this.prisma.book.findMany();
  }
}
