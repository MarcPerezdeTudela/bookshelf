import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuthorEntity } from 'src/authors/models';
import { PrismaService } from 'src/prisma';
import { GetAuthorByIdQuery } from '../impl';

@QueryHandler(GetAuthorByIdQuery)
export class GetAuthorByIdHandler
  implements IQueryHandler<GetAuthorByIdQuery, AuthorEntity | null>
{
  constructor(private readonly prisma: PrismaService) {}
  execute(query: GetAuthorByIdQuery): Promise<AuthorEntity | null> {
    return this.prisma.author.findUnique({ where: { id: query.id } });
  }
}
