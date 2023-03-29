import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { PrismaService } from 'src/prisma';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
