import { Test, TestingModule } from '@nestjs/testing';
import { CommentsLikesController } from './comments-likes.controller';

describe('CommentsLikesController', () => {
  let controller: CommentsLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsLikesController],
    }).compile();

    controller = module.get<CommentsLikesController>(CommentsLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
