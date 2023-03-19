import { ApiProperty } from '@nestjs/swagger';
import { Author } from '@prisma/client';

export class AuthorEntity implements Author {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  secondName: string;
  @ApiProperty({ required: false, nullable: true })
  dateOfBirth: Date | null;
}
