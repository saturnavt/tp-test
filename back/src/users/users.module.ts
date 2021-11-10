import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { JwtService } from '../jwt/jwt.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaModule, PrismaService, BcryptService, JwtService]
})
export class UsersModule { }
