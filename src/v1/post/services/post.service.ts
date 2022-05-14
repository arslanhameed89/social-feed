import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../schemas/post.schema';
import { IUploadedFileFile } from "@/core/interfaces/IUploadedFile";

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async create(createPostDto: CreatePostDto, file: IUploadedFileFile): Promise<Post> {
    try {
      const data  = {
        ...createPostDto,
        image: file.filename
      }
      return await this.postRepository.create(<Post>data);
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

  async likePost(id: string): Promise<Post> {
    try {
      return await this.postRepository.likeQuery(id);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

}
