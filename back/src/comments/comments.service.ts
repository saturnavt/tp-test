import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class CommentsService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(data) {
        return await this.prismaService.comments.create(
            {
                data: {
                    comment: data.comment,
                    postId: data.postId,
                    userId: data.userId,
                    createdAt: new Date().toISOString()
                }
            }
        )
    }

    async findAll() {
        return await this.prismaService.comments.findMany();
    }
}
