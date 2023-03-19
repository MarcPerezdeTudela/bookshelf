import { GetAuthorsHandler } from './get-authors.handler';
import { GetAuthorByIdHandler } from './get-author-by-id.handler';

export * from './get-authors.handler';
export * from './get-author-by-id.handler';

export const QueryHandlers = [GetAuthorsHandler, GetAuthorByIdHandler];
