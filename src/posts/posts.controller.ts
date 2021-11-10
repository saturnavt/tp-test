import { Controller, Post, Body, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @Post()
    async create(@Body() body) {
        return await this.postsService.create(body);
    }

    @Get()
    async findAll() {
        return await this.postsService.findAll();
    }
}
