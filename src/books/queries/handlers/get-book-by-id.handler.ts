import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BookEntity } from '../../models';
import { PrismaService } from 'src/prisma';
import { GetBookByIdQuery } from '../impl';

@QueryHandler(GetBookByIdQuery)
export class GetBookByIdHandler
  implements IQueryHandler<GetBookByIdQuery, BookEntity | null>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetBookByIdQuery): Promise<BookEntity | null> {
    return this.prisma.book.findUnique({ where: { id: query.id } });
  }
}
