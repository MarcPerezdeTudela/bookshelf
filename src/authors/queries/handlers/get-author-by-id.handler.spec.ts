import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { authorsMock } from 'src/authors/mocks';
import { PrismaService } from 'src/prisma';
import { GetAuthorByIdHandler } from '.';
import { GetAuthorByIdQuery } from '../impl';

describe('GetAuthorByIdHandler', () => {
  let handler: GetAuthorByIdHandler;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAuthorByIdHandler, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    handler = module.get<GetAuthorByIdHandler>(GetAuthorByIdHandler);
    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should return an author by id', async () => {
    const id = 1;
    const query = new GetAuthorByIdQuery(id);
    const author = authorsMock[0];
    prisma.author.findUnique.mockResolvedValueOnce(author);
    const expectedResponse = await handler.execute(query);
    expect(expectedResponse).toBe(author);
  });
});
