import { Test, TestingModule } from '@nestjs/testing';
import { PostsLikesController } from './posts-likes.controller';

describe('PostsLikesController', () => {
  let controller: PostsLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsLikesController],
    }).compile();

    controller = module.get<PostsLikesController>(PostsLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
