export * from './delete-author.handler';
export * from './update-author.handler';
export * from './create-author.handler';

import { DeleteAuthorHandler } from './delete-author.handler';
import { UpdateAuthorHandler } from './update-author.handler';
import { CreateAuthorHandler } from './create-author.handler';

export const CommandHandlers = [
  DeleteAuthorHandler,
  UpdateAuthorHandler,
  CreateAuthorHandler,
];
