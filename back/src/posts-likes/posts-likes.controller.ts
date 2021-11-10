import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { PostsLikesService } from './posts-likes.service';
import { AuthGuard } from '../auth/jwt.auth.guard';

@Controller('posts-likes')
export class PostsLikesController {
    constructor(private postsLikesService: PostsLikesService) { }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() body) {
        return await this.postsLikesService.create(body);
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll() {
        return await this.postsLikesService.findAll();
    }
}
