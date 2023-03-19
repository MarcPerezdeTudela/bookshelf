import { CreateAuthorDto } from 'src/authors/dto';

export class CreateAuthorCommand {
  readonly createAuthorDto: CreateAuthorDto;
  constructor(createAuthorDto: CreateAuthorDto) {
    this.createAuthorDto = createAuthorDto;
  }
}
