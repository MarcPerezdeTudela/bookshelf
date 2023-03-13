import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { mockBooks } from 'src/books/mocks/books.mock';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetBookByIdQuery } from '../impl';
import { GetBookByIdHandler } from './get-book-by-id.handler';

describe('GetBookByIdHandler', () => {
  let queryHandler: GetBookByIdHandler;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetBookByIdHandler, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();
    queryHandler = module.get<GetBookByIdHandler>(GetBookByIdHandler);
    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should return a book by id', async () => {
    const id = 1;
    const query = new GetBookByIdQuery(id);
    const book = mockBooks[0];
    prisma.book.findUnique.mockResolvedValueOnce(book);
    const expectedResponse = await queryHandler.execute(query);
    expect(expectedResponse).toBe(book);
  });
});
