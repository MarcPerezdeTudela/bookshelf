import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { UpdateBookDto } from 'src/books/dto';
import { mockBooks } from 'src/books/mocks/books.mock';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBookCommand } from '../impl';
import { UpdateBookHandler } from './update-book.handler';

describe('UpdateBookHandler', () => {
  let handler: UpdateBookHandler;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UpdateBookHandler, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    handler = moduleRef.get<UpdateBookHandler>(UpdateBookHandler);
    prisma = moduleRef.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should update a book and return it', async () => {
    const updateBookDto: UpdateBookDto = { title: 'New Title' };
    const idToUpdate = 1;
    const updateBookCommand: UpdateBookCommand = new UpdateBookCommand(
      idToUpdate,
      updateBookDto,
    );
    const book = mockBooks[0];

    prisma.book.update.mockResolvedValueOnce(book);
    const expectedResponse = await handler.execute(updateBookCommand);
    expect(expectedResponse).toBe(book);
  });
});
