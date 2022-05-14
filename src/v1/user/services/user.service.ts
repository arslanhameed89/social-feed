import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../schemas/user.schema';
import { IUploadedFileFile } from "@/core/interfaces/IUploadedFile";
import { UserRepository } from "@/v1/user/repository/user.repository";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createCustomerDto: CreateUserDto, file: IUploadedFileFile): Promise<User> {
    try {
      //@TODO: convert to transformer
      const data: Record<string, any> = {
        ...createCustomerDto,
        profilePic: file.filename
      }

      return await this.userRepository.create(<User>data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async update(
    id: string,
    updateCustomerDto: UpdateUserDto,
    file: IUploadedFileFile
  ): Promise<User> {
    try {
      const data: Record<string, any> = {
        ...updateCustomerDto,
        profilePic: file.filename
      }
      return await this.userRepository.update(id, data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async createMany(createCustomerDto: CreateUserDto[]): Promise<any> {
    try {
      return await this.userRepository.createMany(createCustomerDto);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }


  async remove(id: string): Promise<User> {
    try {
      return await this.userRepository.delete(id);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

}
