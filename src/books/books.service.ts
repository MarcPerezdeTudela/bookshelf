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

  async findAll(): Promise<BookEntity[]> {
    return this.queryBus.execute(new GetBooksQuery());
  }

  async findOne(id: number): Promise<BookEntity> {
    return this.queryBus.execute(new GetBookByIdQuery(id));
  }

  async create(createBookDto: CreateBookDto): Promise<BookEntity> {
    return this.commandBuss.execute(new CreateBookCommand(createBookDto));
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<BookEntity> {
    return this.commandBuss.execute(new UpdateBookCommand(id, updateBookDto));
  }

  async remove(id: number): Promise<BookEntity> {
    return this.commandBuss.execute(new DeleteBookCommand(id));
  }
}
