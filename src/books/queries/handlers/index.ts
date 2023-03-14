import { GetBookByIdHandler } from './get-book-by-id.handler';
import { GetBooksQueryHandler } from './get-books.handler';

export * from './get-book-by-id.handler';
export * from './get-books.handler';

export const QueryHandlers = [GetBooksQueryHandler, GetBookByIdHandler];
