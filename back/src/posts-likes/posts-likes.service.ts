import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsLikesService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(data) {
        let searchForCreated = await this.prismaService.posts_likes.findFirst({
            where: {
                postId: data.postId,
                AND:{
                    userId: data.userId,
                }
            }
        });

        if (searchForCreated) {
            if (searchForCreated.likes) {
                await this.prismaService.posts_likes.updateMany({
                    where: {
                        id: searchForCreated.id,
                        AND:{
                            userId: data.userId,
                        }
                    },
                    data: {
                        likes: false,
                    },
                });
                return {
                    "post": "Se quito a los que te gusta"
                }
            } else {
                await this.prismaService.posts_likes.updateMany({
                    where: {
                        id: searchForCreated.id,
                        AND:{
                            userId: data.userId,
                        }
                    },
                    data: {
                        likes: true,
                    },
                });
                return {
                    "post": "Se Agrego a los que te gusta"
                }
            }
        } else {
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
    }

    async findAll() {
        return await this.prismaService.posts_likes.findMany();
    }
}
