import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { authorsMock } from 'src/authors/mocks';
import { PrismaService } from 'src/prisma';
import { GetAuthorsHandler } from '.';
import { GetAuthorsQuery } from '../impl';

describe('GetAuthorsHandler', () => {
  let queryHandler: GetAuthorsHandler;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAuthorsHandler, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    queryHandler = module.get<GetAuthorsHandler>(GetAuthorsHandler);
    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should return an array with all the authors', async () => {
    const query = new GetAuthorsQuery();
    prisma.author.findMany.mockResolvedValueOnce(authorsMock);
    expect(queryHandler.execute(query)).resolves.toEqual(authorsMock);
  });
});
