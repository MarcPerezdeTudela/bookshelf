import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './';

export class UpdateBookDto extends PartialType(CreateBookDto) {}
