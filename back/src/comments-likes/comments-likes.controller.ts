import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CommentsLikesService } from './comments-likes.service';
import { AuthGuard } from '../auth/jwt.auth.guard';

@Controller('comments-likes')
export class CommentsLikesController {
    constructor(private commentsLikesService: CommentsLikesService) { }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() body) {
        return await this.commentsLikesService.create(body);
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll() {
        return await this.commentsLikesService.findAll();
    }
}
