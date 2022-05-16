import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Category } from "@/v1/categories/schemas/category.schema";
import { createCategoryDto } from "@/v1/categories/dto/create-category.dto";
import { CategoryService } from "@/v1/categories/services/category.service";
import { updateCategoryDto } from "@/v1/categories/dto/update-category.dto";

@Controller("category")
@ApiTags("category")
@ApiBearerAuth()
export class CategoriesController {
  /**
   * @param categoryService
   */
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() dto: createCategoryDto): Promise<Category> {
    return await this.categoryService.create(dto);
  }

  @Put("/:id")
  async update(
    @Body() dto: updateCategoryDto,
    @Param("id") id: string
  ): Promise<Category> {
    return await this.categoryService.update(id, dto);
  }

  @Get("/:id")
  async findOne(@Param("id") id: string): Promise<Category> {
    return await this.categoryService.fineOne(id);
  }

  @Put("soft-delete/:id")
  async softDelete(@Param("id") id: string): Promise<Category> {
    return this.categoryService.softDelete(id);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }
}
