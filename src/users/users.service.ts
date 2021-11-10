import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(data) {
        return await this.prismaService.users.create(
            {
                data: {
                    avatar: data.avatar,
                    fullname: data.fullname,
                    age: data.age,
                    dateofborn: data.dateofborn,
                    email: data.email,
                    username: data.username,
                    password: data.password,
                    createdAt: new Date().toISOString()
                }
            }
        )
    }

    async findAll() {
        return await this.prismaService.users.findMany();
    }
}
