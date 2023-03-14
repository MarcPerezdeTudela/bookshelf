import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BooksController } from './books.controller';
import { BooksService } from './';
import { CreateBookDto, UpdateBookDto } from './dto';
import { mockBooks } from './mocks';

describe('BooksController', () => {
  let controller: BooksController;
  let service: DeepMockProxy<BooksService>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(mockDeep<BooksService>())
      .compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<DeepMockProxy<BooksService>>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      service.findAll.mockResolvedValueOnce(mockBooks);
      expect(controller.findAll()).resolves.toEqual(mockBooks);
    });
  });

  describe('findOne', () => {
    it('should return a book', async () => {
      const id = '1';
      const book = mockBooks[0];
      service.findOne.mockResolvedValueOnce(book);
      expect(controller.findOne(id)).resolves.toEqual(book);
    });
  });

  describe('create', () => {
    it('should create a book', async () => {
      const newBookDTO: CreateBookDto = new CreateBookDto();
      const book = mockBooks[0];
      service.create.mockResolvedValueOnce(book);
      expect(controller.create(newBookDTO)).resolves.toEqual(book);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const id = '1';
      const updateBookDTO: UpdateBookDto = new UpdateBookDto();
      const book = { ...mockBooks[1], id: 2 };
      service.update.mockResolvedValueOnce(book);
      expect(controller.update(id, updateBookDTO)).resolves.toEqual(book);
    });
  });

  describe('remove', () => {
    it('should delete a book', async () => {
      const id = '1';
      const book = mockBooks[0];
      service.remove.mockResolvedValueOnce(book);
      expect(controller.remove(id)).resolves.toEqual(book);
    });
  });
});
