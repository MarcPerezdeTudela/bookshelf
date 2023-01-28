import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaClient } from '@prisma/client';
import { BookEntity } from 'src/books/domain/models';
import { UpdateBookCommand } from '../impl';

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
  constructor(private readonly prisma: PrismaClient) {}
  execute(command: UpdateBookCommand): Promise<BookEntity> {
    return this.prisma.book.update({
      data: command.updateBookDto,
      where: { id: command.id },
    });
  }
}
