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
import { BookEntity } from './models';
import { BooksService } from './';
import { CreateBookDto, UpdateBookDto } from './dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({ type: BookEntity })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createNewBook(createBookDto);
  }
  @Get()
  @ApiOkResponse({ type: BookEntity, isArray: true })
  findAll() {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  @ApiOkResponse({ type: BookEntity })
  findOne(@Param('id') id: string) {
    return this.booksService.getBookById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({ type: BookEntity })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(+id, updateBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ type: BookEntity })
  remove(@Param('id') id: string) {
    return this.booksService.deleteBook(+id);
  }
}
