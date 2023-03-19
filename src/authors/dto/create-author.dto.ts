import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  secondName: string;
  @ApiProperty({ required: false, nullable: true })
  dateOfBirth: Date | null;
}
