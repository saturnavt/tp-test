import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/jwt.auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    async create(@Body() body) {
        return await this.usersService.create(body);
    }

    @Post('/login')
    login(@Body() body) {
        return this.usersService.login(body);
    }

    @Post('/update')
    update(@Body() body) {
        return this.usersService.update(body);
    }

    @Post('/profile')
    profile(@Body() body) {
        return this.usersService.findOne(body.userId);
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('/check-token')
    async checkToken() {
        return {
            "token": true
        };
    }
}
