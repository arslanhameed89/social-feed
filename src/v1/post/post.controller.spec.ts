import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import appConfig from '../../config/app.config';
import { Post } from "@/v1/post/schemas/post.schema";
import { PostProviders } from "./providers/post.providers";
import { ProvidersModule } from "@/providers/providers.module";
import { CoreModule } from "@/core/core.module";
import { PostService } from "@/v1/post/services/post.service";
import { PostRepository } from "@/v1/post/repository/post.repository";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreatePostDto } from "@/v1/post/dto/create-post.dto";
import { PostController } from "@/v1/post/post.controller";

describe('Post Controller', () => {
  let service: PostService;
  let repository: PostRepository;
  let postController: PostController;

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
      controllers: [PostController],
      providers: [...PostProviders, PostService, PostRepository],
    }).compile();
    service = module.get<PostService>(PostService);
    repository = module.get<PostRepository>(PostRepository);
    postController = module.get<PostController>(PostController);
  });

  it('post controller should be defined', () => {
    expect(postController).toBeDefined();
  });

  it('should throw when title is empty.', async () => {
    const dtoData = { title: '', author: 'arslan'}
    const ofDtoData = plainToInstance(CreatePostDto, dtoData)
    const errors = await validate(ofDtoData, { skipMissingProperties: true })
    expect(errors.length).not.toBe(0)
    expect(JSON.stringify(errors)).toContain(`title should not be empty`)
  });

  it('should pass the dto validation.', async () => {
    const dtoData = { title: 'arslan', author: 'arslan'}
    const ofDtoData = plainToInstance(CreatePostDto, dtoData)
    const errors = await validate(ofDtoData, { skipMissingProperties: true })
    expect(errors.length).toBe(0)
    expect(JSON.stringify(errors)).toEqual('[]')
  });


});
