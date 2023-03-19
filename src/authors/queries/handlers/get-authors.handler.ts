import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuthorEntity } from 'src/authors/models';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAuthorsQuery } from '../impl';

@QueryHandler(GetAuthorsQuery)
export class GetAuthorsHandler
  implements IQueryHandler<GetAuthorsQuery, AuthorEntity[]>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetAuthorsQuery): Promise<AuthorEntity[]> {
    return this.prisma.author.findMany();
  }
}
