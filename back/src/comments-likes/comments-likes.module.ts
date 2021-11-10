import { Module } from '@nestjs/common';
import { CommentsLikesController } from './comments-likes.controller';
import { CommentsLikesService } from './comments-likes.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '../jwt/jwt.service';

@Module({
  controllers: [CommentsLikesController],
  providers: [CommentsLikesService, PrismaModule, PrismaService, JwtService]
})
export class CommentsLikesModule { }
