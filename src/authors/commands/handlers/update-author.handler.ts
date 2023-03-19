import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma';
import { UpdateAuthorCommand } from '../impl';

@CommandHandler(UpdateAuthorCommand)
export class UpdateAuthorHandler
  implements ICommandHandler<UpdateAuthorCommand>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: UpdateAuthorCommand) {
    const { id, updateAuthorDto } = command;
    return this.prisma.author.update({ data: updateAuthorDto, where: { id } });
  }
}
