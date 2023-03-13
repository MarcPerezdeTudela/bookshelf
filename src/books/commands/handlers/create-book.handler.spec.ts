import { Test, TestingModule } from '@nestjs/testing';
import { Book, PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { CreateBookDto } from 'src/books/dto';
import { mockBooks } from 'src/books/mocks/books.mock';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookCommand } from '../impl';
import { CreateBookHandler } from './create-book.handler';

describe('CreateBookHandler', () => {
  let queryHandler: CreateBookHandler;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateBookHandler, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    queryHandler = module.get<CreateBookHandler>(CreateBookHandler);
    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should create a new book and return it', async () => {
    const createBokDto: CreateBookDto = new CreateBookDto();
    const createBookCommand = new CreateBookCommand(createBokDto);
    const book: Book = mockBooks[0];
    prisma.book.create.mockResolvedValueOnce(book);
    const expectedResponse = await queryHandler.execute(createBookCommand);
    expect(expectedResponse).toBe(book);
  });
});
