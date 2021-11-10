import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '../jwt/jwt.service';
@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaModule, PrismaService, JwtService]
})
export class CommentsModule { }
