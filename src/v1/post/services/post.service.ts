import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../schemas/post.schema';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    try {
      return await this.postRepository.create(<Post>createPostDto);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      return await this.postRepository.find();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    try {
      return await this.postRepository.update(id, updatePostDto);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async remove(id: string): Promise<Post> {
    try {
      return await this.postRepository.delete(id);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

}
