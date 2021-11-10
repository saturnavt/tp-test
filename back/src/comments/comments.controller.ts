import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '../auth/jwt.auth.guard';
@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) { }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() body) {
        return await this.commentsService.create(body);
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll() {
        return await this.commentsService.findAll();
    }
}
