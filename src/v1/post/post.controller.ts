import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PostService } from "./services/post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post as PostSchema } from "./schemas/post.schema";
import { ApiFile } from "@/core/decorators/api-file/api-file-decorator";
import { UploadRequestBody } from "@/v1/post/swagger/upload-request-body";
import { diskStorage } from "multer";
import { Request } from "express";
import { IFile } from "@/core/interfaces";
import { randomUUID } from "crypto";
import { fileMimetypeFilter } from "@/shared/helpers/file-mime-type-filter";
import { ObtainPostDto } from "@/v1/post/dto/obtain-post.dto";

@Controller("post")
@ApiTags("post")
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @ApiFile("image", true, UploadRequestBody, {
    storage: diskStorage({
      destination: "./uploads-tmp",
      filename: (
        req: Request,
        file: IFile,
        callback: (error: Error | null, filename: string) => void
      ) => {
        callback(null, `${randomUUID()} - ${file.originalname}`);
      },
    }),
    fileFilter: fileMimetypeFilter("image"),
  })
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<PostSchema> {
    return this.postService.create(createPostDto, file);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto
  ): Promise<PostSchema> {
    return this.postService.update(id, updatePostDto);
  }

  @Post("feed")
  async findAll(@Body() obtainPostDto: ObtainPostDto): Promise<PostSchema[]> {
    return await this.postService.findAll(obtainPostDto);
  }

  @Patch("like/:id")
  likePost(@Param("id") id: string): Promise<PostSchema> {
    return this.postService.likePost(id);
  }
}
