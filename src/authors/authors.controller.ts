import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorEntity } from './models';

@Controller('authors')
@ApiTags('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiCreatedResponse({ type: AuthorEntity })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.createNewAuthor(createAuthorDto);
  }

  @Get()
  @ApiOkResponse({ type: AuthorEntity, isArray: true })
  findAll() {
    return this.authorsService.getAllAuthors();
  }

  @Get(':id')
  @ApiOkResponse({ type: AuthorEntity })
  findOne(@Param('id') id: string) {
    return this.authorsService.getAuthorById(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: AuthorEntity })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.updateAuthor(+id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: AuthorEntity })
  remove(@Param('id') id: string) {
    return this.authorsService.deleteAuthor(+id);
  }
}
