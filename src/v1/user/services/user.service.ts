import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { User } from '../schemas/user.schema'
import { IUploadedFileFile } from '@/core/interfaces/IUploadedFile'
import { UserRepository } from '@/v1/user/repository/user.repository'
import { HashService } from '@/shared/hash/hash.service'
import { Category } from '@/v1/categories/schemas/category.schema'

@Injectable()
export class UserService {
  constructor (
    private userRepository: UserRepository,
    private hashService: HashService
  ) {}

  async create (
    createCustomerDto: CreateUserDto,
    file: IUploadedFileFile
  ): Promise<User> {
    try {
      // @TODO: convert to transformer
      const data: Record<string, any> = {
        ...createCustomerDto,
        password: await this.hashService.hashPassword(
          createCustomerDto.password
        ),
        profilePic: file.filename
      }

      return await this.userRepository.create(<User>data)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async update (
    id: string,
    updateCustomerDto: UpdateUserDto,
    file: IUploadedFileFile
  ): Promise<User> {
    try {
      const data: Record<string, any> = {
        ...updateCustomerDto,
        profilePic: file.filename
      }
      return await this.userRepository.update(id, data)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  /**
   * @param id
   */
  async fineOne (id: string): Promise<Category> {
    try {
      return await this.userRepository.findOne(id)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async findAll (): Promise<User[]> {
    try {
      return await this.userRepository.find()
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  findOne (id: number) {
    return `This action returns a #${id} test`
  }

  async remove (id: string): Promise<User> {
    try {
      return await this.userRepository.delete(id)
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}
