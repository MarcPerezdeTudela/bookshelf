import { UpdateBookDto } from 'src/books/dto/update-book.dto';

export class UpdateBookCommand {
  readonly id: number;
  readonly updateBookDto: UpdateBookDto;
  constructor(id: number, updateBookDto: UpdateBookDto) {
    this.id = id;
    this.updateBookDto = updateBookDto;
  }
}
