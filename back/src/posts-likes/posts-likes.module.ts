import { Module } from '@nestjs/common';
import { PostsLikesController } from './posts-likes.controller';
import { PostsLikesService } from './posts-likes.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '../jwt/jwt.service';

@Module({
  controllers: [PostsLikesController],
  providers: [PostsLikesService, PrismaModule, PrismaService, JwtService]
})
export class PostsLikesModule {}
