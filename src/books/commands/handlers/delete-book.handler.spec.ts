import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { mockBooks } from 'src/books/mocks/books.mock';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteBookCommand } from '../impl';
import { DeleteBookHandler } from './delete-book.handler';

describe('DeleteBookHandler', () => {
  let queryHandler: DeleteBookHandler;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteBookHandler, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    queryHandler = module.get<DeleteBookHandler>(DeleteBookHandler);
    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should delete a book and return it', async () => {
    const deleteBookCommand = new DeleteBookCommand(1);
    const book = mockBooks[0];

    prisma.book.delete.mockResolvedValueOnce(book);
    const expectedResponse = await queryHandler.execute(deleteBookCommand);
    expect(expectedResponse).toBe(book);
  });
});
