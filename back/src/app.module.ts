import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { CommentsLikesModule } from './comments-likes/comments-likes.module';
import { PostsLikesModule } from './posts-likes/posts-likes.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PrismaModule, PostsModule, CommentsModule, CommentsLikesModule, PostsLikesModule, BcryptModule, JwtModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
