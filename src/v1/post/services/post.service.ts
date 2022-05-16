import { Injectable, UnsupportedMediaTypeException } from "@nestjs/common";
import { PostRepository } from "../repository/post.repository";
import { CreatePostDto } from "../dto/create-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { Post } from "../schemas/post.schema";
import { IUploadedFileFile } from "@/core/interfaces/IUploadedFile";
import { ObtainPostDto } from "@/v1/post/dto/obtain-post.dto";

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async create(
    createPostDto: CreatePostDto,
    file: IUploadedFileFile
  ): Promise<Post> {
    try {
      console.info(file.mimetype, "file.mimetypfile.mimetypfile.mimetyp");
      if (!file.mimetype.includes("image")) {
        new UnsupportedMediaTypeException(`Image file Type is allowed`);
      }

      const data = {
        ...createPostDto,
        image: file.filename,
      };
      return await this.postRepository.create(<Post>data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async findAll(obtainPostDto: ObtainPostDto): Promise<Post[]> {
    try {
      return await this.postRepository.findAll(obtainPostDto);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
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
