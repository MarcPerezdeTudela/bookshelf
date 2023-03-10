import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateBookCommand,
  DeleteBookCommand,
  UpdateBookCommand,
} from './commands/impl';
import { BookEntity } from './domain/models';
import { CreateBookDto, UpdateBookDto } from './dto';
import { GetBookByIdQuery, GetBooksQuery } from './queries/impl';

@Injectable()
export class BooksService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBuss: CommandBus,
  ) {}

  async getAllBooks(): Promise<BookEntity[]> {
    return this.queryBus.execute(new GetBooksQuery());
  }

  async getBookById(id: number): Promise<BookEntity> {
    return this.queryBus.execute(new GetBookByIdQuery(id));
  }

  async createBook(createBookDto: CreateBookDto): Promise<BookEntity> {
    return this.commandBuss.execute(new CreateBookCommand(createBookDto));
  }

  async updateBook(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<BookEntity> {
    return this.commandBuss.execute(new UpdateBookCommand(id, updateBookDto));
  }

  async deleteBook(id: number): Promise<BookEntity> {
    return this.commandBuss.execute(new DeleteBookCommand(id));
  }
}
