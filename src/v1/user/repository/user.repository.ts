import { Inject, Injectable } from '@nestjs/common'
import { Model, Types } from 'mongoose'
import { BaseRepository } from '@/core/repository'
import { User } from '@/v1/user/schemas/user.schema'

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor (
    @Inject('USER_MODEL') private readonly customerModel: Model<User>
  ) {
    super(customerModel)
  }

  async updateCustomer (
    userId: string,
    updateQuery: Record<string, any>
  ): Promise<any> {
    try {
      return await this.customerModel.findOneAndUpdate(
        { _id: new Types.ObjectId(userId) },
        updateQuery
      )
    } catch (err) {
      throw err
    }
  }
}
