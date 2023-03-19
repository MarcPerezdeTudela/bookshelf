import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma';
import { DeleteAuthorCommand } from '../impl/';

@CommandHandler(DeleteAuthorCommand)
export class DeleteAuthorHandler
  implements ICommandHandler<DeleteAuthorCommand>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: DeleteAuthorCommand) {
    const { id } = command;
    return this.prisma.author.delete({ where: { id } });
  }
}
