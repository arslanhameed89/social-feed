import { Inject, Injectable } from '@nestjs/common'
import { Model, Types } from 'mongoose'
import { BaseRepository } from '@/core/repository'
import { Post } from '@/v1/post/schemas/post.schema'
import { ObtainPostDto } from '@/v1/post/dto/obtain-post.dto'

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor (
    @Inject('POST_MODEL') private readonly customerModel: Model<Post>
  ) {
    super(customerModel)
  }

  async likeQuery (id: string): Promise<Post> {
    try {
      const query = {
        _id: new Types.ObjectId(id)
      }
      const queryData = {
        $inc: {
          likesCount: 1
        }
      }
      return await this.customerModel.findOneAndUpdate(query, queryData).exec()
    } catch (e) {
      console.info(e)
      throw e
    }
  }

  async findAll (obtainPostDto: ObtainPostDto): Promise<Post[]> {
    try {
      let query: Record<string, any> = {}
      let sort: Record<string, any> = {}

      if (obtainPostDto.filterBy != '' && obtainPostDto.filterKey != '') {
        query = {
          [obtainPostDto.filterBy]: obtainPostDto.filterKey
        }
        sort = {
          [obtainPostDto.filterBy]: obtainPostDto.sort
        }
      }
      return await this.findByQueryAndSortByCondition(query, sort)
    } catch (e) {
      console.info(e)
      throw e
    }
  }
}
