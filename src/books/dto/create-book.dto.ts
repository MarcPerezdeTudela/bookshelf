import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty()
  title: string;
  @ApiProperty({ required: false, nullable: true })
  publishedAt: Date | null;
  @ApiProperty()
  authorId: number;
}
