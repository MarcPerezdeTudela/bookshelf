import { UpdateAuthorDto } from 'src/authors/dto';

export class UpdateAuthorCommand {
  readonly id: number;
  readonly updateAuthorDto: UpdateAuthorDto;
  constructor(id: number, updateAuthorDto: UpdateAuthorDto) {
    this.id = id;
    this.updateAuthorDto = updateAuthorDto;
  }
}
