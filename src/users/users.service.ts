import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username: username } });
  }
}
