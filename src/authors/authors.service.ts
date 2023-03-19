import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateAuthorCommand,
  DeleteAuthorCommand,
  UpdateAuthorCommand,
} from './commands/impl';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { GetAuthorByIdQuery, GetAuthorsQuery } from './queries/impl';

@Injectable()
export class AuthorsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}
  createNewAuthor(createAuthorDto: CreateAuthorDto) {
    return this.commandBus.execute(new CreateAuthorCommand(createAuthorDto));
  }

  getAllAuthors() {
    return this.queryBus.execute(new GetAuthorsQuery());
  }

  getAuthorById(id: number) {
    return this.queryBus.execute(new GetAuthorByIdQuery(id));
  }

  updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.commandBus.execute(
      new UpdateAuthorCommand(id, updateAuthorDto),
    );
  }

  deleteAuthor(id: number) {
    return this.commandBus.execute(new DeleteAuthorCommand(id));
  }
}
