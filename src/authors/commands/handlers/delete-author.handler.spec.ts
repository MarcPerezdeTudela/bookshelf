import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { authorsMock } from 'src/authors/mocks';
import { PrismaService } from 'src/prisma';
import { DeleteAuthorHandler } from '.';
import { DeleteAuthorCommand } from '../impl';

describe('DeleteAuthorHandler', () => {
  let queryHandler: DeleteAuthorHandler;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteAuthorHandler, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    queryHandler = module.get<DeleteAuthorHandler>(DeleteAuthorHandler);
    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should delete an author and return it', async () => {
    const deleteAuthorCommand = new DeleteAuthorCommand(1);
    const author = authorsMock[0];

    prisma.author.delete.mockResolvedValueOnce(author);
    const expectedResponse = await queryHandler.execute(deleteAuthorCommand);
    expect(expectedResponse).toBe(author);
  });
});
