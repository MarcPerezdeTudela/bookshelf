import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto, UpdateAuthorDto } from './dto';
import { authorsMock } from './mocks';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let queryBus: DeepMockProxy<QueryBus>;
  let commandBus: DeepMockProxy<CommandBus>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorsService, QueryBus, CommandBus],
    })
      .overrideProvider(QueryBus)
      .useValue(mockDeep<QueryBus>())
      .overrideProvider(CommandBus)
      .useValue(mockDeep<CommandBus>())
      .compile();

    service = module.get<AuthorsService>(AuthorsService);
    queryBus = module.get<DeepMockProxy<QueryBus>>(QueryBus);
    commandBus = module.get<DeepMockProxy<CommandBus>>(CommandBus);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(queryBus).toBeDefined();
    expect(commandBus).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array with all the authors', async () => {
      queryBus.execute.mockResolvedValueOnce(authorsMock);
      expect(service.getAllAuthors()).resolves.toEqual(authorsMock);
    });
  });
  describe('findOne', () => {
    it('should return an author by id', async () => {
      const id = 2;
      const author = authorsMock.find((author) => author.id === id);
      queryBus.execute.mockResolvedValueOnce(author);
      expect(service.getAuthorById(id)).resolves.toEqual(author);
    });
  });
  describe('create', () => {
    it('should create an author and return it', async () => {
      const createAuthorDto: CreateAuthorDto = {
        name: 'Test Author',
        secondName: 'Test SecondName',
        dateOfBirth: new Date('1990-01-01'),
      };
      const author = { id: authorsMock.length + 1, ...createAuthorDto };
      commandBus.execute.mockResolvedValueOnce(author);
      expect(service.createNewAuthor(createAuthorDto)).resolves.toEqual(author);
    });
  });
  describe('update', () => {
    it('should update an author and return it', async () => {
      const id = 2;
      const updateAuthorDto: UpdateAuthorDto = {
        name: 'Test Update Author',
        secondName: 'Test Update SecondName',
        dateOfBirth: new Date('1990-01-01'),
      };
      const author = { id, ...updateAuthorDto };
      commandBus.execute.mockResolvedValueOnce(author);
      expect(service.updateAuthor(id, updateAuthorDto)).resolves.toEqual(
        author,
      );
    });
  });
  describe('delete', () => {
    it('should delete an author and return it', async () => {
      const id = 2;
      const author = authorsMock.find((author) => author.id === id);
      commandBus.execute.mockResolvedValueOnce(author);
      expect(service.deleteAuthor(id)).resolves.toEqual(author);
    });
  });
});
