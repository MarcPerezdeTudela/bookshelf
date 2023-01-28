import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookCommand } from '../impl';

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateBookCommand): Promise<Book> {
    const { createBookDto } = command;
    const newBook = await this.prisma.book.create({ data: createBookDto });
    return newBook;
  }
}
