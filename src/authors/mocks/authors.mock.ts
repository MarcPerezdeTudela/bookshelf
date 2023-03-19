import { AuthorEntity } from '../models';

export const authorsMock: AuthorEntity[] = [
  {
    id: 1,
    name: 'John',
    secondName: 'Doe',
    dateOfBirth: new Date('1990-01-01'),
  },
  {
    id: 2,
    name: 'Jane',
    secondName: 'Doe',
    dateOfBirth: new Date('1990-01-01'),
  },
];
