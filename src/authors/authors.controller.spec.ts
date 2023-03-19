import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto';
import { authorsMock } from './mocks';

describe('AuthorsController', () => {
  let controller: AuthorsController;
  let service: DeepMockProxy<AuthorsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [AuthorsService],
    })
      .overrideProvider(AuthorsService)
      .useValue(mockDeep<AuthorsService>())
      .compile();

    controller = module.get<AuthorsController>(AuthorsController);
    service = module.get<DeepMockProxy<AuthorsService>>(AuthorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      service.getAllAuthors.mockResolvedValueOnce(authorsMock);
      expect(controller.findAll()).resolves.toEqual(authorsMock);
    });
  });

  describe('findOne', () => {
    it('should return an author', async () => {
      const id = '1';
      const author = authorsMock[0];
      service.getAuthorById.mockResolvedValueOnce(author);
      expect(controller.findOne(id)).resolves.toEqual(author);
    });
  });

  describe('create', () => {
    it('should create an author', async () => {
      const newAuthorDto = new CreateAuthorDto();
      const author = authorsMock[0];
      service.createNewAuthor.mockResolvedValueOnce(author);
      expect(controller.create(newAuthorDto)).resolves.toEqual(author);
    });
  });

  describe('update', () => {
    it('should update an author', async () => {
      const id = '1';
      const updateAuthorDto = new CreateAuthorDto();
      const author = { ...authorsMock[1], id: 2 };
      service.updateAuthor.mockResolvedValueOnce(author);
      expect(controller.update(id, updateAuthorDto)).resolves.toEqual(author);
    });
  });

  describe('remove', () => {
    it('should remove an author', async () => {
      const id = '1';
      const author = authorsMock[0];
      service.deleteAuthor.mockResolvedValueOnce(author);
      expect(controller.remove(id)).resolves.toEqual(author);
    });
  });
});
