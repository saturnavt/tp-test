import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '../jwt/jwt.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaModule, PrismaService, JwtService]
})
export class PostsModule { }
