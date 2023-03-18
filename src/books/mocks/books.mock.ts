import { BookEntity } from '../models';

export const mockBooks: BookEntity[] = [
  {
    id: 1,
    title: 'The Lord of the Rings',
    publishedAt: new Date('1954-07-29'),
    authorId: 1,
  },
  {
    id: 2,
    title: 'The Hobbit',
    publishedAt: new Date('1937-09-21'),
    authorId: 1,
  },
  {
    id: 3,
    title: 'The Silmarillion',
    publishedAt: new Date('1977-09-15'),
    authorId: 1,
  },
];
