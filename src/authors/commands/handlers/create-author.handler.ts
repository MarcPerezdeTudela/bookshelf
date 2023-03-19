import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthorEntity } from 'src/authors/models';
import { PrismaService } from 'src/prisma';
import { CreateAuthorCommand } from '../impl';

@CommandHandler(CreateAuthorCommand)
export class CreateAuthorHandler
  implements ICommandHandler<CreateAuthorCommand>
{
  constructor(private readonly prisma: PrismaService) {}
  async execute(command: CreateAuthorCommand): Promise<AuthorEntity> {
    const { createAuthorDto } = command;
    const newAuthor = await this.prisma.author.create({
      data: createAuthorDto,
    });
    return newAuthor;
  }
}
