import { Test, TestingModule } from '@nestjs/testing';
import { CommentsLikesService } from './comments-likes.service';

describe('CommentsLikesService', () => {
  let service: CommentsLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsLikesService],
    }).compile();

    service = module.get<CommentsLikesService>(CommentsLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
