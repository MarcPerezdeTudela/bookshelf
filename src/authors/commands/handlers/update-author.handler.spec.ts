import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { UpdateAuthorDto } from 'src/authors/dto';
import { authorsMock } from 'src/authors/mocks';
import { PrismaService } from 'src/prisma';
import { UpdateAuthorHandler } from '.';
import { UpdateAuthorCommand } from '../impl';

describe('UpdateAuthorHandler', () => {
  let queryHandler: UpdateAuthorHandler;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateAuthorHandler, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    queryHandler = module.get<UpdateAuthorHandler>(UpdateAuthorHandler);
    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should update an author and return it', async () => {
    const updateAuthorDto: UpdateAuthorDto = { name: 'New Name' };
    const idToUpdate = 1;
    const updateAuthorCommand: UpdateAuthorCommand = new UpdateAuthorCommand(
      idToUpdate,
      updateAuthorDto,
    );
    const author = authorsMock[0];

    prisma.author.update.mockResolvedValueOnce(author);
    const expectedResponse = await queryHandler.execute(updateAuthorCommand);
    expect(expectedResponse).toBe(author);
  });
});
