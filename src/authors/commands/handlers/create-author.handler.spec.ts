import { Test, TestingModule } from '@nestjs/testing';
import { Author, PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { CreateAuthorDto } from 'src/authors/dto';
import { PrismaService } from 'src/prisma';
import { CreateAuthorCommand } from '../impl';
import { CreateAuthorHandler } from './';
import { authorsMock } from '../../mocks';

describe('CreateAuthorHandler', () => {
  let queryHandler: CreateAuthorHandler;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateAuthorHandler, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    queryHandler = module.get<CreateAuthorHandler>(CreateAuthorHandler);
    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should create a new author and return it', async () => {
    const createAuthorDto = new CreateAuthorDto();
    const createAuthorCommand = new CreateAuthorCommand(createAuthorDto);
    const author: Author = authorsMock[0];
    prisma.author.create.mockResolvedValueOnce(author);
    const expectedResponse = await queryHandler.execute(createAuthorCommand);
    expect(expectedResponse).toBe(author);
  });
});
