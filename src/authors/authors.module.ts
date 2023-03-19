import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, ...QueryHandlers, ...CommandHandlers],
  imports: [PrismaModule, CqrsModule],
})
export class AuthorsModule {}
