import { CreateBookHandler } from './create-book.handler';
import { DeleteBookHandler } from './delete-book.handler';
import { UpdateBookHandler } from './update-book.handler';

export const CommandHandlers = [
  CreateBookHandler,
  DeleteBookHandler,
  UpdateBookHandler,
];
