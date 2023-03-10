import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto';
import { mockBooks } from './mocks/books.mock';

describe('BooksService', () => {
  let service: BooksService;
  let queryBus: QueryBus;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: QueryBus,
          useFactory: () => jest.fn(),
        },
        {
          provide: CommandBus,
          useFactory: () => jest.fn(),
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    queryBus = module.get<QueryBus>(QueryBus);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array with all the books', async () => {
    queryBus.execute = jest.fn().mockResolvedValue(mockBooks);
    expect(service.getAllBooks()).resolves.toEqual(mockBooks);
  });

  it('should return a book by id', async () => {
    const id = 2;
    const book = mockBooks.find((book) => book.id === id);
    queryBus.execute = jest.fn().mockResolvedValue(book);
    expect(service.getBookById(id)).resolves.toEqual(book);
  });

  it('should simulate create a book and return it', async () => {
    const createBookDto: CreateBookDto = {
      title: 'Test Book',
      publishedAt: new Date(),
      authorId: 1,
    };
    const book = { id: mockBooks.length + 1, ...createBookDto };
    commandBus.execute = jest.fn().mockResolvedValue(book);
    expect(service.createBook(createBookDto)).resolves.toEqual(book);
  });

  it('should simulate update a book and return it', async () => {
    const id = 2;
    const updateBookDto: UpdateBookDto = {
      title: 'Test Update Book',
      publishedAt: new Date(),
      authorId: 1,
    };
    const book = { id, ...updateBookDto };
    commandBus.execute = jest.fn().mockResolvedValue(book);
    expect(service.updateBook(id, updateBookDto)).resolves.toEqual(book);
  });

  it('should simulate delete a book and return it', async () => {
    const id = 2;
    const book = mockBooks.find((book) => book.id === id);
    commandBus.execute = jest.fn().mockResolvedValue(book);
    expect(service.deleteBook(id)).resolves.toEqual(book);
  });
});
