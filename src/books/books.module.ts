import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { PrismaModule } from 'src/prisma';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { BooksService } from './';

@Module({
  controllers: [BooksController],
  providers: [BooksService, ...CommandHandlers, ...QueryHandlers],
  imports: [PrismaModule, CqrsModule],
})
export class BooksModule {}
