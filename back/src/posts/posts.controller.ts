import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '../auth/jwt.auth.guard';
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() body) {
        return await this.postsService.create(body);
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll() {
        return await this.postsService.findAll();
    }

    @UseGuards(AuthGuard)
    @Post('i-like')
    async findAllILike(@Body() body) {
        return await this.postsService.findAllILike(body.userId);
    }

}
