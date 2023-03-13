import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetBookByIdQuery } from '../impl/get-book-by-id.query';

@QueryHandler(GetBookByIdQuery)
export class GetBookByIdHandler implements IQueryHandler {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetBookByIdQuery): Promise<Book | null> {
    return this.prisma.book.findUnique({ where: { id: query.id } });
  }
}
