import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { JwtService } from '../jwt/jwt.service';
@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService,
        private bcryptService: BcryptService,
        private jwtService: JwtService) { }

    async create(data) {
        const hashPassword = await this.bcryptService.generateSalt(data.password);
        return await this.prismaService.users.create(
            {
                data: {
                    avatar: data.avatar,
                    fullname: data.fullname,
                    age: data.age,
                    dateofborn: data.dateofborn,
                    email: data.email,
                    username: data.username,
                    password: hashPassword,
                    createdAt: new Date().toISOString()
                }
            }
        )
    }

    async login(body) {
        const user = await this.prismaService.users.findFirst({
            where: {
                username: body.username,
            },
        });

        const checkPassword = await this.bcryptService.compareHash(
            body.password,
            user.password,
        );

        if (checkPassword == true) {
            return {
                token: this.jwtService.generateToken(body.username),
                userId: user.id,
                userName: user.fullname
            };
        } else {
            return {
                "Error": "Datos incorrectos"
            };
        }
    }

    async findAll() {
        return await this.prismaService.users.findMany();
    }
}
