import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(data) {
        return await this.prismaService.posts.create(
            {
                data: {
                    title: data.title,
                    description: data.description,
                    userId: data.userId,
                    createdAt: new Date().toISOString()
                }
            }
        )
    }

    async findAll() {
        return await this.prismaService.posts.findMany();
    }
}
