import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { mockBooks } from 'src/books/mocks/books.mock';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetBooksQuery } from '../impl';
import { GetBooksQueryHandler } from './get-books.handler';

describe('GetBooksHandler', () => {
  let queryHandler: GetBooksQueryHandler;
  let prisma: DeepMockProxy<PrismaClient>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetBooksQueryHandler, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    queryHandler = module.get<GetBooksQueryHandler>(GetBooksQueryHandler);
    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
  });

  it('should return an array with all the books', async () => {
    const query = new GetBooksQuery();
    prisma.book.findMany.mockResolvedValueOnce(mockBooks);
    expect(queryHandler.execute(query)).resolves.toEqual(mockBooks);
  });
});
