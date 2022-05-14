import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../repository/customer.repository';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../schemas/customer.schema';
import { IUploadedFileFile } from "@/core/interfaces/IUploadedFile";

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async create(createCustomerDto: CreateCustomerDto, file: IUploadedFileFile): Promise<Customer> {
    try {
      //@TODO: convert to transformer
      const data: Record<string, any> = {
        ...createCustomerDto,
        profilePic: file.path
      }

      return await this.customerRepository.create(<Customer>data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
    file: IUploadedFileFile
  ): Promise<Customer> {
    try {
      const data: Record<string, any> = {
        ...updateCustomerDto,
        profilePic: file.path
      }
      return await this.customerRepository.update(id, data);
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


  async remove(id: string): Promise<Customer> {
    try {
      return await this.customerRepository.delete(id);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

}
