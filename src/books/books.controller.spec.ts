import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BookService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto';
import { mockBooks } from './mocks/books.mock';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BookService,
          useValue: {
            getAllBooks: jest.fn().mockResolvedValue(mockBooks),
            getBookById: jest
              .fn()
              .mockImplementation((id: number) =>
                Promise.resolve(mockBooks.find((book) => book.id === id)),
              ),
            createBook: jest
              .fn()
              .mockImplementation((book: CreateBookDto) =>
                Promise.resolve(book),
              ),
            updateBook: jest
              .fn()
              .mockImplementation((id: number, book: UpdateBookDto) =>
                Promise.resolve({ id, ...book }),
              ),
            deleteBook: jest
              .fn()
              .mockImplementation((id: number) =>
                Promise.resolve(mockBooks.find((book) => book.id === id)),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      expect(controller.findAll()).resolves.toEqual(mockBooks);
    });
  });

  describe('findOne', () => {
    it('should return a book', async () => {
      expect(controller.findOne('1')).resolves.toEqual(mockBooks[0]);
    });
  });

  describe('create', () => {
    it('should create a book', async () => {
      const newBookDTO: CreateBookDto = mockBooks[0];
      expect(controller.create(newBookDTO)).resolves.toEqual(mockBooks[0]);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const updateBookDTO: UpdateBookDto = mockBooks[1];
      expect(controller.update('1', updateBookDTO)).resolves.toEqual({
        id: 2,
        ...mockBooks[1],
      });
    });
  });

  describe('remove', () => {
    it('should delete a book', async () => {
      expect(controller.remove('1')).resolves.toEqual(mockBooks[0]);
    });
  });
});
