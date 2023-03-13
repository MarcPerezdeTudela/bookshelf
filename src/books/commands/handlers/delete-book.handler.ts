import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteBookCommand } from '../impl/delete-book.command';

@CommandHandler(DeleteBookCommand)
export class DeleteBookHandler implements ICommandHandler<DeleteBookCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: DeleteBookCommand): Promise<Book> {
    const { id } = command;
    return this.prisma.book.delete({ where: { id } });
  }
}
