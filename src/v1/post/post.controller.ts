import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './services/post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostSchema } from './schemas/post.schema';

@Controller('customer')
@ApiTags('customer')
export class PostController {
  constructor(private customerService: PostService) {}

  @Post()
  create(@Body() createCustomerDto: CreatePostDto): Promise<PostSchema> {
    return this.customerService.create(createCustomerDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdatePostDto,
  ): Promise<PostSchema> {
    return this.customerService.update(id, updateCustomerDto);
  }

}
