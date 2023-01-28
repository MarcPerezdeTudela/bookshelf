import { CreateBookDto } from 'src/books/dto/create-book.dto';

export class CreateBookCommand {
  readonly createBookDto: CreateBookDto;
  constructor(createBookDto: CreateBookDto) {
    this.createBookDto = createBookDto;
  }
}
