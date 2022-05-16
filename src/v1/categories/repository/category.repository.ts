import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { Category } from '@/v1/categories/schemas/category.schema'
import { BaseRepository } from '@/core/repository'

@Injectable()
export class CategoryRepository extends BaseRepository<any> {
  fileName: string

  constructor (
    @Inject('CATEGORY_MODEL') private readonly categoryModel: Model<Category>
  ) {
    super(categoryModel)
  }
}
