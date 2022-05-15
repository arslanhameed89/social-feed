import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import appConfig from '../../../config/app.config';
import { Post } from "@/v1/post/schemas/post.schema";
import { PostProviders } from "../providers/post.providers";
import { ProvidersModule } from "@/providers/providers.module";
import { CoreModule } from "@/core/core.module";
import { PostService } from "@/v1/post/services/post.service";
import { PostRepository } from "@/v1/post/repository/post.repository";

describe('PostService', () => {
  let service: PostService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [appConfig],
        }),
        ProvidersModule,
        CoreModule
      ],
      providers: [...PostProviders, PostService, PostRepository],
    }).compile();
    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('fetch post feeds', async () => {
    const serviceSpy = jest
      .spyOn(service, 'findAll')
      .mockImplementation(async (): Promise<Post[]> => {
        return [
          {
            author: "arslan",
            title: "title",
            content: "content",
            image: "uploads-tmp/8f0957c9-fac9-4249-8948-7d86ba73652b - Screenshot from 2022-04-20 22-07-47.png",
            category: "627f6e99ab31f92c6579ac20",
            "likes": [],
            tags: [
              "tag1",
              "tag2"
            ] ,
            likesCount: 6
          } as Post
        ];
      });
    const results = await service.findAll({});
    expect(results).toHaveLength(1);
    serviceSpy.mockClear();
  });
});
