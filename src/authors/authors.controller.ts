import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorEntity } from './models';

@Controller('authors')
@ApiTags('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({ type: AuthorEntity })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.updateAuthor(+id, updateAuthorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ type: AuthorEntity })
  remove(@Param('id') id: string) {
    return this.authorsService.deleteAuthor(+id);
  }
}
