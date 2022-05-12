import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { BaseRepository } from "@/core/repository";
import { Post } from "@/v1/post/schemas/post.schema";

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(
    @Inject('POST_MODEL') private readonly customerModel: Model<Post>,
  ) {
    super(customerModel);
  }
}
