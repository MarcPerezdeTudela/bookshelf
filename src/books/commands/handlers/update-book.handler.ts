import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BookEntity } from '../../domain/models';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBookCommand } from '../impl';

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
  constructor(private readonly prisma: PrismaService) {}
  execute(command: UpdateBookCommand): Promise<BookEntity> {
    return this.prisma.book.update({
      data: command.updateBookDto,
      where: { id: command.id },
    });
  }
}
