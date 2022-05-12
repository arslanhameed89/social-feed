import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Category } from "@/v1/categories/schemas/category.schema";
import { CategoryRepository } from "@/v1/categories/repository/category.repository";
import { createCategoryDto } from "@/v1/categories/dto/create-category.dto";
import { updateCategoryDto } from "@/v1/categories/dto/update-category.dto";

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {}


  async create(dto: createCategoryDto): Promise<Category> {
    try {
      const query = {
        'categoryName.en': new RegExp(['^', dto.name, '$'].join(''), 'i'),
      };

      const data = await this.categoryRepository.findOneByQuery(query);

      if (data.length > 0) {
        throw new HttpException(
          'category already exist!',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.categoryRepository.create(dto);

    } catch (e) {

      throw e;
    }
  }


  async update(id: string, dto: updateCategoryDto): Promise<Category> {
    try {

      const data = await this.categoryRepository.findOne(id);

      if (!data) {
        throw new HttpException('Record not found', HttpStatus.BAD_REQUEST);
      }

      return await this.categoryRepository.update(id, dto);
    } catch (e) {
       throw e;
    }
  }

  /**
   * @param id
   */
  async softDelete(id: string): Promise<Category> {
    const data = await this.categoryRepository.findOne(id);

    if (!data) {
      throw new HttpException('Record not found', HttpStatus.BAD_REQUEST);
    }
    return this.categoryRepository.update(id, {
      status: 0,
      statusMsg: 'IN_ACTIVE',
    });
  }

  /**
   * @param id
   */
  async fineOne(id: string): Promise<Category> {
    try {
      return await this.categoryRepository.findOne(id);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

}
