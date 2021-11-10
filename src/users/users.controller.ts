import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    async create(@Body() body) {
        return await this.usersService.create(body);
    }

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }
}
