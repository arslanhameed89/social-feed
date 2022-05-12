import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../repository/customer.repository';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../schemas/customer.schema';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      return await this.customerRepository.create(<Customer>createCustomerDto);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async createMany(createCustomerDto: CreateCustomerDto[]): Promise<any> {
    try {
      return await this.customerRepository.createMany(createCustomerDto);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async findAll(): Promise<Customer[]> {
    try {
      return await this.customerRepository.find();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    try {
      return await this.customerRepository.update(id, updateCustomerDto);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async remove(id: string): Promise<Customer> {
    try {
      return await this.customerRepository.delete(id);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

}
