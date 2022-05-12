import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './services/post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostSchema } from './schemas/post.schema';

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(private customerService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostSchema> {
    return this.customerService.create(createPostDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostSchema> {
    return this.customerService.update(id, updatePostDto);
  }

}
