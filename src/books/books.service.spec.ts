import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BooksService } from './';
import { CreateBookDto, UpdateBookDto } from './dto';
import { mockBooks } from './mocks';

describe('BooksService', () => {
  let service: BooksService;
  let queryBus: DeepMockProxy<QueryBus>;
  let commandBus: DeepMockProxy<CommandBus>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, QueryBus, CommandBus],
    })
      .overrideProvider(QueryBus)
      .useValue(mockDeep<QueryBus>())
      .overrideProvider(CommandBus)
      .useValue(mockDeep<CommandBus>())
      .compile();

    service = module.get<BooksService>(BooksService);
    queryBus = module.get<DeepMockProxy<QueryBus>>(QueryBus);
    commandBus = module.get<DeepMockProxy<CommandBus>>(CommandBus);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(queryBus).toBeDefined();
    expect(commandBus).toBeDefined();
  });

  it('should return an array with all the books', async () => {
    queryBus.execute.mockResolvedValueOnce(mockBooks);
    expect(service.getAllBooks()).resolves.toEqual(mockBooks);
  });

  it('should return a book by id', async () => {
    const id = 2;
    const book = mockBooks.find((book) => book.id === id);
    queryBus.execute.mockResolvedValueOnce(book);
    expect(service.getBookById(id)).resolves.toEqual(book);
  });

  it('should create a book and return it', async () => {
    const createBookDto: CreateBookDto = {
      title: 'Test Book',
      publishedAt: new Date(),
      authorId: 1,
    };
    const book = { id: mockBooks.length + 1, ...createBookDto };
    commandBus.execute.mockResolvedValueOnce(book);
    expect(service.createNewBook(createBookDto)).resolves.toEqual(book);
  });

  it('should update a book and return it', async () => {
    const id = 2;
    const updateBookDto: UpdateBookDto = {
      title: 'Test Update Book',
      publishedAt: new Date(),
      authorId: 1,
    };
    const book = { id, ...updateBookDto };
    commandBus.execute.mockResolvedValueOnce(book);
    expect(service.updateBook(id, updateBookDto)).resolves.toEqual(book);
  });

  it('should delete a book and return it', async () => {
    const id = 2;
    const book = mockBooks.find((book) => book.id === id);
    commandBus.execute.mockResolvedValueOnce(book);
    expect(service.deleteBook(id)).resolves.toEqual(book);
  });
});
