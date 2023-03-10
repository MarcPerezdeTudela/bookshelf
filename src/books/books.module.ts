import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, ...CommandHandlers, ...QueryHandlers],
  imports: [PrismaModule, CqrsModule],
})
export class BooksModule {}
