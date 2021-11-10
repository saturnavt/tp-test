import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsLikesService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(data) {
        return await this.prismaService.posts_likes.create(
            {
                data: {
                    likes: data.likes,
                    postId: data.postId,
                    userId: data.userId,
                    createdAt: new Date().toISOString()
                }
            }
        )
    }

    async findAll() {
        return await this.prismaService.posts_likes.findMany();
    }
}
