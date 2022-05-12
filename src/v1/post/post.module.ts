import {Global, Module} from '@nestjs/common';
import { ProvidersModule } from '@/providers/providers.module';
import { CoreModule } from '@/core/core.module';
import { PostController } from "@/v1/post/post.controller";
import { PostService } from "@/v1/post/services/post.service";
import { PostRepository } from "@/v1/post/repository/post.repository";
import { PostProviders } from "@/v1/post/providers/post.providers";

@Global()
@Module({
  imports: [
    ProvidersModule, 
    CoreModule
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository, ...PostProviders],
  exports: [...PostProviders, PostService, PostRepository]
})
export class PostModule { }
