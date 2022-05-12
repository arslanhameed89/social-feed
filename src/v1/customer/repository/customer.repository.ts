import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Customer } from '@/v1/customer/schemas/customer.schema';
import { BaseRepository } from "@/core/repository";

@Injectable()
export class CustomerRepository extends BaseRepository<Customer> {
  constructor(
    @Inject('CUSTOMER_MODEL') private readonly customerModel: Model<Customer>,
  ) {
    super(customerModel);
  }

  async updateCustomer(
    userId: string,
    updateQuery: Record<string, any>,
  ): Promise<any> {
    try {
      return await this.customerModel.findOneAndUpdate(
        { _id: new Types.ObjectId(userId) },
        updateQuery,
      );
    } catch (err) {
      throw err;
    }
  }
}
